/// <reference types="cypress" />

import { navigateTo } from "../support/page_objects/navigationPage"


describe('Our first suite', () => {

    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('first test', () => {
       
        navigateTo.formsLayoutsPage()

        //by Tag Name
        cy.get('input')

        //by ID value
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

        //by two different attibutes
        cy.get('[placeholder="Email"][nbinput]')

        //by Tag name, Attribute with value, ID value and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended by Cypress: make your own attribute
        cy.get('[data-cy="imputEmail1"]')

    })

    it('find web elements', () => {

        //cy.get('')
        //cy.find('')
        //cy.contains('')

        navigateTo.formsLayoutsPage()

    //1. Add your own locator
    //    cy.get('[data-cy="signin"]')

    //2. Find by text
        cy.contains('Sign in')

     //3. Find By selector and text   
        cy.contains('[status="warning"]','Sign in')

     //4. Use unique "KEY" locator and travel through the DOM
        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('nb-card').find('nb-checkbox').click()
    
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

     //you CAN't call child command from the cy.   
     //   cy.find('button')
    })

    it('then and wrap', () => {

        navigateTo.formsLayoutsPage()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //selenium
        // const fistForm = cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')

        // fistForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // fistForm.find('[for="inputPassword2"]').should('contain', 'Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //cypress style

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordSecondText)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            })

        })


    })

    it('invoke command', () => {
        navigateTo.formsLayoutsPage()


        //1
        cy.get('[for="exampleInputEmail1"]')
            .should('have.text', 'Email address')
            .and('have.class', 'label')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.text('Email address')
            expect(label).to.have.class('label')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        
        //checked or unchecked
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')
    

        cy.contains('nb-card', 'Basic form').find('nb-checkbox').then( checkBox => {
            cy.wrap(checkBox)
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('not.contain', 'checked')
            .then( classValue => {
                expect(classValue).not.contain('checked')
            })
        })

    })

    it('invoke command 2', () => {

        
        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                    if ( !dateAttribute.includes(futureMonth) ){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent(day)
                    } else {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                        return
                    }
                })
                return dateAssert
            }

            navigateTo.datepickerPage()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            const dateAssert = selectDayFromCurrent(300)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)            
        })


    })

    it('radio button', () => {
        navigateTo.formsLayoutsPage()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')
            
            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})
            
            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')    
        })
    })

    it('checkbox', () => {
        navigateTo.toasterPage()

        cy.get('[type="checkbox"]').eq(1).check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})

    })

    it('lists and dropdowns', () => {

        //1
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //2
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index != 3){
                    cy.wrap(dropdown).click()
                }
                
            })
        })
    })

    it('tables', () => {
        navigateTo.smartTablePage()

        //1 Update the table
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        //2 Add new value and verify
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
            cy.wrap(tableColumns).eq(3).should('contain', 'Bondar')
        })

        //3 Table search
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead').find('[placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
        

    })

    it('pop up', () => {
        navigateTo.smartTablePage()


        //1
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (alert) => {
            expect(alert).to.equal('Are you sure you want to delete?')
        })   

        //2
        // const stub = cy.stub()  
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })   

    })

    it('tooltip' , () => {
        navigateTo.tooltipPage()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

})