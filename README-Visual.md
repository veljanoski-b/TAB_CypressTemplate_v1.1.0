# Visual tests with Percy

First, please read the Percy documentation [Percy documentation](https://docs.percy.io/docs).

Example Visual tests:

- `cypress\integration\visualChecks.feature`

The examples visit several pages, take screenshots, upload them to the Percy site, and when you log into Percy you can compare the 'actual' screenshots from this build with baseline 'expected' screenshots which are stored in Percy.

If there are valid differences, you can update the baseline screenshots using the :thumbsup: icon.

## To run the example visual tests

- Open the [Percy cypress template project](https://percy.io/49019487/CypressTemplate)
- Copy PERCY_TOKEN from project settings [Token is here](https://percy.io/49019487/CypressTemplate/settings) (login by entering your Valtech email address and pressing tab, then use SSO to login to Browserstack)
- Add token as environment variable `PERCY_TOKEN` on the machine from which you will run visual tests.
- Run visual tests using script `visual-tests-run`
- After tests are done you will see the link to results in Percy (known as a 'Build'). You can also find all the results yourself following the [project link](https://percy.io/49019487/CypressTemplate)

### Example of visual tests run on Windows machine

```psh
> $env:PERCY_TOKEN = "***"
> npm run visual-tests-run
```

As a result of these 2 commands run you will recieve the link to the Build visual test results in Percy.

For example:

```text
[percy] Finalized build #15: https://percy.io/49019487/CypressTemplate/builds/18107577
```

## Setting up your own Percy project

### Percy project

For your own client projects, please create new project in Percy. Then go to the 'Project Settings' tab in Percy to get the `PERCY_TOKEN` value for your client project. This will help to keep your data separated from other projects.

### Limited Percy screenshots

Note that most Percy project licenses have a limited number of screenshots which can be uploaded each month. You may need to exclude the visual tests from the whole tests scope which are run by default.

## Running all tests without a PERCY_TOKEN

IF you don't have a PERCY_TOKEN set, you can still run all tests in your test suite.

Without a token, Percy will display:

```text
[percy] Skipping visual tests
[percy] Error: Missing Percy token
```

Your tests will still visit each page, and will pass, but nothing will be recorded on the Percy website.
