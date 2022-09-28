Hi!
To start using the Lighthouse tool in autotest, you need to go through a few preparatory steps:

1. Define the pages that Lighthouse should audit. For example, these could be the most important pages for a business or a developer, or both. If you don't know what pages they might be, you can use the following pages (as an example): Homepage, Product overview page, Product detail page, Checkout page, Contact page.

2. Perform Lighthouse audit for selected pages manually.

3. Determine the reference scores for the required practices. For example,
   SEO: 75
   Accessibility: 90
   Performance: 80

4. Confirm the defined reference scores with the PO, BA, Devs and/or other people responsible for it.

5. When you have reference scores for required Lighthouse practices (SEO, Perfromance, etc.), implement those scores in your Lighthouse Autotest. For example:
   "cy.wrap (results.performance) .should ('be.gt', 0.10);"
   According to this example, the performance should be greater than 10. If you run autotest and the result is greater than 10, your test will pass. If you run autotest and the result is below 10, your test will fail.
   Note: In autotests for Lighthouse, we must specify values in decimal fractions. For example: Lighthouse score of 100 is 1 in autotests, Lighthouse score of 10 is 0.10 in autotests, Lighthouse score of 15 is 0.15 in autotests, and so on.

Several approaches can be used to implement Lighthouse in your autotest:

1. You can create a separate test for each page
2. You can implement Lighthouse auditing into other tests. This can be an extra step.
3. You can create one test for all specified pages.
4. Surely you can implement it the way you think might be better for your autotest solution.

Pay attention! That in some cases the results of the Cypress Lighthouse audit do not match the results of the manual Lighthouse audit. Therefore, after the implementation of the Lighthouse in your autotests, run the autotest and perform manual testing with the Lighthouse, and compare the results. This is necessary for you to make sure that in your case the results of manual testing by a Lighthouse coincide with a cypress Lighthouse audit.
