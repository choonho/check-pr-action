const core = require('@actions/core')
const { wait } = require('./wait')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
	const myToken = core.getInput('token');
	const octokit = github.getOctokit(myToken);
	const context = github.context;
	const isPullRequest = context.payload.pull_request;
	if (!isPullRequest)
		throw new Error(
			'This actions only runs against pull request events. Try modifying your workflow trigger.'
		);

	const pr = await octokit.rest.pulls.get({
		...context.repo,
		pull_number: context.issue.number
	});
	const commits = await octokit.rest.pulls.listCommits({
		...context.repo,
		pull_number: context.issue.number
	});
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
