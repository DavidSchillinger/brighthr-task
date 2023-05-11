import {ApiAbsence} from '../../api/absences'
import {mockAbsence} from '../../mocks/absence'


const absenceSelector = '[data-test="absence-card"]'

const interceptFetches = (absences: ApiAbsence[]) => {
	cy.intercept('GET', 'https://front-end-kata.brighthr.workers.dev/api/absences', {
		statusCode: 200,
		body: absences,
	}).as('fetchAbsences')

	cy.intercept('GET', 'https://front-end-kata.brighthr.workers.dev/api/conflict/**', {
		statusCode: 200,
		body: {conflicts: true},
	}).as('fetchConflict')
}

describe('BrightHR Absences', () => {
	it('displays the absence', () => {
		interceptFetches([mockAbsence({
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
		cy.get(absenceSelector).contains('Conflict: Yes')
	})
})
