import {addDays} from 'date-fns'
import {Fragment} from 'react'
import {Absence, AbsenceType} from '../api/absences'
import {useFetchGet} from '../api/useFetchGet'


const {format: formatDate} = new Intl.DateTimeFormat('en-GB', {dateStyle: 'short'})

const absenceTypeFormat: Record<AbsenceType, string> = {
	FAMILY: 'Family',
	COMPASSIONATE_LEAVE: 'Compassionate leave',
	MEDICAL: 'Medical',
	SICKNESS: 'Sickness',
	ANNUAL_LEAVE: 'Annual leave',
}

export function App() {
	const absences = useFetchGet<Absence[]>('https://front-end-kata.brighthr.workers.dev/api/absences')

	switch (absences.status) {
	case 'pending':
		return <div>Loading absences...</div>
	case 'rejected':
		return <div>We were unable to show this. Please try again.</div>
	case 'fulfilled':
		return (
			<Fragment>
				{absences.value.map(absence => {
					// I'd normally compute this immediately after the HTTP request instead.
					const dates = calculateDates(absence)

					return (
						<section
							key={absence.id}
							data-test='absence-card'
						>
							Employee: {absence.employee.firstName} {absence.employee.lastName} <br/>
							Start date: {formatDate(dates.start)} <br/>
							End date: {formatDate(dates.end)} <br/>
							Status: {absence.approved ? 'Approved' : 'Pending approval'} <br/>
							Reason: {absenceTypeFormat[absence.absenceType]} <br/>
						</section>
					)
				})}
			</Fragment>
		)
	}
}

function calculateDates(absence: Absence): { start: Date, end: Date } {
	const start = new Date(absence.startDate)
	const end = addDays(start, absence.days)
	return {start, end}
}
