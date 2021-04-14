import { client } from './octokit';
import { getAsset, writeAsset } from './assets';


getAsset(client, 'v1.3.0-rc4', 'linux_amd64.deb', 'tyk-pump')
    .then((a) => {
	console.debug(a)
	return writeAsset(client, a, 'tyk-pump.deb')
    })
    .then((f) => console.info(`Downloaded file from ${f}`))
    .catch((e) => console.error(e))

