import React from 'react'

import useMediaQuery from './useMediaQuery'
import useMediaQueryState from './useMediaQueryState'
import { breakpointsList } from './breakpoints'
import './styles.css'

const spacingValue = 10

const App = () => {
	const mediaQuery = useMediaQuery()
	const mediaQueryStateExtraSmall = useMediaQueryState('extraSmall')
	const mediaQueryStateMedium = useMediaQueryState('medium')

	return (
		<div className="App">
			<table className="App_table">
				<tbody>
					<tr>
						<td className="App_tableCell">mediaQuery</td>
						<td className="App_tableCell">{mediaQuery}</td>
					</tr>
					<tr>
						<td className="App_tableCell">extraSmall State</td>
						<td className="App_tableCell">{mediaQueryStateExtraSmall}</td>
					</tr>
					<tr>
						<td className="App_tableCell">medium State</td>
						<td className="App_tableCell">{mediaQueryStateMedium}</td>
					</tr>
				</tbody>
			</table>

			{breakpointsList.map(
				({ breakpointName, breakpointValue }, index, breakpointEntries) => (
					<div
						key={breakpointName}
						style={{
							border: '1px solid black',
							backgroundColor:
								breakpointName === mediaQuery
									? 'LightGreen'
									: 'Cornsilk',
							height: '30px',
							marginBottom: `${spacingValue}px`,
							marginLeft: `-${spacingValue}px`,
							marginRight: `-${spacingValue}px`,
							padding: `${spacingValue}px`,
							width: `${
								index === breakpointEntries.length - 1
									? `calc(100vw + ${breakpointValue}px)` // Display this past the width of the screen
									: `${
											(breakpointEntries[index + 1] || {})
												.breakpointValue - spacingValue * 2
										}px`
							}`,
						}}
					>
						{breakpointName}
					</div>
				),
			)}
		</div>
	)
}

export default App
