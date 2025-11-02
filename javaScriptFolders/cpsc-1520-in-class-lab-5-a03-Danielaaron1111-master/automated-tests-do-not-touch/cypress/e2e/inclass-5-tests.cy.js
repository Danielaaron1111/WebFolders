describe('index is loaded correctly (debugging)', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
  })
})

describe('In class has the correct functionality.', ()=> {
  it('check that carousel is rendered with each images', ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // check that the carousel has 5 images.

    cy.get('.carousel-inner').children().should('have.length', 7)

    // check the images are included.
    cy.get('.carousel-inner')
      .invoke('html').should('contain','cat.jpg')
    cy.get('.carousel-inner')
      .invoke('html').should('contain','fox.jpg')
    cy.get('.carousel-inner')
      .invoke('html').should('contain','gecko.jpg')
    cy.get('.carousel-inner')
      .invoke('html').should('contain','leopard.jpg')
    cy.get('.carousel-inner')
      .invoke('html').should('contain','panda.jpg')
    cy.get('.carousel-inner')
      .invoke('html').should('contain','polar_bear.jpg')
  })

  it('adds to the saved list (only once) when the save button is clicked', ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // double click first item

    cy.get('.carousel-inner').children().eq(0).find('button').click()
    cy.get('.carousel-inner').children().eq(0).find('button').click()

    // add a second item
    cy.get('#next-button').click() // show the next image.
    cy.wait(500)
    cy.get('.carousel-inner').children().eq(1).find('button').click()
    

    // check that the saved list has 2 items.
    cy.get('#saved-images').children().should('have.length', 2)

  })

  it('removes from the saved list when the remove button is clicked', ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // Add two elements to the list.
    cy.get('.carousel-inner').children().eq(0).find('button').click()
    cy.get('#next-button').click() // show the next image.
    cy.wait(500)
    cy.get('.carousel-inner').children().eq(1).find('button').click()
    
    // remove the first element.
    cy.get('#saved-images').children().eq(0).find('button').click()

    // check that the saved list has 1 item.
    cy.get('#saved-images').children().should('have.length', 1)
  })

})
