import  {Schema, model, models} from "mongoose";

const briefingSchema = new Schema ({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	title: {
		type: String,
		required: [true, "Mission title is required!"]
	},
	host: {
		type: String,
		required: [true, "Host is required!"]
	},
	timestamp: {
		type: String,
		required: [true, "Date is required!"]
	},
	desc: {
		type: String,
		required: [true, "Briefing is required!"]
	},
	image: {
		type: String
	},
	status: {
		type: String,
		required: [true, "Status is required!"]
	}
});

const Briefing = models.Briefing || model("Briefing", briefingSchema)

export default Briefing;