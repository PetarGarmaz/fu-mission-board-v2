import { connectToDB } from "@utils/database";
import Briefing from "@models/briefing";

export const POST = async (req) => {
	const {creator, title, host, timestamp, desc, image, status} = await req.json();

	try {
		await connectToDB();

		const newBriefing = new Briefing({
			creator: creator,
			title: title, 
			host: host,
			timestamp: timestamp,
			desc: desc,
			image: image,
			status: status
		});

		await newBriefing.save();

		return new Response(JSON.stringify(newBriefing), {status: 201})
	} catch (error) {
		return new Response("Failed to create briefing", {status: 500})
	}
}