//! Provider registry. Shared Codex handoffs stay in their established orchestrator;
//! isolated terminal providers expose a different capability contract.
use crate::{model::*,codex,claude};
use serde::Serialize;
use std::path::{Path,PathBuf};
#[derive(Clone,Serialize)] #[serde(rename_all="camelCase")]
pub struct Capabilities {pub profiles:bool,pub live_usage:bool,pub projects:bool,pub terminal_launch:bool,pub desktop_launch:bool,pub tray_launch:bool,pub concurrent_profiles:bool,pub beta:bool}
#[derive(Serialize)] #[serde(rename_all="camelCase")]
pub struct Installation {pub id:&'static str,pub name:&'static str,pub executable:Option<PathBuf>,pub capabilities:Capabilities,pub isolation:&'static str}
pub trait ProviderAdapter:Sync {
 fn id(&self)->&'static str;
 fn name(&self)->&'static str;
 fn capabilities(&self)->Capabilities;
 fn detect(&self,settings:&Settings)->Installation;
 fn initialize(&self,home:&Path)->Result<(),String>;
}
pub struct CodexProviderAdapter;
pub struct ClaudeCodeProviderAdapter;
impl ProviderAdapter for CodexProviderAdapter {
 fn id(&self)->&'static str{"codex"} fn name(&self)->&'static str{"Codex"}
 fn capabilities(&self)->Capabilities{Capabilities{profiles:true,live_usage:true,projects:true,terminal_launch:false,desktop_launch:true,tray_launch:true,concurrent_profiles:false,beta:false}}
 fn detect(&self,s:&Settings)->Installation{let i=codex::detect(s);Installation{id:self.id(),name:self.name(),executable:i.cli,capabilities:self.capabilities(),isolation:"Managed Codex homes; shared Desktop workspace with normal-quit handoff. Real Desktop A/B/A acceptance remains pending."}}
 fn initialize(&self,home:&Path)->Result<(),String>{std::fs::create_dir_all(home).map_err(|_|"Cannot create Codex home")?;if home.join("config.toml").exists(){return Ok(())}std::fs::write(home.join("config.toml"),"cli_auth_credentials_store = \"file\"\n").map_err(|_|"Cannot initialize Codex profile".into())}
}
impl ProviderAdapter for ClaudeCodeProviderAdapter {
 fn id(&self)->&'static str{"claude-code"} fn name(&self)->&'static str{"Claude Code"}
 fn capabilities(&self)->Capabilities{Capabilities{profiles:true,live_usage:false,projects:true,terminal_launch:true,desktop_launch:false,tray_launch:true,concurrent_profiles:false,beta:true}}
 fn detect(&self,s:&Settings)->Installation{Installation{id:self.id(),name:self.name(),executable:claude::detect(s),capabilities:self.capabilities(),isolation:"CLAUDE_CONFIG_DIR per profile. claude.ai accounts only; keyless Console sign-ins are not isolated by this mechanism. Beta until real A/B/A acceptance."}}
 fn initialize(&self,home:&Path)->Result<(),String>{claude::initialize(home)}
}
pub fn adapter(id:&str)->Result<&'static dyn ProviderAdapter,String>{match id{"codex"=>Ok(&CodexProviderAdapter),"claude-code"=>Ok(&ClaudeCodeProviderAdapter),_=>Err("Unknown provider. Saved data has been preserved.".into())}}
pub fn installations(settings:&Settings)->Vec<Installation>{[&CodexProviderAdapter as &dyn ProviderAdapter,&ClaudeCodeProviderAdapter].iter().map(|p|p.detect(settings)).collect()}
#[cfg(test)] mod tests{use super::*;#[test]fn capabilities_are_distinct(){let c=adapter("codex").unwrap().capabilities();let a=adapter("claude-code").unwrap().capabilities();assert!(c.live_usage&&c.desktop_launch);assert!(!a.live_usage&&a.terminal_launch&&a.beta);assert!(adapter("future").is_err());}}
