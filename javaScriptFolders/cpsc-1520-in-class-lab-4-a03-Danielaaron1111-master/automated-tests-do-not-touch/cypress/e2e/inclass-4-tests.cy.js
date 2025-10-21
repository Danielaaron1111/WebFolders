describe('index is loaded correctly (debugging)', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
  })
})

describe('In class has the correct functionality.', ()=> {
  it('check that submitting the form adds an item on the page.', ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // type in the values.
    cy.get('input[name="order-item-name"]').type('Pizza')
    cy.get('input[name="order-item-price"]').type('10')
    cy.get('select[name="order-size"]').select('Large')

    // submit the form.
    cy.get('button[type="submit"]').click()

    // check that the item is added.
    cy.get('#order-item-list').contains('10')
    cy.get('#order-item-list').contains('Large')
    cy.get('#order-item-list').contains('Pizza')
    // check that one is added.
    cy.get('#order-item-list').children().should('have.length', 1)
  })

  it("check that empty inputs does not add an item.", ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // submit the form.
    cy.get('button[type="submit"]').click()

    // check that the errors are visible.
    cy.get("#name-invalid-feedback").should('be.visible')
    cy.get("#price-invalid-feedback").should('be.visible')
    cy.get("#size-invalid-feedback").should('be.visible')

    // check that the item is added.
    cy.get('#order-item-list').children().should('have.length', 0)
  })

  it("check that empty name does not add an item.", ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // type in the values.
    cy.get('input[name="order-item-price"]').type('10')
    cy.get('select[name="order-size"]').select('Large')
    
     // submit the form.
     cy.get('button[type="submit"]').click()

    // check that the errors are visible.
    cy.get("#name-invalid-feedback").should('be.visible')

    // check that the item is added.
    cy.get('#order-item-list').children().should('have.length', 0)
  })

  it("check that empty price does not add an item.", ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // type in the values.
    cy.get('input[name="order-item-name"]').type('Pizza')

    cy.get('select[name="order-size"]').select('Large')
    
    // submit the form.
    cy.get('button[type="submit"]').click()

    // check that the errors are visible.
    cy.get("#price-invalid-feedback").should('be.visible')

    // check that the item is added.
    cy.get('#order-item-list').children().should('have.length', 0)
  })

  it("check that price less than 5 does not add an item.", ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // type in the values.
    cy.get('input[name="order-item-name"]').type('Pizza')
    cy.get('input[name="order-item-price"]').type('4')
    cy.get('select[name="order-size"]').select('Large')
    
    // submit the form.
    cy.get('button[type="submit"]').click()

    // check that the errors are visible.
    cy.get("#price-invalid-feedback").should('be.visible')

    // check that the item is added.
    cy.get('#order-item-list').children().should('have.length', 0)
  })


  it("check that empty size does not add an item.", ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // type in the values.
    cy.get('input[name="order-item-name"]').type('Pizza')
    cy.get('input[name="order-item-price"]').type('10')
    
    // submit the form.
    cy.get('button[type="submit"]').click()

    // check that the errors are visible.
    cy.get("#size-invalid-feedback").should('be.visible')

    // check that the item is added.
    cy.get('#order-item-list').children().should('have.length', 0)
  })
})
