'use client'

//assets
import modeIcon from '../../public/assets/mode-icon.svg'
import Image from 'next/image'

export default function ModeSelector({ toggleMode, mode }) {
	return (
		<div className='mode-toggle ml-2 mt-2'>
			<Image
				alt='dark/light toggle icon'
				src={modeIcon}
				onClick={toggleMode}
				style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
			/>
		</div>
	)
}
