'use client'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
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

			const data = (await res.json()) as {
				results: string[]
				duration: number
			}

			setSearchResults(data)
		}

		fetchData()
	}, [input])

	return (
		<div className='flex items-center justify-center w-full h-full bg-gradient-to-br from-violet-500 to-yellow-500'>
			<div className='flex flex-col gap-6 items-center duration-500 animate animate-in fade-in-5 slide-in-from-bottom-2.5'>
				<p className='font-bold text-transparent text-7xl bg-gradient-to-r from-yellow-600 to-violet-600 bg-clip-text'>
					Country Search
				</p>
				<div className='w-full max-w md'>
					<Command>
						<CommandInput
							value={input}
							onValueChange={setInput}
							placeholder='Search countries...'
							className='text-zinc-500'
						/>
						<CommandList>
							{searchResults?.results.length === 0 ? (
								<CommandEmpty>No results found</CommandEmpty>
							) : null}

							{searchResults?.results ? (
								<CommandGroup heading='Results'>
									{searchResults?.results.map((result) => (
										<CommandItem
											key={result}
											value={result}
											onSelect={setInput}
										>
											{result}
										</CommandItem>
									))}
								</CommandGroup>
							) : null}
						</CommandList>
					</Command>
				</div>
			</div>
		</div>
	)
}

export default Hero
