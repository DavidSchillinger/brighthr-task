import {Absence} from '../api/absences'
import {useFetchGet} from '../api/useFetchGet'
import {Absences} from './Absences'


export function App() {
	const absences = useFetchGet<Absence[]>('https://front-end-kata.brighthr.workers.dev/api/absences')

	switch (absences.status) {
	case 'pending':
		return <div>Loading absences...</div>
	case 'rejected':
		return <div>We were unable to show this. Please try again.</div>
	case 'fulfilled':
		return <Absences absences={absences.value}/>
	}
}
