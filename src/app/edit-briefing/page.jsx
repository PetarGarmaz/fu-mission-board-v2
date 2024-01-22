"use client"

import React, { Suspense } from 'react'
import {useState, useEffect} from 'react'
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import Form from '@components/Form'

const EditBriefing = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const {data: session, status} = useSession();
	const [startDate, setStartDate] = useState(new Date());
	const [allBriefings, setAllBriefings] = useState([]);
	const [briefing, setBriefing] = useState ({
		title: "",
		host: "",
		timestamp: "",
		desc: "",
		image: "",
		status: "",
	});

	const getBriefingDetails = async () => {
		const res = await fetch(`/api/briefing/${searchParams.get("id")}`);
		const data = await res.json();

		setStartDate(new Date(parseInt(data.timestamp)));
		setBriefing({
			title: data.title,
			host: data.host,
			timestamp: data.timestamp,
			desc: data.desc,
			image: data.image,
			status: data.status,
		});
	}

	const fetchBriefings = async () => {
		const res = await fetch("/api/briefing");
		const data = await res.json();

		setAllBriefings(data);

		return data;
	};

	const getTimestamp = () => {
		startDate.setHours(20, 0, 0);
		return Date.parse(startDate);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!searchParams.get("id")) return alert("Missing briefing id!");

		try {
			const timestamp = getTimestamp();
			const res = await fetch(`/api/briefing/${searchParams.get("id")}`, {
				method: "PATCH", 
				body: JSON.stringify({
					creator: session?.user.id,
					title: briefing.title, 
					host: briefing.host,
					timestamp: timestamp,
					desc: briefing.desc,
					image: briefing.image,
					status: briefing.status
				})
			})

			if(res.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if(searchParams.get("id")) {
			fetchBriefings();
			getBriefingDetails();
		}
	}, [searchParams.get("id")]);

	return (
		<Suspense>
			<Form type="Edit" briefing={briefing} setBriefing={setBriefing} handleSubmit={handleSubmit} startDate={startDate} setStartDate={setStartDate} allBriefings={allBriefings}/>	
		</Suspense>
	)
}

export default EditBriefing