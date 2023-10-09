'use client'
import ModeSelector from './components/ModeSelector'
import NavMenu from './components/NavMenu'
import { ThemeProvider } from './context/ThemeContext'
//styles
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import { Inter } from 'next/font/google'
import { useTheme } from './hooks/useTheme'
import { useState } from 'react'
import AuthProvider from './context/AuthContext'
import { DatabaseProvider } from './context/DBContext'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
// 	title: 'RecipeBook',
// 	description:
// 		'Recipe collection website created with Next.js, MongoDB and TailwindCSS',
// }

export default function RootLayout({ children }) {
	const [mode, setMode] = useState('')

	const handleMode = () => {
		setMode(prev => (prev === '' ? 'dark' : ''))
	}
	return (
		<html lang='en' className={mode}>
			<head>
				<meta charSet='utf-8' />

				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#000000' />
				<meta
					name='description'
					content='Recipe collection website created with Next.js, MongoDB and TailwindCSS'
				/>
				<link
					rel='icon'
					type='image/x-icon'
					href='./burger1.png'
					style={{ width: '16px', height: 'auto' }}
				/>

				<title>RecipeBook</title>
			</head>
			<AuthProvider>
				<DatabaseProvider>
					<ThemeProvider>
						<body className={`${inter.className} min-h-full dark:bg-gray-700`}>
							<header>
								<NavMenu />
								<ModeSelector mode={mode} toggleMode={handleMode} />
							</header>
							{children}
							<ToastContainer />
						</body>
					</ThemeProvider>
				</DatabaseProvider>
			</AuthProvider>
		</html>
	)
}
