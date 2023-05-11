import axios from 'axios'
import {useEffect, useState} from 'react'

// In reality, we'd likely want to use a more robust and flexible fetching library or maybe even something like Next.js
// This is just intended as a naive example of how we could achieve basic client-side fetching.
// Not testing this because I wouldn't expect to have to write this in the first place.

type Pending = { status: 'pending' }
type Fulfilled<Value> = { status: 'fulfilled', value: Value }
type Rejected = { status: 'rejected', reason: unknown }
type State<Value> = Fulfilled<Value> | Pending | Rejected

export function useFetchGet<Data>(url: string): State<Data> {
	const [state, setState] = useState<State<Data>>({status: 'pending'})

	useEffect(
		() => {
			axios.get<Data>(url)
			.then(response => {
				setState({status: 'fulfilled', value: response.data})
			})
			.catch(reason => {
				setState({status: 'rejected', reason})
			})
		},
		[],
	)

	return state
}
