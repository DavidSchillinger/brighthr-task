// Instead of using Absence directly in the UI, it might be nice to transform this into a more useful object
// after fetching. e.g. We could transform ISO dates to Date and add an endDate field for convenience.
// I'll assume that's out-of-scope for this task.

export type Absence = {
	id: number,
	startDate: string, // ISO8601
	days: number,
	absenceType: AbsenceType,
	employee: Employee,
	approved: boolean,
}

type AbsenceType = 'FAMILY' | 'COMPASSIONATE_LEAVE' | 'MEDICAL' | 'SICKNESS' | 'ANNUAL_LEAVE'

type Employee = {
	id: string,
	firstName: string,
	lastName: string,
}
