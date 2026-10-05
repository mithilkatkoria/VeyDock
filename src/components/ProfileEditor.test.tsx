// @vitest-environment jsdom
import {it,expect,vi,afterEach} from 'vitest';
import {render,screen,cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ProfileEditor} from './ProfileEditor';
import type {HubView} from '../stores/useHub';
const calls=vi.hoisted(()=>({native:vi.fn().mockResolvedValue({id:'new'})}));
vi.mock('../services/native',()=>({native:calls.native,nativeAvailable:false,onNative:vi.fn().mockResolvedValue(()=>{})}));
HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};
afterEach(()=>{cleanup();vi.clearAllMocks();});
it('creates a Claude profile without Codex plan controls or an imported credential folder',async()=>{
 const hub={reload:vi.fn().mockResolvedValue({}),refresh:vi.fn(),login:vi.fn()} as unknown as HubView;
 render(<ProfileEditor hub={hub} onClose={vi.fn()}/>);
 const user=userEvent.setup();await user.selectOptions(screen.getByLabelText('Provider'),'claude-code');
 expect(screen.queryByLabelText('Plan label')).toBeNull();expect(screen.queryByText('ChatGPT Plus')).toBeNull();
 await user.type(screen.getByLabelText('Profile name'),'Work');await user.click(screen.getByRole('button',{name:'Connect later'}));
 expect(calls.native).toHaveBeenCalledWith('save_profile',{input:expect.objectContaining({provider:'claude-code',plan:'other',existingHome:null,name:'Work'})});
 expect(hub.login).not.toHaveBeenCalled();
});
