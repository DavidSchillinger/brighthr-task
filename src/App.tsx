import {Fragment} from 'react'
import {Absence} from '../api/absences'
import {useFetchGet} from '../api/useFetchGet'


const {format: formatDate} = new Intl.DateTimeFormat('en-GB', {dateStyle: 'short'})

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
				{absences.value.map(absence => (
					<section
						key={absence.id}
						data-test='absence-card'
					>
						Employee: {absence.employee.firstName} {absence.employee.lastName}
						Start date: {formatDate(new Date(absence.startDate))}
					</section>
				))}
			</Fragment>
		)
	}
}
