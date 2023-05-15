import {Absence} from '../api/absences'
import {CSSProperties, useState} from 'react'
import {Sorting, useSorting} from './Sorting'
import {AbsenceCard} from './AbsenceCard'


const containerStyle: CSSProperties = {
	display: 'flex',
	gap: '2rem',
}

export function Absences(props: {absences: Absence[]}) {
	const {absences, setSort} = useSorting(props.absences)
	const [focussedAbsences, setFocussedAbsences] = useState<Absence[]>([])

	return (
		<div style={containerStyle}>
			<div>
				<Sorting onChange={setSort}/>

				<hr/>

				{absences.map(absence => (
					<AbsenceCard
						key={absence.id}
						absence={absence}
						onClick={() => setFocussedAbsences(absences.filter(a => a.employee.id === absence.employee.id))}
					/>
				))}
			</div>

			{focussedAbsences.length > 0 && (
				<div>
					{focussedAbsences.map(absence => (
						<AbsenceCard
							key={absence.id}
							absence={absence}
						/>
					))}
				</div>
			)}
		</div>
	)
}
