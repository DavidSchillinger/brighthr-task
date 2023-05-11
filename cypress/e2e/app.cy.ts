import {Absence} from '../../api/absences'
import {mockAbsence} from '../../mocks/absence'


const absenceSelector = '[data-test="absence-card"]'

const interceptFetchAbsences = (absences: Absence[]) => {
	cy.intercept('GET', 'https://front-end-kata.brighthr.workers.dev/api/absences', {
		statusCode: 200,
		body: absences,
	}).as('fetchAbsences')
}

describe('BrightHR Absences', () => {
	it('displays the absence', () => {
		interceptFetchAbsences([mockAbsence({employee: {firstName: 'Foo', lastName: 'Bar', id: '0'}})])
		cy.visit('/')

		cy.get(absenceSelector).should('be.visible')
		cy.get(absenceSelector).contains('Employee: Foo Bar')
	})
})
