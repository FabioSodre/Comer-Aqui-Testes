/// <reference types="cypress" />
require('cypress-xpath')

describe('Tarefas', () =>{

    let testData;

    before( () => {
        cy.fixture('dados').then(d =>{
            testData = d
        })
    })

    context('Delivery', () =>{

        it('Lançar um pedido', () =>{
            const dados = testData.cad

            cy.lançarPedido(dados)

            cy.xpath('//img[contains(@alt,"Cartão")]')
                .click()

            cy.wait(5000)

            cy.xpath('//button[contains(@class, "btn-block")][text()[contains(.,"Finalizar ")]]')
                .click()
            
            cy.xpath('//h3[text()="Pedido pendente"]')
                .should('be.visible')    
        })

        it('Pedido recebido pela integração', () =>{
            const dados = testData.cad

            cy.lançarPedido(dados)

            cy.xpath('//img[contains(@alt,"Cartão")]')
                .click()

            cy.wait(8000)

            cy.xpath('//button[contains(@class, "btn-block")][text()[contains(.,"Finalizar ")]]')
                .click()
            
            cy.xpath('//h3[text()="Pedido pendente"]')
                .should('be.visible')    

            cy.wait(60000)
                
            cy.xpath('//h3[text()="Pedido recebido"]')
                .should('be.visible')                 
        })

        it('Formas de pagamento', () =>{
            const dados = testData.cad

            cy.lançarPedido(dados)

            cy.xpath('//img[contains(@alt,"Dinheiro")]')
                .should('be.visible')
                .click()
            
            cy.xpath('//li[contains(@class,"selected")]//child::img[contains(@alt,"Dinheiro")]')       

            cy.xpath('//img[contains(@alt,"Cartão")]')
                .should('be.visible')
                .click()

            cy.xpath('//li[contains(@class,"selected")]//child::img[contains(@alt,"Cartão")]')    

            cy.xpath('//img[contains(@alt,"Pix")]')
                .should('be.visible')
                .click()

            cy.xpath('//li[contains(@class,"selected")]//child::img[contains(@alt,"Pix")]')        

        })

        it('Pagamento em Dinheiro com troco', () =>{
            const dados = testData.cad

            cy.lançarPedido(dados)

            cy.xpath('//img[contains(@alt,"Dinheiro")]')
                .should('be.visible')
                .click()

            cy.xpath('//button[contains(@class, "btn-block")][text()[contains(.,"Finalizar ")]]')
                .click()
                
            cy.wait(1000)

            cy.xpath('//button[contains(@class,"confirm")]')
                .should('be.visible')
                .click()

            cy.xpath('//input[contains(@placeholder,"Troco para")]')
                .type(5000)
            
            cy.wait(5000)

            cy.xpath('//button[contains(@class, "btn-success")][text()[contains(.,"Confirmar ")]]')
                .click()    
            
            cy.xpath('//h3[text()="Pedido pendente"]')
                .should('be.visible')
        })

        it('Pagamento em Dinheiro sem troco', () =>{
            const dados = testData.cad

            cy.lançarPedido(dados)

            cy.xpath('//img[contains(@alt,"Dinheiro")]')
                .should('be.visible')
                .click()

            cy.xpath('//button[contains(@class, "btn-block")][text()[contains(.,"Finalizar ")]]')
                .click()
                
            cy.wait(5000)

            cy.xpath('//button[contains(@class,"cancel")]')
                .should('be.visible')
                .click() 
            
            cy.xpath('//h3[text()="Pedido pendente"]')
                .should('be.visible')
        })
    })
})