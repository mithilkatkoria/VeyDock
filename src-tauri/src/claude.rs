//! Claude Code beta: orchestrate official CLI, never copy OAuth credentials.
use crate::model::*;
use serde_json::{json,Value};
use std::{path::{Path,PathBuf},process::Stdio,time::Duration};
use tokio::process::Command;
pub fn detect(settings:&Settings)->Option<PathBuf>{
 if let Some(p)=&settings.claude_exe{if p.is_file(){return Some(p.clone())}}
 let mut candidates=vec![];
 if let Some(home)=dirs::home_dir(){candidates.push(home.join(".local/bin/claude.exe"));}
 if let Some(paths)=std::env::var_os("PATH"){candidates.extend(std::env::split_paths(&paths).map(|p|p.join("claude.exe")));}
 candidates.into_iter().find(|p|p.is_file())
}
pub fn clean_command(exe:&Path,home:&Path)->Command{
 let mut c=Command::new(exe);
 for (key,_) in std::env::vars_os(){let k=key.to_string_lossy().to_ascii_uppercase();if k.starts_with("CLAUDE_")||k.starts_with("ANTHROPIC_")||k.starts_with("CODEX_"){c.env_remove(key);}}
 for key in ["NODE_OPTIONS","ELECTRON_RUN_AS_NODE"]{c.env_remove(key);}
 c.env("CLAUDE_CONFIG_DIR",home);
 #[cfg(windows)]c.creation_flags(0x08000000);
 c
}
pub fn initialize(home:&Path)->Result<(),String>{
 std::fs::create_dir_all(home).map_err(|_|"Cannot create Claude profile")?;
 let settings=home.join("settings.json");
 // Never overwrite an existing status line or settings file.
 if !settings.exists(){std::fs::write(&settings,serde_json::to_vec_pretty(&json!({"forceLoginMethod":"claudeai"})).unwrap()).map_err(|_|"Cannot initialize Claude settings")?;}
 Ok(())
}
pub struct Identity {pub email:String,pub key:String}
pub async fn validate(exe:&Path,p:&Profile)->Result<Identity,String>{
 let output=tokio::time::timeout(Duration::from_secs(20),clean_command(exe,&p.home).args(["auth","status"]).stdin(Stdio::null()).stderr(Stdio::null()).kill_on_drop(true).output()).await.map_err(|_|"Claude auth status timed out")?.map_err(|_|"Cannot start Claude auth status")?;
 if output.stdout.len()>65536{return Err("Claude status exceeded the safe size limit".into());}
 let value:Value=serde_json::from_slice(&output.stdout).map_err(|_|"Claude did not return structured auth status. Update Claude Code.")?;
 let identity=identity_from_status(&value,p)?;
 if !output.status.success(){return Err("Claude could not verify authentication. Launch cancelled.".into())}
 Ok(identity)
}
fn identity_from_status(value:&Value,p:&Profile)->Result<Identity,String>{
 if value.get("loggedIn").and_then(Value::as_bool)!=Some(true){return Err("AUTH_REQUIRED: Sign in to this Claude profile in its terminal, then check connection.".into());}
 if value.get("authMethod").and_then(Value::as_str)!=Some("claude.ai"){return Err("AUTH_REQUIRED: This beta isolates claude.ai sign-ins only. Keyless Console, API keys and cloud-provider logins are not supported.".into());}
 let reported=value.get("configDirectory").and_then(Value::as_str).ok_or("Update Claude Code to v2.1.268 or later to verify its configuration directory.")?;
 let reported=Path::new(reported).canonicalize().map_err(|_|"Cannot verify Claude configuration directory")?;
 let expected=p.home.canonicalize().map_err(|_|"Cannot verify saved Claude directory")?;
 if reported!=expected{return Err("Claude reported a different configuration directory. Launch cancelled.".into());}
 // Bind the saved slot to approved identity fields, not the raw status document.
 let email=value.get("email").and_then(Value::as_str).filter(|s|!s.is_empty()).ok_or("Claude did not report an account identity. Launch cancelled.")?.to_string();
 use sha2::{Digest,Sha256};let mut hash=Sha256::new();hash.update(email.as_bytes());hash.update([0]);hash.update(value.get("organizationId").and_then(Value::as_str).unwrap_or("").as_bytes());
 Ok(Identity{email,key:format!("claude-code:{:x}",hash.finalize())})
}
pub fn launch(exe:&Path,p:&Profile,cwd:Option<&Path>,authenticate:bool)->Result<String,String>{
 if !p.home.is_dir(){return Err("Claude configuration directory is missing".into());}
 let exe=exe.to_string_lossy().replace('\'',"''");let home=p.home.to_string_lossy().replace('\'',"''");
 let script=format!("Get-ChildItem Env: | Where-Object {{$_.Name -match '^(CLAUDE_|ANTHROPIC_|CODEX_)'}} | ForEach-Object {{Remove-Item -LiteralPath ('Env:'+ $_.Name)}}; $env:CLAUDE_CONFIG_DIR='{home}'; Remove-Item Env:NODE_OPTIONS,Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue; & '{exe}' {}",if authenticate{"auth login"}else{""});
 // EncodedCommand avoids interpolating names or paths into cmd.exe. PowerShell
 // receives only UTF-16 script data; no credential appears in the arguments.
 use base64::Engine;let bytes:Vec<u8>=script.encode_utf16().flat_map(u16::to_le_bytes).collect();
 let encoded=base64::engine::general_purpose::STANDARD.encode(bytes);
 let mut cmd=std::process::Command::new("powershell.exe");cmd.args(["-NoLogo","-NoProfile","-NoExit","-EncodedCommand",&encoded]);
 if let Some(cwd)=cwd{cmd.current_dir(directory(cwd)?);}else{cmd.current_dir(dirs::home_dir().ok_or("Cannot locate user folder")?);}
 #[cfg(windows)]{use std::os::windows::process::CommandExt;cmd.creation_flags(0x00000010);}
 cmd.spawn().map_err(|_|"Cannot open the Claude profile terminal")?;
 Ok(if authenticate{"Claude sign-in opened in its isolated terminal. Finish there, then check connection."}else{"Claude profile terminal opened. Verify identity using /status."}.into())
}
pub fn usage(p:&Profile)->Result<Snapshot,String>{
 let path=p.home.join(".veydock-usage.json");
 if !path.exists(){return Ok(Snapshot{windows:vec![],fetched_at:String::new(),source:"Claude Code status line".into(),state:"unavailable".into(),message:Some("Quota not reported yet. Enable the usage helper, then make a normal request in Claude. /usage remains available in Claude.".into()),reset_credits:None});}
 if std::fs::metadata(&path).map_err(|_|"Cannot read Claude quota cache")?.len()>32768{return Err("Claude quota cache is invalid".into());}
 let value:Value=serde_json::from_slice(&std::fs::read(path).map_err(|_|"Cannot read Claude quota cache")?).map_err(|_|"Claude quota cache is invalid")?;
 if value["profile_id"].as_str()!=Some(&p.id){return Err("Claude quota cache does not belong to this profile".into())}
 let mut windows=vec![];
 for (key,label,duration) in [("five_hour","5 hour",Some(300)),("seven_day","Weekly",Some(10080)),("spend_limit","Spend limit",None)]{
  if let Some(v)=value["windows"].get(key){let percent=v["used_percentage"].as_f64().filter(|n|n.is_finite()&&*n>=0.&&*n<=100.);let reset=v["resets_at"].as_i64();if percent.is_none(){continue;}
   windows.push(UsageWindow{id:format!("claude-code:{key}"),label:label.into(),bucket:"claude-code".into(),used_percent:percent,remaining_percent:percent.map(|n|100.-n),resets_at:reset,duration_mins:duration});
  }
 }
 Ok(Snapshot{windows,fetched_at:value["timestamp"].as_str().unwrap_or("").into(),source:"Claude Code status line (last confirmed)".into(),state:"stale".into(),message:None,reset_credits:None})
}
pub fn install_helper(p:&Profile)->Result<(),String>{
 let path=p.home.join("settings.json");let mut settings:Value=serde_json::from_slice(&std::fs::read(&path).map_err(|_|"Cannot read Claude settings")?).map_err(|_|"Invalid Claude settings. Original file preserved.")?;
 if settings.get("statusLine").is_some(){return Err("This profile already has a status line. VeyDock will not replace it. See the provider documentation to compose helpers manually.".into());}
 let helper=p.home.join(".veydock-statusline.ps1");
 std::fs::write(&helper,include_str!("claude-statusline.ps1")).map_err(|_|"Cannot install quota helper")?;
 use base64::Engine;
 let script=format!("& '{}' -ProfileId '{}'",helper.to_string_lossy().replace('\'',"''"),p.id.replace('\'',"''"));
 let encoded=base64::engine::general_purpose::STANDARD.encode(script.encode_utf16().flat_map(u16::to_le_bytes).collect::<Vec<_>>());
 settings["statusLine"]=json!({"type":"command","command":format!("powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -EncodedCommand {encoded}")});
 let mut file=tempfile::NamedTempFile::new_in(&p.home).map_err(|_|"Cannot update Claude settings")?;use std::io::Write;file.write_all(&serde_json::to_vec_pretty(&settings).unwrap()).map_err(|_|"Cannot update Claude settings")?;file.persist(path).map_err(|_|"Cannot commit Claude settings")?;Ok(())
}
#[cfg(test)]mod tests{use super::*;#[test]fn cache_is_never_live_and_unknowns_are_not_zero(){let d=tempfile::tempdir().unwrap();let p:Profile=serde_json::from_value(json!({"id":"a","provider":"claude-code","name":"Test","plan":"other","accent":"blue","home":d.path(),"desktopData":d.path(),"managed":true,"availability":"reserved","createdAt":now(),"lastUsedAt":null})).unwrap();assert_eq!(usage(&p).unwrap().state,"unavailable");std::fs::write(d.path().join(".veydock-usage.json"),r#"{"profile_id":"a","timestamp":"2026-10-05T12:00:00Z","windows":{"five_hour":{"used_percentage":64,"resets_at":1900000000},"seven_day":{}}}"#).unwrap();let s=usage(&p).unwrap();assert_eq!(s.state,"stale");assert_eq!(s.windows.len(),1);assert_eq!(s.windows[0].remaining_percent,Some(36.));}
 #[test]fn existing_settings_are_never_replaced(){let d=tempfile::tempdir().unwrap();std::fs::write(d.path().join("settings.json"),"{\"custom\":true}").unwrap();initialize(d.path()).unwrap();assert_eq!(std::fs::read_to_string(d.path().join("settings.json")).unwrap(),"{\"custom\":true}");}}

