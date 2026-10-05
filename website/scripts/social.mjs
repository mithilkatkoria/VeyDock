import { chromium } from 'playwright';
const browser = await chromium.launch({channel:'msedge',headless:true});
const page = await browser.newPage({viewport:{width:1200,height:630}});
await page.setContent(`<html><body style="margin:0;background:#0b0b0c;color:#e9e3d8;font-family:Arial,sans-serif"><div style="padding:65px;width:1100px"><p style="color:#ff5a36;letter-spacing:4px;font-size:15px">VEYDOCK / VDOCK / WINDOWS</p><h1 style="font-size:79px;line-height:1.04;font-weight:600;letter-spacing:-4px;margin-top:55px">One dock.<br>Your AI coding profiles.</h1><p style="font-size:22px;color:#aaa49b">Codex + Claude Code beta. Your choice, in one place.</p><p style="font-size:13px;margin-top:70px">MIT LICENSED / INDEPENDENT / CLAUDE ACCEPTANCE PENDING</p></div></body></html>`);
await page.screenshot({path:'public/media/veydock-social.png'});
await browser.close();
