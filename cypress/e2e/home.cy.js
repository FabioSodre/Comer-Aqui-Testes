/// <reference types="cypress" />
require('cypress-xpath')

describe('Tarefas', () =>{

    context('Acesso', ()=> {
        
        it('Acesso ao site ComerAqui', () =>{
            cy.visit(Cypress.env('url_site'))
            
            cy.title()
                .should('eq','Comer Aqui')
        })

        it('Loja aberta', () =>{
            cy.abrirLoja()
            cy.wait(2000)
            cy.visit(Cypress.env('url_site'))

            cy.contains('p')
                .parent()
                .find('p[class=texto-empresa-fechada]')
                .should('not.exist')

        })

        it('Loja fechada', () =>{
            cy.fecharLoja()
            cy.wait(5000)
            cy.visit(Cypress.env('url_site'))

            cy.contains('p')
                .parent()
                .find('p[class=texto-empresa-fechada]')
                .should('exist')

        })
    })
})