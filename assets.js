import fs from 'fs'
import https from 'https'

/**
 * Find assets for a given tag. 
 * @param {@octokit/rest} client - Github REST client, supply an authenticated client if draft releases are to be looked at.
 * @param {string} tag - the git tag to restrict to, required
 * @param {string} kind - a fragment of text from the asset name to identify it, 'linux_amd64.deb' would match amd64 debs for instance
 * @param {string} repo - Github repo name
 * @param {string} [owner=TykTechnologies] - Github org
 */
export async function getAsset(client, tag, kind, repo, owner='TykTechnologies') {
    const releases = await client
	  .paginate("GET /repos/{owner}/{repo}/releases", {
	      owner: owner,
	      repo: repo,
	  })
    for (const a of releases.find(r => r.tag_name == tag).assets) {
	// Artefacts don't have the v from the tag
	if (a.name.indexOf(tag.replace('/^v/', ''))+a.name.indexOf(kind) >= 0) {
	    return {
		name: a.name,
		url: a.browser_download_url,
		id: a.id,
		owner: owner,
		repo: repo
	    }
	}
    }
    throw new Error("no asset found")
}

/**
 * Fetch an asset and write it to a file.
 * @param {@octokit/rest} client - Github REST client, supply an authenticated client if draft releases are to be looked at.
 * @param {string} asset - asset object from getAsset
 * @param {string} dest - write to a file named dest
 */
export async function writeAsset(client, asset, dest) {
    const content = await client.rest.repos.getReleaseAsset({
	owner: asset.owner,
	repo: asset.repo,
	asset_id: asset.id,
	headers: {
	    accept: "application/octet-stream"
	}
    })
    const buffer = Buffer.from(content.data)
    fs.createWriteStream(dest).write(buffer)
    return content.url
}
