// Used for local testing
// In index.js, you can import { client } from './octokit'
// instead of '@octokit/rest'

import { Octokit } from '@octokit/rest';
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";

const MyOctokit = Octokit.plugin(retry, throttling);

var client = new MyOctokit({
  auth: process.env.GITHUB_TOKEN,
  throttle: {
    onRateLimit: (retryAfter, options) => {
      client.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (options.request.retryCount === 0) {
        // only retries once
        client.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      client.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    },
  },
  retry: {
    doNotRetry: ["429"],
  },
});

export { client };
