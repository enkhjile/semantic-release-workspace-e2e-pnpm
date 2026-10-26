import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';

const workflow=readFileSync(new URL('../.github/workflows/live-release.yml',import.meta.url),'utf8');
const runner='node scripts/without-publish-credentials.mjs';

function section(start,end){
  const from=workflow.indexOf(start);
  const to=workflow.indexOf(end,from);
  assert.ok(from>=0&&to>from,`missing workflow section: ${start}`);
  return workflow.slice(from,to);
}

test('fresh no-change lifecycle and guard each use the credential-free runner',()=>{
  const noChange=section('      - name: No-change cannot upload or request identity','      - name: Fresh-clone zero-write guard');
  const guard=section('      - name: Fresh-clone zero-write guard','      - uses: actions/upload-artifact');
  assert.match(noChange,new RegExp(`${runner.replaceAll('.','\\.')} (?:npm exec --|pnpm exec) semantic-release`));
  assert.match(guard,new RegExp(`${runner.replaceAll('.','\\.')} node scripts/live-guard\\.mjs rerun`));
});
