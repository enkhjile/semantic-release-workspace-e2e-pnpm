import {spawn} from 'node:child_process';
import {devNull} from 'node:os';

const exactCredentialNames=new Set([
  'ACTIONS_ID_TOKEN_REQUEST_TOKEN',
  'ACTIONS_ID_TOKEN_REQUEST_URL',
  'NODE_AUTH_TOKEN',
  'NPM_ID_TOKEN',
  'NPM_TOKEN',
  'SIGSTORE_ID_TOKEN',
  'YARN_NPM_AUTH_IDENT',
  'YARN_NPM_AUTH_TOKEN'
]);

function isNpmConfigCredential(name){
  return /^NPM_CONFIG_/.test(name)&&/(?:AUTH|TOKEN|PASSWORD|USERNAME|EMAIL|CERT|KEY)/.test(name);
}

function isNpmConfigPath(name){
  return /^NPM_CONFIG_(?:USERCONFIG|GLOBALCONFIG)$/.test(name);
}

export function withoutPublishCredentials(environment){
  const cleaned={...environment};
  for(const name of Object.keys(cleaned)){
    const normalized=name.toUpperCase();
    if(exactCredentialNames.has(normalized)||isNpmConfigCredential(normalized)||isNpmConfigPath(normalized))delete cleaned[name];
  }
  // Keep GitHub transport credentials intact; only package-registry and OIDC identity are excluded.
  cleaned.NPM_CONFIG_USERCONFIG=devNull;
  cleaned.NPM_CONFIG_GLOBALCONFIG=devNull;
  return cleaned;
}

const [command,...args]=process.argv.slice(2);
if(!command)throw new Error('Usage: node scripts/without-publish-credentials.mjs <command> [args...]');
const child=spawn(command,args,{env:withoutPublishCredentials(process.env),stdio:'inherit'});
child.once('error',error=>{throw error;});
child.once('exit',(code,signal)=>{
  if(signal)process.kill(process.pid,signal);
  else process.exitCode=code??1;
});
