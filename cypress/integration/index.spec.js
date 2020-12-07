context("index.html", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080");
  });

  it("view title", () => {
    cy.get("h1").should("contain", "visual-regression-test-sample");
  });
});