#[cfg(test)]mod isolation_tests{
 use super::*;
 fn profile(home:&Path)->Profile{serde_json::from_value(json!({"id":"a","provider":"claude-code","name":"Fixture","plan":"other","accent":"mint","home":home,"desktopData":home,"managed":true,"availability":"available","createdAt":now(),"lastUsedAt":null})).unwrap()}
 #[test]fn rejects_different_directories_and_unsupported_auth(){let a=tempfile::tempdir().unwrap();let b=tempfile::tempdir().unwrap();let p=profile(a.path());let mut status=json!({"loggedIn":true,"authMethod":"claude.ai","configDirectory":a.path(),"email":"fixture@example.invalid","organizationId":"org-a"});let key=identity_from_status(&status,&p).unwrap().key;status["organizationId"]="org-b".into();assert_ne!(key,identity_from_status(&status,&p).unwrap().key);status["configDirectory"]=json!(b.path());assert!(identity_from_status(&status,&p).is_err());status["configDirectory"]=json!(a.path());for method in ["api_key","oauth_token","third_party","none"]{status["authMethod"]=method.into();assert!(identity_from_status(&status,&p).is_err());}}
 #[test]fn helper_preserves_custom_statusline_and_scopes_its_cache(){let d=tempfile::tempdir().unwrap();let p=profile(d.path());initialize(d.path()).unwrap();install_helper(&p).unwrap();let before=std::fs::read(d.path().join("settings.json")).unwrap();assert!(install_helper(&p).is_err());assert_eq!(before,std::fs::read(d.path().join("settings.json")).unwrap());std::fs::write(d.path().join(".veydock-usage.json"),r#"{"profile_id":"other","windows":{}}"#).unwrap();assert!(usage(&p).is_err());}
}
