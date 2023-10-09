import { useTheme } from '../hooks/useTheme'

//array containing colors for different themes
const themeColors = ['#58249c', '#249c6b', '#11AABA', '#BA116F']

export default function ThemeSelector() {
	const { changeColor, color } = useTheme()

	return (
		<div className='theme-selector'>
			<div className='theme-buttons'>
				{themeColors.map(color => (
					<div
						key={color}
						onClick={() => changeColor(color)}
						style={{ background: color }}
					/>
				))}
				<p className='tooltiptext' style={{ backgroundColor: color }}>
					Choose color theme
				</p>
			</div>
		</div>
	)
}
