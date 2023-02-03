# Software development

We are using a standard Git workflow. If you aren't familiar, check out [this guide](https://soshace.com/understanding-the-git-workflow/).

Code is hosted on Github. New code to be introduced must be in a pull request (no committing directly to master).

We also enforce a linear history of git commits. This means that you can't use merge commits, and *must* instead rebase in order to fix merge conflicts.

## Review Process

Pull requests should only be merged when:
1) they have been reviewed and approved by the lead developer
2) all the checks that Github runs on the branch have passed. These checks include tests and deployment, outlined below.

## Continuous Integration

We have a set of unit tests, following the redwood convention, using Jest and React-testing-library. Before opening a pull request, it is recommended that you run the test suite on your machine using

```
yarn test
```

Once you open a pull request, we also have a Github Actions action that will automatically run the test suite. Pull requests should not be merged until the test suite fully passes.

## Continuous Delivery / Deployment

We use Netlify for deployment, which is set up to take advantage of their [Continuous Deployment](https://www.netlify.com/blog/2015/09/17/continuous-deployment/) functionality. This means that:
1) Any changes to master (ie. merged pull requests) will automatically be deployed to production by Netlify.
2) Any pull request that is opened on Github gets a preview deployment automatically deployed by Netlify to a unique URL. This benefits us in:
   - We can confirm that the branch still builds successfully.
   - Reviewers can preview the changes without needing to pull the changes to their local machine and run it there.
