"use client"

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Navbar = () => {
	const { data: session, status } = useSession();
	const [providers, setProviders] = useState(null);
	const [dropdown, setDropdown] = useState(false);

	const setupProviders = async () => {
		const res = await getProviders();
		setProviders(res);
	};

	const handleDropdown = (state) => {
		if(state) {
			setDropdown(state);
		} else {
			setDropdown(!dropdown);
		}
	}

	useEffect(() => {
		setupProviders();
	}, []);

	return (
		<nav>
			<div className='flex bg-gray-900 py-5 border-b border-b-gray-600'>
				{/*Logo*/}
				<Link href="/" className='flex m-auto'>
					<img src="/Logo.png" alt="Logo" className='w-10 object-contain ' />
					<h1 className='m-auto ml-4 text-4xl max-lg:text-2xl text-gray-200 font-bold'>Arma Mission Board</h1>
				</Link>

				{/*Dropdown Burger*/}
				<button onClick={() => handleDropdown()} className="flex flex-col mr-5 my-auto justify-center items-center">
					<div className="space-y-2">
						<div className={`w-8 h-0.5 bg-gray-200 transition duration-300 ${dropdown && "rotate-45 translate-y-2.5"}`}/>
						<div className={`w-8 h-0.5 bg-gray-200 transition duration-200 ${dropdown && "bg-transparent"}`}/>
						<div className={`w-8 h-0.5 bg-gray-200 transition duration-300 ${dropdown && "-rotate-45 -translate-y-2.5"}`}/>
					</div>
				</button>
			</div>

			<aside className={`absolute overflow-hidden right-0 bg-gray-900 w-0 border-l border-b border-gray-600 transition-all duration-300 ${dropdown && "w-[600px] max-lg:w-full"}`}>
				{session?.user ? (
					<div className={`flex flex-col`}>
						<div className='flex'>
							<img src={session?.user.image} alt="user_logo" className='m-5 w-20 object-contain rounded-full'/>
							<h2 className='ml-5 my-auto text-4xl text-gray-200 tracking-wider first-letter:capitalize'>{session?.user.name}<br /><span className='text-2xl'>{session?.user.isAdmin ? "Officer" : "Member"}</span></h2>
						</div>

						<hr className='border-gray-600'/>

						<a href={`/profile/${session?.user.id}?name=${session?.user.name}`} className='mx-auto mt-5 pb-2 border-b border-transparent hover:border-gray-600 text-2xl text-gray-200 tracking-wider transition duration-300'>My Profile</a>
						<a href="/create-briefing" className='mx-auto my-5 pb-2 border-b border-transparent hover:border-gray-600 text-2xl text-gray-200 tracking-wider'>Create Briefing</a>

						<hr className='border-gray-600'/>

						<div className='flex flex-col m-5'>
							<button type="button" onClick={() => signOut()} className="w-full py-2 text-center text-gray-200 tracking-wider text-2xl bg-red-800 hover:bg-gray-600 rounded-lg transition duration-300">
								Sign Out
							</button>
						</div>
					</div>
				):(
					<>
						{providers && Object.values(providers).map(
							(provider) => (
								<div key={provider.name} className='flex flex-col m-5'>
									<button type="button" onClick={() => signIn(provider.id)} className={`w-full py-2 text-center text-gray-200 tracking-wider text-2xl hover:bg-gray-600 rounded-lg transition duration-300 ${provider.id == "discord" ? "bg-indigo-500" : "bg-gray-800"}`}>
										Sign In with {provider.name}
									</button>
								</div>
							)
						)}
						
					</>
				)}
			</aside>
		</nav>
	)
}

export default Navbar