"use client"

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import FeedCard from '@components/FeedCard'
import SortBar from '@components/SortBar'

const Feed = observer(() => {
	const [allBriefings, setAllBriefings] = useState([]);
	const [query, setQuery] = useState(""); //Type to search by Title, Desc or Host
	const [sort, setSort] = useState("Date"); //Sort by Title, Date
	const [order, setOrder] = useState("Desc"); //Sort by Title, Date
	const [future, setFuture] = useState(false); //Sort by Title, Date

	const fetchBriefings = async () => {
		const res = await fetch("/api/briefing");
		const data = await res.json();

		filterBriefings(data);
	};

	const filterBriefings = (data) => {
		const regex = new RegExp(query, "i");
		const nextWeek = Date.parse(new Date()) + 604800 * 1000; //Get next week
		var sortedData = data.filter((item) => (regex.test(item.host) || regex.test(item.title) || regex.test(item.desc) || regex.test(item.status)));

		sortedData = sortedData.filter((item) => future ? (item) : (parseInt(item.timestamp) < nextWeek)); // Filter out future missions (excluding next mission)

		for (let i = 0; i < sortedData.length; i++) {
			for (let j = 0; j < sortedData.length; j++) {
				if(sort == "Title") {
					let titleI = sortedData[i].title;
					let titleJ = sortedData[j].title;

					if(order == "Desc") {
						if(titleI < titleJ) {
							var tempData = sortedData[i];
							sortedData[i] = sortedData[j];
							sortedData[j] = tempData;
						};
					} else {
						if(titleI > titleJ) {
							var tempData = sortedData[i];
							sortedData[i] = sortedData[j];
							sortedData[j] = tempData;
						};	
					}
				} else if (sort == "Date") {
					let parsedDateI = parseInt(sortedData[i].timestamp);
					let parsedDateJ = parseInt(sortedData[j].timestamp);

					if(order == "Desc") {
						if(parsedDateI > parsedDateJ) {
							var tempData = sortedData[i];
							sortedData[i] = sortedData[j];
							sortedData[j] = tempData;
						};
					} else {
						if(parsedDateI < parsedDateJ) {
							var tempData = sortedData[i];
							sortedData[i] = sortedData[j];
							sortedData[j] = tempData;
						};	
					}
				};
			};
		};
		
		setAllBriefings(sortedData);
	};

	useEffect(() => {
		fetchBriefings();
	}, [query, sort, order, future]);

	return (
		<div className='flex'>
			<div className="flex flex-col w-9/12 mx-auto max-lg:w-11/12">
				<header className="flex flex-col bg-gray-900 my-16 border border-gray-600 rounded-lg">
					<h1 className='text-5xl text-gray-200 font-bold tracking-widest text-center my-4 max-lg:text-3xl max-lg:tracking-normal'>FEED</h1>
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
})

export default Feed