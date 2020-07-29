# Contributing to @scaleleap/amazon-mws-api-sdk

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

* Reporting a bug
* Discussing the current state of the code
* Submitting a fix
* Proposing new features
* Becoming a maintainer

## Table of Contents
- [Contributing to @scaleleap/amazon-mws-api-sdk](#contributing-to-scaleleapamazon-mws-api-sdk)
  - [Table of Contents](#table-of-contents)
  - [We Use Github Flow, So All Code Changes Happen Through Pull Requests](#we-use-github-flow-so-all-code-changes-happen-through-pull-requests)
  - [Report bugs using Github's issues](#report-bugs-using-githubs-issues)
  - [We use commitlint for linting commit messages](#we-use-commitlint-for-linting-commit-messages)
  - [Testing locally](#testing-locally)
  - [Unit tests](#unit-tests)
  - [Integration tests](#integration-tests)
  - [Testing against the API itself](#testing-against-the-api-itself)
  - [Testing locally without having to access the API](#testing-locally-without-having-to-access-the-api)

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests
Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, update the unit tests.
3. If you've changed APIs, update the documentation.
4. Ensure the unit tests pass by running `npm run test:unit` locally
   * If you've updated any of the response codecs, you should  update the test snapshots by running `npm run test:unit -- -u`
5. Make sure your code lints by running `npm run lint` locally.
6. Issue that pull request!

## Report bugs using Github's [issues](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues)
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/ScaleLeap/amazon-mws-api-sdk/issues/new); it's that easy!

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can. [This PR makes for a good issue](https://github.com/ScaleLeap/amazon-mws-api-sdk/pull/155#issue-458167506)
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People *love* thorough bug reports. I'm not even kidding.

## We use [commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint) for linting commit messages

To make sure commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)

## Testing locally

[This comment](https://github.com/ScaleLeap/amazon-mws-api-sdk/pull/155#issuecomment-665407535) illustrates a good way to test this library locally against your project

- Install [YALC](https://github.com/whitecolor/yalc) to be able to develop against my script using this library.
- Fork and clone the base repo.
- In the new directory, `npm install`, then `npm run build` to verify it works without issue.
- `yalc publish` to publish the package locally.
- In the script directory that uses this package, `yalc add @scaleleap/amazon-mws-api-sdk`
- For every update: `npm run build && yalc push` to push the update directly to your script.

## Unit tests

Each method in each section will have its own unit test. Unit testing is done by passing mock XML to be parsed by the API and creating a snapshot of the result.

Mock XML files can be found in [/test/unit/_\_fixtures__](/test/unit/__fixtures__) and their test counterparts in [/test/unit/](/test/unit/)

Snapshots contain the result of parsing the XML, to investigate. These snapshots can be used to investigate what the parsed output would look like. Snapshots can be found in [/test/unit/_\_snapshots__](/test/unit/__snapshots__)

## Integration tests

Integration tests use [PollyJS](https://github.com/Netflix/pollyjs/) to perform actions and record results against the API using the `@scaleleap/amazon-mws-api-sdk` library. This is mostly done for inconsequential parts of the API that do not require actual data, for example `getServiceStatus`. 

The tests are performed on a separate server to hide the actual account keys. 

Results can be found in the [/test/integration/_\_recordings__](/test/integration/__recordings__) and their test counterparts in the [/test/integration](/test/integration) folder

## Testing against the API itself

Unfortunately there is no actual sandbox for Amazon's MWS API. 
Testing has to be done with actual products on an actual seller account. 
This, unfortunately, limits the testing we can do for most of the sections of the API. 
If you encounter any problems while using the library with actual data, feel free to open an issue

[Here's a discussion on testing against the Amazon MWS API](https://sellercentral.amazon.com/forums/t/creating-test-products-for-development/474414/15)

## Testing locally without having to access the API

The library automatically parses and validates the XML response from the API to make sure the response matches the types defined. 

To test the library's parsing and validation we can simulate the API into returning XML. 

This can be done by overwriting the `HttpClient`'s  default `"fetch"` to have it always return the same response for every request.

Here's an example of mocking using XML files in [/test/unit/_\_fixtures__](/test/unit/__fixtures__)

```typescript
export const getFixture = (filename: string): string =>
  readFileSync(join(__dirname, `unit/__fixtures__/${filename}.xml`), { encoding: 'utf8' })

export const createMockHttpClient = (fixture: string) =>
  new MWS(
    new HttpClient(httpConfig, () =>
      Promise.resolve({
        data: getFixture(fixture),
        headers,
      }),
    ),
  )
```

And from there we can use the mock `HttpClient` to test out any section. For example

```typescript
const mockListMatchingProducts = createMockHttpClient('products_list_matching_products')

/**
 * `response` in this case will return the parsed XML from `/test/unit/__fixtures__/products_list_matching_products.xml`
 */
const [response] = await mockListMatchingProducts.products.listMatchingProducts({
    MarketplaceId: '',
    Query: '',
  })
```