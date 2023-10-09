'use client'

import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
	//based on different types of action we return different values
	switch (action.type) {
		case 'CHANGE_COLOR':
			return { ...state, color: action.payload }

		default:
			return state
	}
}

//create Theme context provider
export function ThemeProvider({ children }) {
	const [state, dispatch] = useReducer(themeReducer, {
		color: '#58249c',
	})

	const changeColor = color => {
		dispatch({ type: 'CHANGE_COLOR', payload: color })
	}

	return (
		<ThemeContext.Provider value={{ ...state, changeColor }}>
			{children}
		</ThemeContext.Provider>
	)
}
