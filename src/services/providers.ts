import type { Profile, ProviderId, Snapshot } from '../types';
import { native } from './native';
export interface ProviderAdapter {
 id: ProviderId; name: string; beta: boolean; liveUsage: boolean; resetCredits: boolean; terminal: boolean;
 create(input:Record<string,unknown>):Promise<Profile>; detect(): Promise<unknown>; authenticate(id:string):Promise<unknown>; validate(id:string):Promise<unknown>;
 refresh(id:string):Promise<Snapshot>; launch(id:string,projectId?:string|null):Promise<string>; diagnostics(id:string):Promise<unknown>;
}
const operations={create:(input:Record<string,unknown>)=>native<Profile>('save_profile',{input}),detect:()=>native('detect_providers'),authenticate:(id:string)=>native('login_profile',{id}),validate:(id:string)=>native('check_profile_connection',{id}),refresh:(id:string)=>native<Snapshot>('refresh_usage',{id}),launch:(id:string,projectId:string|null=null)=>native<string>('launch_profile',{id,projectId}),diagnostics:(id:string)=>native('diagnostics',{id})};
export const providers:Record<ProviderId,ProviderAdapter>={
 codex:{...operations,id:'codex',name:'Codex',beta:false,liveUsage:true,resetCredits:true,terminal:false,validate:(id)=>native('login_profile',{id})},
 'claude-code':{...operations,id:'claude-code',name:'Claude Code',beta:true,liveUsage:false,resetCredits:false,terminal:true}
};
export function providerFor(p:Pick<Profile,'provider'>){return providers[p.provider??'codex'];}
