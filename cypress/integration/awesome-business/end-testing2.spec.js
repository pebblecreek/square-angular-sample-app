/// <reference types="cypress" />

describe('end testing', () => {
	it("visit url", () => {
		cy.visit("http://localhost:4200/products");
		cy.wait(3000);
	})


	it("select any item ", () => {
		cy.get("h5").contains("Carrots")
		cy.get(".product-button-0").contains("Buy").click()
		cy.wait(5000)
		cy.get("h5").contains("Peas")
		cy.get(".product-button-2").contains("Buy").click()
		cy.wait(5000)
		cy.get("button").contains("Cart").click()
		cy.get("button").contains("Checkout").click()
		cy.wait(10000)
	})

	it("find iframe ", () => {
		cy.get(".sq-card-component").within(function ($iframe) {
			const test = $iframe.contents().find('body')
			cy.wrap(test).find("input[id='cardNumber']").type("4111 1111 1111 1111")
			cy.wrap(test).find("input[id='expirationDate']").type("12/25")
			cy.wrap(test).find("input[id='cvv']").type("111")
			cy.wrap(test).find("input[id='postalCode']").type("11111")
			cy.wait(3000)
		})

	})
	it("press pay button", () => {
		cy.get("button").contains("Pay").click();
	})
})