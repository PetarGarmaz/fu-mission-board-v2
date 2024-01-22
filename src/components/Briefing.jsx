"use client"

import React, { useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import {useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";

const Briefing = ({briefing}) => {
	const router = useRouter();
	const { data: session, status } = useSession();

	const getDateString = (timestamp) => {
		const parsedDate = new Date(parseInt(timestamp));
		const newDate = parsedDate.toLocaleDateString('en-uk', { weekday:"long", month:"long", year:"numeric", day:"numeric"});
		return newDate;
	};

	const handleProfileClick = () => {
		router.push(`/profile/${briefing.creator._id}?name=${briefing.creator.username}`);
	};

	const handleEdit = () => {
		router.push(`/edit-briefing/${briefing._id}`);
	};

	const handleDelete = async () => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this briefing?"
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/briefing/${briefing._id.toString()}`, {method: "DELETE",});

				router.push("/");
			} catch (error) {
				console.log(error);
			}
		}
	};

	const getTimeString = (timestamp) => {
		const parsedDate = new Date(parseInt(timestamp));
		const newTime = parsedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });
		return newTime;
	};

	return (
		<section className='flex'>
			<div className="flex flex-col w-9/12 mx-auto bg-gray-900 my-16 border border-gray-600 rounded-lg">
				<img src={briefing.creator.image} alt="Logo" onClick={() => handleProfileClick()} className='object-contain max-w-16 mx-auto my-2 rounded-full cursor-pointer' />
				
				<hr className='border-gray-600'/>
				<h1 className='text-5xl text-gray-200 font-bold tracking-widest text-center my-4 max-lg:text-3xl max-lg:tracking-normal'>{briefing.title}</h1>
				
				<hr className='border-gray-600'/>
				<p className='text-gray-200 text-center max-lg:text-sm tracking-wider italic my-4 mx-4'>Host: {briefing.host} ● {getDateString(briefing.timestamp)} ● {getTimeString(briefing.timestamp)}</p>
				
				<hr className='border-gray-600 mt-1'/>
				<hr className='border-gray-600 mt-1'/>
				
				<ReactMarkdown className='m-5 text-lg max-lg:text-sm text-gray-200 text-justify whitespace-pre-line '>{briefing.desc}</ReactMarkdown>

				{briefing.image && (
					<img src={briefing.image} alt="briefing_image" className="m-5 rounded-lg"/>
				)}

				<hr className='border-gray-600'/>
				<p className='mx-5 my-2 text-2xl text-gray-200 font-bold'>STATUS: {briefing.status}</p>

				{((session?.user.id == briefing.creator._id) || (session?.user.isAdmin)) && (
					<>
						<hr className='border-gray-600'/>
						<div className='flex max-lg:flex-col'>
							<button onClick={() => handleEdit()} className='w-10/12 mx-5 my-2 text-center text-gray-200 bg-lime-700 border border-gray-600 hover:bg-lime-500 rounded-lg py-1 transition duration-300'>Edit Briefing</button>			
							<button onClick={() => handleDelete()} className='w-10/12 mx-5 my-2 text-center text-gray-200 bg-red-700 border border-gray-600 hover:bg-red-300 rounded-lg py-1 transition duration-300'>Delete Briefing</button>			
						</div>
					</>
				)}
			</div>
		</section>
	)
}

export default Briefing