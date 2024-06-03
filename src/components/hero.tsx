'use client'

import { useEffect, useState } from 'react'

type Props = {}

const Hero = () => {
	const [input, setInput] = useState<string>('')
	const [searchResults, setSearchResults] = useState<
		| {
				results: string[]
				duration: number
		  }
		| undefined
	>()

	useEffect(() => {
		const fetchData = async () => {
			if (!input) return setSearchResults(undefined)

			const res = await fetch(`/api/search?q=${input}`)
		}

		fetchData()
	}, [input])

	return (
		<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-yellow-500'>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				type='text'
				className='bg-gray-800 p-2 text-white m-2 active:outline-none focus:outline-none'
			/>
		</div>
	)
}

export default Hero
