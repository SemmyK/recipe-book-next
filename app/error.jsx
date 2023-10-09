'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
	const router = useRouter()

	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div>
			<h2>Something went wrong!</h2>
			<button onClick={() => router.push('/')}>Go to the Homepage</button>
		</div>
	)
}
