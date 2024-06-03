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
		<div className='flex items-center justify-center w-full h-full bg-gradient-to-br from-violet-500 to-yellow-500'>
			<div className='flex flex-col gap-6 items-center duration-500 animate animate-in fade-in-5 slide-in-from-bottom-2.5'>
				<p className='font-bold text-transparent text-7xl bg-gradient-to-r from-yellow-600 to-violet-600 bg-clip-text'>
					Country Search
				</p>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type='text'
					className='p-2 m-2 text-white bg-gray-800 active:outline-none focus:outline-none'
				/>
			</div>
		</div>
	)
}

export default Hero
