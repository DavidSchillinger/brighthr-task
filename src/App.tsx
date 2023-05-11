import {useAbsences} from '../api/absences'
import {Absences} from './Absences'


export function App() {
	const absences = useAbsences()

	switch (absences.status) {
	case 'pending':
		return <div>Loading absences...</div>
	case 'rejected':
		return <div>We were unable to show this. Please try again.</div>
	case 'fulfilled':
		return <Absences absences={absences.value}/>
	}
}
