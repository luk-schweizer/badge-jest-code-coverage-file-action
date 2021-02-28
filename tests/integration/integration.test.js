const { Octokit } = require("@octokit/rest");

test('code-coverage-jest-action should create a commit with a message having the run info when it is manually run', async () => {

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN});

    const githubRepoSplitted = process.env.GITHUB_REPOSITORY.split('/');
    const owner = githubRepoSplitted[0];
    const repository = githubRepoSplitted[1];
    const startTime = new Date().toISOString();
    cont branchRef = `refs/heads/integration-branch-${Date.now()}`

    await octokit.git.createRef({
      owner: owner,
      repo: repository,
      ref: branchRef,
      sha: null,
    });


    //actions:read //actions:write
    await octokit.actions.createWorkflowDispatch({
        owner: owner,
        repo: repository,
        workflow_id: process.env.WORKFLOW_ID_FOR_TEST,
        ref: branchRef,
        inputs: {
            "create-file-path": "tests/integration/badge.svg",
            "test-command": "npx jest --coverage integration/dummy.test.js"
        }
    });


    //get run id.
    const runs = await octokit.actions.listWorkflowRuns({
      owner: owner,
      repo: repository,
      workflow_id: process.env.WORKFLOW_ID_FOR_TEST,
      per_page: 1,
      page: 0
    });
    console.log(runs);
    const runs.workflow_runs[0].

    const runNumber = runs.workflow_runs[0].run_number;
    const runId = runs.workflow_runs[0].id;
    const status = runs.workflow_runs[0].status;
    const conclusion = runs.workflow_runs[0].conclusion;

//get first and runId.
/*octokit.actions.getWorkflowRun({
  owner,
  repo,
  run_id,
});*/

//wait for finish
//"status": "queued",
//"conclusion": null,
//"run_number": 562,

//asset conclusion.ok
//chequeo que haya un commit en los ultimos 5 minutos, en el path de test integrtion
// `Code Coverage Badge for Run job-runId-runNumber`
octokit.repos.listCommits({
  owner: owner,
  repo: repository,
  path: "tests/integration/badge.svg",
  since: startTime,
});

console.log(commits);

//expect(octokit.repos.getContent).toHaveBeenCalledTimes(1);
  //expect(octokit.repos.createOrUpdateFileContents).toHaveBeenCalledTimes(1);
  //expect(octokit.repos.createOrUpdateFileContents).toHaveBeenCalledWith(expectedPayload);

// delete created branch
    /*await octokit.git.deleteRef({
      owner: owner,
      repo: repository,
      ref: branchRef,
    });*/


});