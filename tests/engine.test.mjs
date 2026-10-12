import assert from 'node:assert/strict';import{initial,act,reasons}from '../dist/engine.mjs';
let s=act(initial(),'start');assert.equal(s.status,'active');s=act(s,'toggle:supervisor');assert.equal(s.status,'paused');assert.equal(act(s,'submit').submitted,false);s=act(s,'replace');assert.equal(s.status,'paused');s=act(s,'toggle:paid');assert.equal(act(s,'resume').status,'paused');s=act(s,'toggle:paid');assert.equal(act(s,'resume').status,'active');
for(const k of ['prior','gap','paid','scope','supervisor','capacity','criteria','help']){let x=act(initial(),'toggle:'+k);assert.ok(reasons(x).length);assert.equal(act(x,'start').status,'paused')}
let x=act(act(initial(),'start'),'repeat');assert.equal(x.status,'paused');x=act(x,'replace');assert.equal(act(x,'resume').status,'paused');x=act(x,'shadow-stop');assert.equal(act(x,'resume').status,'stopped');assert.equal(act(x,'toggle:scope').scope,x.scope);
let y=act(act(initial(),'start'),'submit');y=act(y,'toggle:supervisor');assert.equal(act(y,'review').reviewed,false,'Review must be blocked during supervisor failure');
console.log('All coordinator regression checks passed');
