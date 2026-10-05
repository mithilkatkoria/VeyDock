import { providers } from '../services/providers';
import type { ProviderId } from '../types';
import { usePrivacy } from './StreamerMode';
import { useState } from 'react';
import { FolderOpen, KeyRound, Trash2 } from 'lucide-react';
import { Modal } from './Modal';
import { native } from '../services/native';
import type { Profile } from '../types';
import type { HubView } from '../stores/useHub';
export function ProfileEditor({profile,hub,onClose,existingHome}:{profile?:Profile;hub:HubView;onClose:()=>void;existingHome?:string}){
 const [provider,setProvider]=useState<ProviderId>(profile?.provider??'codex');
 const adapter=providers[provider];
 const privacy=usePrivacy();
 const [name,setName]=useState(profile?.name??'');const [plan,setPlan]=useState(profile?.plan??'plus');const [accent,setAccent]=useState(profile?.accent??'blue');const [availability,setAvailability]=useState(profile?.availability??'available');const [error,setError]=useState('');const [saving,setSaving]=useState(false);const [removing,setRemoving]=useState(false);const [confirmation,setConfirmation]=useState('');
 async function submit(connect:boolean){setSaving(true);setError('');try{const p=await adapter.create({provider,id:profile?.id??null,name,plan:adapter.terminal?'other':plan,accent,availability,existingHome:existingHome??null});await hub.reload();onClose();if(connect)void hub.login(p.id);else void hub.refresh(p.id);}catch(e){setError(String(e));}finally{setSaving(false);}}
 return <Modal title={profile?'Profile settings':existingHome?'Add existing profile':'Add a profile'} onClose={onClose}><form onSubmit={e=>{e.preventDefault();void submit(!profile&&!existingHome);}}>
  {!profile&&!existingHome&&<label>Provider<select value={provider} onChange={e=>setProvider(e.target.value as ProviderId)}><option value="codex">Codex</option><option value="claude-code">Claude Code (beta)</option></select></label>}
  {adapter.terminal&&<p className="privacy-note">Claude Code beta. Each profile uses its own CLAUDE_CONFIG_DIR. Sign in with a claude.ai account in the terminal, then check connection. Keyless Console sign-ins are unsupported. Real A/B/A acceptance is pending.</p>}
  <p className="form-intro">{existingHome?'Save the current account. Your existing projects and tasks stay in Codex.':adapter.terminal?'Save a Claude account with its own configuration directory. Your project folders stay in place.':'Save an account once. Open it in your existing Codex workspace, with your projects and tasks in place.'}</p>
  {privacy.active&&<p className="privacy-note">Turn streamer mode off to edit private details. Browser sign-in and Explorer are outside Hub protection.</p>}
  <label>Profile name<input autoFocus disabled={privacy.active} value={privacy.active?'Name hidden':name} maxLength={80} placeholder="e.g. Plus 2" onChange={e=>setName(e.target.value)} required/></label>
  <div className="form-row"><label>{adapter.terminal?'Account label':'Plan label'}<select disabled={adapter.terminal} value={plan} onChange={e=>setPlan(e.target.value as Profile['plan'])}><option value="plus">ChatGPT Plus</option><option value="pro">ChatGPT Pro</option><option value="other">Other</option></select></label><label>Availability<select value={availability} onChange={e=>setAvailability(e.target.value as Profile['availability'])}><option value="available">Available</option><option value="reserved">Reserved</option><option value="friend-priority">Friend priority</option></select></label></div>
  <label>Profile accent</label><div className="swatches">{['blue','violet','mint','amber','rose'].map(c=><button type="button" aria-label={`${c} accent`} aria-pressed={accent===c} key={c} onClick={()=>setAccent(c)} className={`swatch accent-${c} ${accent===c?'selected':''}`}/>)}</div>
  {profile&&adapter.terminal&&<div className="profile-tools"><button type="button" className="secondary" onClick={async()=>{try{await adapter.validate(profile.id);await hub.reload();setError('Connection verified');}catch(e){setError(String(e));}}}>Check connection</button><button type="button" className="secondary" onClick={async()=>{try{await native('enable_usage_helper',{id:profile.id});setError('Usage helper enabled. Start a new Claude session and make a normal request.');}catch(e){setError(String(e));}}}>Enable quota helper</button></div>}
  {profile&&<div className="profile-tools"><button type="button" className="secondary" onClick={()=>{onClose();void hub.login(profile.id);}}><KeyRound size={14}/> Reconnect</button><button type="button" className="secondary" disabled={privacy.active} onClick={()=>void native('open_profile_folder',{id:profile.id}).catch(e=>setError(String(e)))}><FolderOpen size={14}/> Profile folder</button><button type="button" className="text-button danger" disabled={privacy.active} onClick={()=>setRemoving(!removing)}><Trash2 size={14}/> Remove</button></div>}
  {(existingHome||profile)&&<p className="path-note">{privacy.active?'Folder hidden':existingHome??profile?.home}</p>}
  {removing&&<div className="remove-panel"><p>Remove from VeyDock. Local profile data will be kept.</p><label>Type “{profile?privacy.profileName(profile):''}” to confirm<input disabled={privacy.active} value={privacy.active?'':confirmation} onChange={e=>setConfirmation(e.target.value)}/></label><button type="button" disabled={privacy.active||confirmation!==profile?.name} className="secondary danger" onClick={async()=>{try{await native('remove_profile',{id:profile!.id,deleteData:false,confirmation});await hub.reload();onClose();}catch(e){setError(String(e));}}}>Remove from Hub</button></div>}
  {error&&<p role="alert" className="form-error">{privacy.detail(error)}</p>}
  <div className="form-footer">{!profile&&!existingHome?<button type="button" className="text-button" disabled={saving||privacy.active} onClick={()=>void submit(false)}>Connect later</button>:<span><KeyRound size={13}/> Sign-in stays with the provider</span>}<button className="primary" disabled={saving||privacy.active}>{saving?'Saving…':profile?'Save changes':existingHome?'Add profile':'Save & connect'}<span>↗</span></button></div>
 </form></Modal>;
}
