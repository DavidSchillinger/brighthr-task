import {useEffect, useState} from 'react'

// In reality, we'd likely want to use a more robust and flexible fetching library or maybe even something like Next.js
// This is just intended as a naive example of how we could achieve basic client-side promise state handling.
// Not testing this because I probably wouldn't expect to have to write this in the first place.

type Pending = {status: 'pending'}
type Fulfilled<Value> = {status: 'fulfilled', value: Value}
type Rejected = {status: 'rejected', reason: unknown}
type State<Value> = Fulfilled<Value> | Pending | Rejected

export function usePromise<Value>(callback: () => Promise<Value>): State<Value> {
	const [state, setState] = useState<State<Value>>({status: 'pending'})

	useEffect(
		() => {
			callback()
			.then(value => {
				setState({status: 'fulfilled', value})
			})
			.catch(reason => {
				setState({status: 'rejected', reason})
			})
		},
		[callback],
	)

	return state
}
