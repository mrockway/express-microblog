var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
	oauthID: Number,
	username: String,
	password: String,
	posts: [{type: Schema.Types.ObjectId, 
					 ref: 'Blog'}]
});

userSchema.plugin(passportLocalMongoose, {
	populateFields: 'posts'
});


var User = mongoose.model('User', userSchema);
module.exports = User;