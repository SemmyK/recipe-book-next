function HorizontalLine({ text }) {
	return (
		<div className='flex items-center my-2'>
			<hr className='flex-grow border-t border-violet-300 dark:border-slate-200' />
			<span className='px-3 text-violet-500 font-semibold dark:text-slate-200'>
				{text}
			</span>
			<hr className='flex-grow border-t border-violet-300' />
		</div>
	)
}
export default HorizontalLine
