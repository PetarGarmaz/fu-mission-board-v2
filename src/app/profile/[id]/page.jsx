"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
	const { data: session } = useSession();
	const [allBriefings, setAllBriefings] = useState([]);
	const [query, setQuery] = useState(""); //Type to search by Title, Desc or Host
	const [sort, setSort] = useState("Date"); //Sort by Title, Date
	const [order, setOrder] = useState("Desc"); //Sort by Title, Date
	const [future, setFuture] = useState(false); //Sort by Title, Date
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");

	const fetchBriefings = async () => {
		const response = await fetch(`/api/users/${params?.id}/briefings`);
		const data = await response.json();

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
		if (session?.user.id) {
			fetchBriefings();
		};
	}, [query, sort, order, future, session?.user.id]);

	return (
		<Profile name={userName} allBriefings={allBriefings} query={query} setQuery={setQuery} sort={sort} setSort={setSort} order={order} setOrder={setOrder} future={future} setFuture={setFuture}/>
	);
};

export default MyProfile;