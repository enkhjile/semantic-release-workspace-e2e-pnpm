import {spawnSync} from 'node:child_process';
import {devNull} from 'node:os';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';
import assert from 'node:assert/strict';

const runner=fileURLToPath(new URL('./without-publish-credentials.mjs',import.meta.url));
const credentialNames=['ACTIONS_ID_TOKEN_REQUEST_URL','ACTIONS_ID_TOKEN_REQUEST_TOKEN','NPM_ID_TOKEN','SIGSTORE_ID_TOKEN','NPM_TOKEN','NODE_AUTH_TOKEN','YARN_NPM_AUTH_TOKEN','NPM_CONFIG__AUTH','npm_config__authToken'];
const inheritedConfigNames=['npm_config_userconfig','npm_config_globalconfig'];

test('runner removes publish and OIDC credentials for a fresh child process',()=>{
  const probe=`const names=${JSON.stringify(credentialNames)};const configs=${JSON.stringify(inheritedConfigNames)};process.stdout.write(JSON.stringify({credentials:Object.fromEntries(names.map(name=>[name,Object.hasOwn(process.env,name)])),inheritedConfig:Object.fromEntries(configs.map(name=>[name,Object.hasOwn(process.env,name)])),githubToken:process.env.GITHUB_TOKEN==='git-transport',npmConfig:[process.env.NPM_CONFIG_USERCONFIG,process.env.NPM_CONFIG_GLOBALCONFIG]}));`;
  const result=spawnSync(process.execPath,[runner,process.execPath,'--input-type=module','--eval',probe],{encoding:'utf8',env:{...process.env,GITHUB_TOKEN:'git-transport',...Object.fromEntries(credentialNames.map(name=>[name,'test-only-value'])),...Object.fromEntries(inheritedConfigNames.map(name=>[name,'/test-only-npmrc']))}});
  assert.equal(result.status,0,result.stderr);
  assert.deepEqual(JSON.parse(result.stdout),{credentials:Object.fromEntries(credentialNames.map(name=>[name,false])),inheritedConfig:Object.fromEntries(inheritedConfigNames.map(name=>[name,false])),githubToken:true,npmConfig:[devNull,devNull]});
});
