var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
	{	text: String, default: ""},
	{ commentedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]}
);

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;