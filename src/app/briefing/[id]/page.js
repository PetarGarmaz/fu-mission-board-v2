"use client"

import React, { useState, useEffect} from 'react'
import Briefing from '@components/Briefing'

const BriefingPage = ({params}) => {
	const [briefing, setBriefing] = useState(null);

	const fetchBriefing = async () => {
		const res = await fetch(`/api/briefing/${params?.id}`);
		const data = await res.json();

		setBriefing(data);
	};

	useEffect(() => {
		fetchBriefing();
	}, []);

	return (
		<Briefing briefing={briefing}/>
	)
}

export default BriefingPage