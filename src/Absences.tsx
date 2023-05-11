import {Absence, AbsenceType} from '../api/absences'
import {CSSProperties, Fragment} from 'react'
import {Sorting, useSorting} from './Sorting'


const {format: formatDate} = new Intl.DateTimeFormat('en-GB', {dateStyle: 'short'})

const absenceType: Record<AbsenceType, string> = {
	FAMILY: 'Family',
	COMPASSIONATE_LEAVE: 'Compassionate leave',
	MEDICAL: 'Medical',
	SICKNESS: 'Sickness',
	ANNUAL_LEAVE: 'Annual leave',
}

// TODO: Replace by CSS classes, styled components, Tailwind or similar.
const absenceStyle: CSSProperties = {
	display: 'block',
	marginBottom: '1rem',
}

export function Absences(props: {absences: Absence[]}) {
	const {absences, setSort} = useSorting(props.absences)

	return (
		<Fragment>
			<Sorting onChange={setSort}/>

			<hr/>

			{absences.map(absence => (
				<section
					key={absence.id}
					data-test='absence-card'
					style={absenceStyle}
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
