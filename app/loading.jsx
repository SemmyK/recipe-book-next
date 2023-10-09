import { ClipLoader } from 'react-spinners'

function Loading() {
	const color = '#36d7b7'
	const mode = ''
	return (
		<div className='flex justify-center items-center h-full'>
			<ClipLoader size={150} color={mode === 'dark' ? '#fff' : color} />
		</div>
	)
}
export default Loading
