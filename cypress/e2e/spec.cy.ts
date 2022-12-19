describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('[name="cityOfOrigin"] input').type('Paris')
    cy.get('li[data-option-index="0"]').click()

    cy.get('[name="cityOfDestination"] input').type('Marseille')
    cy.get('li[data-option-index="0"]').click()

    cy.get('[name="numberOfPassenger"]').type('1')

    cy.get('button[type="submit"]').click()

    cy.contains('Total Distance: 660.48 km')
  })
})
