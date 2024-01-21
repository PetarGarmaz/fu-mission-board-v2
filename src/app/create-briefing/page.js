"use client"

import React from 'react'
import {useState, useEffect} from 'react'
import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import Form from '@components/Form'

const CreateBriefing = () => {
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

		try {
			const timestamp = getTimestamp();
			const res = await fetch("api/briefing/new", {
				method: "POST", 
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
		fetchBriefings();
	}, []);

	return (
		<Form type="Create" briefing={briefing} setBriefing={setBriefing} handleSubmit={handleSubmit} startDate={startDate} setStartDate={setStartDate} allBriefings={allBriefings}/>
	)
}

export default CreateBriefing