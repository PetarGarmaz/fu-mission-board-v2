import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
	email: {
		type: String, 
		unique: [true, "Email already exists!"],
		required: [true, "Email is required!"]
	},
	username: {
		type: String, 
		required: [true, "Username is required!"]
	},
	image: {
		type: String	
	},
	isAdmin: {
		type: Boolean
	}
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;