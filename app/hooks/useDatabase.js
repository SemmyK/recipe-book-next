'use client'
import { DBContext } from '@app/context/DBContext'
import { useContext } from 'react'

export function useDatabase() {
	const context = useContext(DBContext)

	if (context === undefined) {
		//context is undefined if we are using it out of the scope of the context(if the component is not wrapped in context) -  if we don't wrap the whole app with context
		//error so that developer knows what is the issue if the context is not working
		throw new Error('useDatabase must be used inside a DatabaseProvider')
	}

	return context
}
