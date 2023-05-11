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
		interceptFetchAbsences([mockAbsence({
			employee: {firstName: 'Foo', lastName: 'Bar', id: '0'},
			startDate: '2020-10-20',
			days: 3,
			approved: true,
			absenceType: 'FAMILY',
		})])

		cy.visit('/')

		cy.get(absenceSelector).should('be.visible')
		cy.get(absenceSelector).contains('Employee: Foo Bar')
		cy.get(absenceSelector).contains('Start date: 20/10/2020')
		cy.get(absenceSelector).contains('End date: 23/10/2020')
		cy.get(absenceSelector).contains('Status: Approved')
		cy.get(absenceSelector).contains('Reason: Family')
	})
})
