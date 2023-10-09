//icons
import Google from './Google'
import Facebook from './Facebook'

function SocialButtonBox() {
	return (
		<div className='flex flex-nowrap flex-row justify-around items-center text-center w-1/2 mx-auto'>
			<Facebook />
			<Google />
		</div>
	)
}
export default SocialButtonBox
