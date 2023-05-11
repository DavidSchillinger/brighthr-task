import {addDays} from 'date-fns'
import axios from 'axios'


export type ApiAbsence = {
	id: number,
	startDate: string, // ISO8601
	days: number,
	absenceType: AbsenceType,
	employee: Employee,
	approved: boolean,
}

export type Absence = {
	id: number,
	type: AbsenceType,
	employee: Employee,
	approved: boolean,
	hasConflict: boolean,
	start: Date,
	end: Date,
}

export type AbsenceType =
	'FAMILY'
	| 'COMPASSIONATE_LEAVE'
	| 'MEDICAL'
	| 'SICKNESS'
	| 'ANNUAL_LEAVE'

type Employee = {
	id: string,
	firstName: string,
	lastName: string,
}

// Note the waterfall here and the potential of making _many_ HTTP requests.
// I'd highly recommend either rendering only few absences at a time or changing the backend, so we can avoid this.
export async function fetchAbsences(): Promise<Absence[]> {
	return (
		axios.get<ApiAbsence[]>(
			'https://front-end-kata.brighthr.workers.dev/api/absences',
		)
		.then(response => response.data)
		.then(absences => (
			Promise.all(absences.map(absence => (
				axios.get<{conflicts: boolean}>(
					`https://front-end-kata.brighthr.workers.dev/api/conflict/${absence.id}`,
				)
				.then(response => ({...absence, hasConflict: response.data.conflicts}))
			)))
			.then(absences => absences.map(absence => ({
				id: absence.id,
				type: absence.absenceType,
				employee: absence.employee,
				approved: absence.approved,
				hasConflict: absence.hasConflict,
				...calculateDates(absence),
			})))
		))
	)
}

function calculateDates(absence: ApiAbsence): {start: Date, end: Date} {
	const start = new Date(absence.startDate)
	const end = addDays(start, absence.days)

	return {start, end}
}
