import {CSSProperties} from 'react'
import {Absence, AbsenceType} from '../api/absences'


// TODO: Replace any styles by CSS classes, styled components, Tailwind or similar.

const {format: formatDate} = new Intl.DateTimeFormat('en-GB', {dateStyle: 'short'})

const absenceType: Record<AbsenceType, string> = {
	FAMILY: 'Family',
	COMPASSIONATE_LEAVE: 'Compassionate leave',
	MEDICAL: 'Medical',
	SICKNESS: 'Sickness',
	ANNUAL_LEAVE: 'Annual leave',
}

const absenceStyle: CSSProperties = {
	display: 'block',
	marginBottom: '1rem',
}

export function AbsenceCard(props: {absence: Absence, onClick?: () => void}) {
	const {absence, onClick} = props

	const employeeName = `${absence.employee.firstName} ${absence.employee.lastName}`

	const employee = !onClick ? employeeName : (
		<button
			type='button'
			onClick={onClick}
		>
			{employeeName}
		</button>
	)

	return (
		<section
			key={absence.id}
			data-test='absence-card'
			style={absenceStyle}
		>
			Employee: {employee}<br/>
			Start date: {formatDate(absence.start)} <br/>
			End date: {formatDate(absence.end)} <br/>
			Status: {absence.approved ? 'Approved' : 'Pending approval'} <br/>
			Reason: {absenceType[absence.type]} <br/>
			Conflict: {absence.hasConflict ? 'Yes' : 'No'} <br/>
		</section>
	)
}
