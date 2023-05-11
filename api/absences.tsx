import {useFetchGet} from './useFetchGet'
import {useMemo} from 'react'
import {addDays} from 'date-fns'


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

export function useAbsences() {
	const absences = useFetchGet<ApiAbsence[]>('https://front-end-kata.brighthr.workers.dev/api/absences')

	return useMemo(
		() => {
			switch (absences.status) {
			case 'pending':
			case 'rejected':
				return absences
			case 'fulfilled':
				return {
					...absences,
					value: absences.value.map(transform),
				}
			}
		},
		[absences],
	)
}

function transform(absence: ApiAbsence): Absence {
	return {
		id: absence.id,
		type: absence.absenceType,
		employee: absence.employee,
		approved: absence.approved,
		...calculateDates(absence),
	}
}

function calculateDates(absence: ApiAbsence): {start: Date, end: Date} {
	const start = new Date(absence.startDate)
	const end = addDays(start, absence.days)

	return {start, end}
}
