import {Absence, AbsenceType} from '../api/absences'
import {Fragment, useMemo} from 'react'
import {addDays} from 'date-fns'


const {format: formatDate} = new Intl.DateTimeFormat('en-GB', {dateStyle: 'short'})

const absenceReason: Record<AbsenceType, string> = {
	FAMILY: 'Family',
	COMPASSIONATE_LEAVE: 'Compassionate leave',
	MEDICAL: 'Medical',
	SICKNESS: 'Sickness',
	ANNUAL_LEAVE: 'Annual leave',
}

function calculateDates(absence: Absence): {start: Date, end: Date} {
	const start = new Date(absence.startDate)
	const end = addDays(start, absence.days)

	return {start, end}
}

export function Absences(props: {absences: Absence[]}) {
	// I'd normally compute this immediately after the HTTP request instead.
	const absences = useMemo(
		() => props.absences.map(absence => ({
			id: absence.id,
			reason: absence.absenceType,
			employee: absence.employee,
			approved: absence.approved,
			...calculateDates(absence),
		})),
		[props.absences],
	)

	return (
		<Fragment>
			{absences.map(absence => (
				<section
					key={absence.id}
					data-test='absence-card'
				>
					Employee: {absence.employee.firstName} {absence.employee.lastName} <br/>
					Start date: {formatDate(absence.start)} <br/>
					End date: {formatDate(absence.end)} <br/>
					Status: {absence.approved ? 'Approved' : 'Pending approval'} <br/>
					Reason: {absenceReason[absence.reason]} <br/>
				</section>
			))}
		</Fragment>
	)
}

