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
