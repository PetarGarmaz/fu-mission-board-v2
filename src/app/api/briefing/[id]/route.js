import { connectToDB } from "@utils/database";
import Briefing from "@models/briefing";
import User from "@models/user";

export const GET = async (req, {params}) => {
	try {
		await connectToDB();

		const briefing = await Briefing.findById(params.id).populate("creator");

		return new Response(JSON.stringify(briefing), {status:200})
	} catch (error) {
		return new Response("FAIL", {status:500})
	}
}

export const PATCH = async (req, {params}) => {
	const {title, host, timestamp, desc, image, status } = await req.json();

	try {
		await connectToDB();

		const existingBriefing = await Briefing.findById(params.id);

		if(!existingBriefing) {
			return new Response("Briefing not found", {status:404})
		}

		existingBriefing.title = title;
		existingBriefing.host = host;
		existingBriefing.timestamp = timestamp;
		existingBriefing.desc = desc;
		existingBriefing.image = image;
		existingBriefing.status = status;

		await existingBriefing.save();

		return new Response(JSON.stringify(existingBriefing), {status:200})
	} catch (error) {
		return new Response("FAIL", {status:500})
	}
}

export const DELETE = async (req, {params}) => {
	try {
		await connectToDB();
		await Briefing.findByIdAndDelete(params.id);

		return new Response("Removed!", {status:200})
	} catch (error) {
		return new Response("FAIL", {status:500})
	}
}