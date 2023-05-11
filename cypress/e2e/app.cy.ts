describe('BrightHR Absences', () => {
	it('displays "BrightHR Task"', () => {
		cy.visit('/')
		cy.contains('BrightHR Task')
	})
})
