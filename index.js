// import { client } from './octokit';
const github = require('@actions/github')
const core = require('@actions/core')
import { getAsset, writeAsset } from './assets';

const client = github.getOctokit(core.getInput('token') || process.env.GITHUB_TOKEN)
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')

// The default values help when testing locally
getAsset(client,
	 core.getInput('tag') || "v1.3.0-rc4",
	 core.getInput('kind') || 'linux_amd64.deb',
	 core.getInput('repo') || repo,
	 core.getInput('owner') || owner)
    .then((a) => {
	console.log(a)
	return writeAsset(client, a, core.getInput('dest') || "tyk-pump.deb")
    })
    .then((u) => core.setOutput('url', u))
    .catch((e) => {
	core.setFailed(e.message)
    })

