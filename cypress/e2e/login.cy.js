describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("logins successfully", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("logins error on empty login", () => {
    cy.login(null, "123");
    cy.get("#mail").then((el) => {
      expect(el[0].checkValidity()).to.be.false;
      expect(el[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("logins error on empty password", () => {
    cy.login("bropet@mail.ru", null);
    cy.get("#pass").then((el) => {
      expect(el[0].checkValidity()).to.be.false;
      expect(el[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });
});
