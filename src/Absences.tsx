import {AbsenceType, Absence} from '../api/absences'
import {Fragment} from 'react'


const {format: formatDate} = new Intl.DateTimeFormat('en-GB', {dateStyle: 'short'})

const absenceType: Record<AbsenceType, string> = {
	FAMILY: 'Family',
	COMPASSIONATE_LEAVE: 'Compassionate leave',
	MEDICAL: 'Medical',
	SICKNESS: 'Sickness',
	ANNUAL_LEAVE: 'Annual leave',
}

export function Absences(props: {absences: Absence[]}) {
	const {absences} = props

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
					Reason: {absenceType[absence.type]} <br/>
					Conflict: {absence.hasConflict ? 'Yes' : 'No'} <br/>
				</section>
			))}
		</Fragment>
	)
}

