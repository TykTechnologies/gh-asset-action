// import { client } from './octokit';
import core from '@actions/core'
import github from '@actions/github'
import { getAsset, writeAsset } from './assets';

context = github.context
client = core.getInput('token') ? github.getOctokit(core.getInput('token')) : github

getAsset(client,
	 core.getInput('tag'),
	 core.getInput('kind'),
	 core.getInput('tag'),
	 core.getInput('repo') || context.repo,
	 core.getInput('owner') || context.owner)
    .then((a) => {
	console.debug(a)
	return writeAsset(client, a, core.getInput('dest'))
    })
    .then((u) => core.setOutput('url', u))
    .catch((e) => core.setFailed(e.Message))

