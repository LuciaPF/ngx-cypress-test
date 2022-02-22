/// <reference types="cypress"/>

describe('Our first suite', () => {

    it('first test', () => {

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different atributes 
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, Attribute with value, ID and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    })
})