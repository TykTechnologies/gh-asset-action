# Get release asset action

This action can fetch a release artefact from github. It supports private repos and draft releases.

## Inputs

### `tag`

**Required** The tag associated with the release. When searching for an asset the `v` prefix to the tag will be stripped because deb and rpms generated from goreleaser stip the `v` and I think it might be prohibited by policy.

### `kind`

**Required** A fragment of text that is matched literally (no regexp) against each asset name. `linux_amd64.deb` would match amd64 debs for instance. The first asset that matches the tag and this fragment will be returned.

### `dest`

*Optional* Filename to write the asset to. Defaults to the asset name as on github.

### `owner`

*Optional* Owner of the repo. Defaults to the current owner.

### `repo`

*Optional* Owner of the repo. Defaults to the current repo.

## Outputs

### `url`

A URL you can use in the browser to fetch the same asset

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'
