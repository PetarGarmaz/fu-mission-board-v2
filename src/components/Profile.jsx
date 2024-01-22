"use client"

import React from 'react'
import FeedCard from '@components/FeedCard'
import SortBar from '@components/SortBar'

const Profile = ({name, allBriefings, query, setQuery, sort, setSort, order, setOrder, future, setFuture}) => {
	return (
		<div className='flex'>
			<div className="flex flex-col w-9/12 mx-auto max-lg:w-11/12">
				<header className="flex flex-col bg-gray-900 my-16 border border-gray-600 rounded-lg">
					<h1 className='text-5xl text-gray-200 font-bold tracking-widest text-center my-4 max-lg:text-3xl max-lg:tracking-normal'>{name.toUpperCase()}'S PROFILE</h1>
					<hr className='border-gray-600'/>
					<p className='text-gray-200 text-center max-lg:text-sm tracking-wider italic my-4 mx-4'>View and search upcoming mission briefings.</p>
					<hr className='border-gray-600'/>

					<SortBar query={query} setQuery={setQuery} sort={sort} setSort={setSort} order={order} setOrder={setOrder} future={future} setFuture={setFuture}/>
				</header>

				{allBriefings.map((item, index) => (
					<FeedCard key={index} briefing={item}/>
				))}
			</div>
		</div>
	)
}

export default Profile