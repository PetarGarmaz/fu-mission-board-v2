import { connectToDB } from "@utils/database";
import Briefing from "@models/briefing";
import User from "@models/user";

export const GET = async (request, {params}) => {
	try {
		await connectToDB();

		const briefings = await Briefing.find({creator: params.id}).populate("creator");

		return new Response(JSON.stringify(briefings), {status: 200});
	} catch (error) {
		return new Response("Failed to fetch all briefings...", {status: 500});
	}
}