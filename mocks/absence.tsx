import {ApiAbsence} from '../api/absences'


export function mockAbsence(override?: Partial<ApiAbsence>): ApiAbsence {
	return {
		id: uniqueId(),
		startDate: '2000-10-20T20:30:00.000Z',
		days: 3,
		absenceType: 'MEDICAL',
		employee: {
			id: '0',
			firstName: 'Jabez',
			lastName: 'Nasser',
		},
		approved: true,
		...override,
	}
}

let id = 0

function uniqueId() {
	return id++
}
