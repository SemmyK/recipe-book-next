import { signIn } from 'next-auth/react'

function Facebook() {
	return (
		<div className='w-fit flex justify-center items-center'>
			<button
				onClick={() => {
					signIn('facebook')
				}}
				className='p-2 rounded-full'
				style={{ backgroundColor: '#fff' }}
			>
				{/* 
				//Square facebook logo
				
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='2em'
					height='2em'
					viewBox='0 0 90 90'
				>
					<g>
						<path
							d='M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998   C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41   h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z'
							fill='#ffffff'
						></path>
					</g>
				</svg> */}

				<svg
					xmlns='http://www.w3.org/2000/svg'
					enableBackground='new 0 0 512 512'
					viewBox='0 0 512 512'
					width='3em'
					height='3em'
					id='facebook'
				>
					<circle cx='256' cy='256' r='256' fill='#324b7f'></circle>
					<path
						fill='#fff'
						d='M283.1,412.1h-72.2V260.8H181V198h29.9v-29.9c0-32.9,17.9-68.1,68.1-68.1l51.3,0.2v61.2h-38.5
			c-5.8,0-8.7,3.3-8.7,9.9V198h48.4l-6.5,62.7h-42V412.1z M220.2,402.7h53.6V251.4h42.9l4.5-44.1h-47.4v-36.1
			c0-14.2,9.7-19.2,18-19.2h29.1v-42.6l-41.9-0.2c-54.5,0-58.8,45-58.8,58.8v39.3h-29.9v44.1h29.9V402.7z'
					></path>
				</svg>
			</button>
		</div>
	)
}
export default Facebook

{
	/* <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="facebook"><circle cx="256" cy="256" r="256" fill="#324b7f"></circle><path fill="#fff" d="M283.1,412.1h-72.2V260.8H181V198h29.9v-29.9c0-32.9,17.9-68.1,68.1-68.1l51.3,0.2v61.2h-38.5
			c-5.8,0-8.7,3.3-8.7,9.9V198h48.4l-6.5,62.7h-42V412.1z M220.2,402.7h53.6V251.4h42.9l4.5-44.1h-47.4v-36.1
			c0-14.2,9.7-19.2,18-19.2h29.1v-42.6l-41.9-0.2c-54.5,0-58.8,45-58.8,58.8v39.3h-29.9v44.1h29.9V402.7z"></path></svg> */
}
