import {ButtonHTMLAttributes, CSSProperties, useMemo, useState} from 'react'
import {ascend, descend} from 'ramda'
import {Absence} from '../api/absences'


function toggle<A, B>(a: A, b: B): (current: unknown) => A | B {
	return current => current === a ? b : a
}

export function Sorting(props: {onChange: (callback: (current: SortComparatorKey) => SortComparatorKey) => void}) {
	const {onChange} = props

	return (
		<div>
			Sort by: {' '}

			<SortButton
				data-test='start-date-sort'
				onClick={() => onChange(toggle('StartDateAscend', 'StartDateDescend'))}
			>
				Sort by start date
			</SortButton>

			<SortButton
				data-test='end-date-sort'
				onClick={() => onChange(toggle('EndDateAscend', 'EndDateDescend'))}
			>
				Sort by end date
			</SortButton>

			<SortButton
				data-test='reason-sort'
				onClick={() => onChange(toggle('TypeAscend', 'TypeDescend'))}
			>
				Sort by reason
			</SortButton>

			<SortButton
				data-test='employee-name-sort'
				onClick={() => onChange(toggle('NameAscend', 'NameDescend'))}
			>
				Sort by employee name
			</SortButton>
		</div>
	)
}

// TODO: Replace by CSS classes, styled components, Tailwind or similar.
const sortButtonStyle: CSSProperties = {
	marginRight: '1rem',
}

function SortButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type='button'
			style={sortButtonStyle}
			{...props}
		/>
	)
}

const employeeName = (absence: Absence) => `${absence.employee.firstName} ${absence.employee.lastName}`

type SortComparatorKey = keyof typeof SortComparators;

const SortComparators = {
	StartDateAscend: ascend<Absence>(absence => absence.start),
	StartDateDescend: descend<Absence>(absence => absence.start),
	EndDateAscend: ascend<Absence>(absence => absence.end),
	EndDateDescend: descend<Absence>(absence => absence.end),
	TypeAscend: ascend<Absence>(absence => absence.type),
	TypeDescend: descend<Absence>(absence => absence.type),
	NameAscend: ascend<Absence>(employeeName),
	NameDescend: descend<Absence>(employeeName),
}

export function useSorting(absences: Absence[]) {
	const [sort, setSort] = useState<SortComparatorKey>('NameAscend')

	const sorted = useMemo(
		() => absences.sort(SortComparators[sort]),
		[absences, sort],
	)

	return {
		absences: sorted,
		setSort,
	}
}
