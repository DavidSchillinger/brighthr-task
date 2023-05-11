import {ApiAbsence} from '../../api/absences'
import {mockAbsence} from '../../mocks/absence'


const absenceSelector = '[data-test="absence-card"]'
const startDateSortSelector = '[data-test="start-date-sort"]'
const endDateSortSelector = '[data-test="end-date-sort"]'
const reasonSortSelector = '[data-test="reason-sort"]'
const employeeNameSortSelector = '[data-test="employee-name-sort"]'

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

	it('allows sorting', () => {
		interceptFetches([
			mockAbsence({
				employee: {firstName: 'Foo', lastName: 'Bar', id: '0'},
				startDate: '2020-10-20',
				days: 3,
				absenceType: 'FAMILY',
			}),
			mockAbsence({
				employee: {firstName: 'Bar', lastName: 'Foo', id: '1'},
				startDate: '2020-10-25',
				days: 3,
				absenceType: 'ANNUAL_LEAVE',
			}),
		])

		cy.visit('/')

		// Sorted by employee name initially:
		cy.get(absenceSelector).first().contains('Employee: Bar Foo')
		cy.get(absenceSelector).last().contains('Employee: Foo Bar')

		cy.get(employeeNameSortSelector).click()
		cy.get(absenceSelector).first().contains('Employee: Foo Bar')
		cy.get(absenceSelector).last().contains('Employee: Bar Foo')
		cy.get(employeeNameSortSelector).click() // Flip back, so the next test causes a UI change.

		cy.get(startDateSortSelector).click()
		cy.get(absenceSelector).first().contains('Start date: 20/10/2020')
		cy.get(absenceSelector).last().contains('Start date: 25/10/2020')

		cy.get(reasonSortSelector).click()
		cy.get(absenceSelector).first().contains('Reason: Annual leave')
		cy.get(absenceSelector).last().contains('Reason: Family')

		cy.get(endDateSortSelector).click()
		cy.get(absenceSelector).first().contains('End date: 23/10/2020')
		cy.get(absenceSelector).last().contains('End date: 28/10/2020')
	})
})
