import {expect, afterEach} from 'vitest'
import {cleanup} from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// We can use jest-dom matchers because vitest is compatible with jest.
expect.extend(matchers)

afterEach(() => {
	cleanup()
})
