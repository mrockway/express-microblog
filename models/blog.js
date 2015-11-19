var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment');

var BlogSchema = new Schema({
	title: {type: String},
	category: {type: String},
	blogContent: {type: String},
	likes: {type: Number},
	date: {type: String},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Blog = mongoose.model('Blog', BlogSchema);

	module.exports = Blog;