// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('abrirLoja', () =>{
    cy.wait(2000)
    cy.request({       
        url: Cypress.env('url_api') + '/empresa',
        method: 'POST',
        body: {
            COD_EMPRESA: 1,
	        SITUACAO: 1  
        }
        }).then(response => {
            expect(response.status).to.eq(200)    
        })
    })

Cypress.Commands.add('fecharLoja', () =>{
    cy.wait(2000)
    cy.request({
        url: Cypress.env('url_api') + '/empresa',
        method: 'POST',
        body: {
            COD_EMPRESA: 1,
	        SITUACAO: 0  
        }
        }).then(response => {
            expect(response.status).to.eq(200)    
        })
    })

Cypress.Commands.add('lançarPedido', (dados) =>{
    cy.abrirLoja()
            
    cy.visit(Cypress.env('url_site'))

    cy.xpath('//span[text()="Açaí Zero - 180ML"]')
        .click()    
    
    cy.xpath('//button[contains(@class, "btn-success")][text()[contains(.,"Continuar ")]]')
        .click()

    cy.xpath('//button[contains(@class, "btn-success")][text()[contains(.,"Adicionar ao pedido ")]]')
        .click()
        
    cy.xpath('//button[text()="Finalizar pedido "]')
        .click()

    cy.get('input[placeholder="Telefone"]')
        .type(dados.telefone)

    cy.get('input[placeholder="CEP"] ')
        .clear()
        .type(dados.cep)
    
    cy.wait(1000)

    cy.get('input[placeholder="Nome"]')
        .clear()
        .type(dados.nome)

    cy.get('input[placeholder="N°"]')
        .clear()
        .type(dados.numero)

    cy.xpath('//button[contains(@class, "btn-block")][text()[contains(.,"Salvar ")]]')
        .click()
})