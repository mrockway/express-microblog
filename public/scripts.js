$(function(){
	
	// Sanity check
	console.log("client js up and running");

	//Handlebars template
	var source = $('#blog-template').html();
	var template = Handlebars.compile(source);
	var allBlogs;
	var blogHtml = template({blogs: allBlogs});
	
	//Render page function
	function render() {
		$('.insertContainer').empty();
		var blogHtml = template({blogs: allBlogs});
		$('.insertContainer').append(blogHtml);
	}

	//populate website with blog postings
	$.get('/api/blogs', function(data) {
		allBlogs = data.blogs;
		allBlogs.reverse();
		var blogHtml = template({blogs: allBlogs});
		$('.insertContainer').append(blogHtml);
	});
	
	//add new blog post to website
	$('.newBlog').on('submit',function(event) {
		event.preventDefault();
		var blogData = $(this).serialize();
		$.post('/api/blogs', blogData, function(data) {
			data.date = new Date();
			allBlogs.push(data);
			console.log(allBlogs);
			render();
			$('.newBlog').each(function(){
				this.reset();
			});
		});
		$('.newBlog').hide();
	});

	//add comments to existing blog
	$('.insertContainer').on('submit', '.addCommentForm', function(event){
		event.preventDefault();
		console.log('testing');
		var blogId = $(this).closest('.blog-content').attr('data-id');
		var commentAdd = $(this).serialize();
		$.post('api/blogs/'+blogId+'/comments/', commentAdd, function(data) {
			render();
			});
		});
	

	//update existing blog 
	$('.insertContainer').on('submit', '.editBlogForm', function(event){
		event.preventDefault();
		var blogId = $(this).closest('.blog-content').attr('data-id');
		var blogEdits = $(this).serialize();
		var blogUpdate = allBlogs.filter(function (blog) {
			return (blog._id === blogId);
		})[0];
		$.ajax({
			type: 'PUT',
			url: '/api/blogs/'+blogId,
			data: blogEdits, 
			success: function(data){
				allBlogs.splice(allBlogs.indexOf(blogUpdate), 1, data);
				render();
			}
		});
	});

 //delete comment
	$('.insertContainer').on('click', '.deleteEditedComment', function(event) {
		event.preventDefault();
		var commentId = $(this).attr('data-id');
		var blogId = $(this).closest('.blog-content').attr('data-id');
		console.log('commentid',commentId);
		console.log('blogid', blogId);
		// var commentBlog;
		// var commentIndex;
		// allBlogs.forEach(function (blog) {
		// 	blog.comments.forEach(function (comment) {
		// 		if (commentId === comment._id) {
		// 			commentIndex = blog.comments.indexOf(comment);
		// 			commentBlog = blog;
		// 			console.log('blogid',commentBlog._id);
		// 		}
		// 	});
		// });
		console.log('outside',commentId);
		$.ajax({
				type: 'DELETE',
				url: '/api/blogs/'+blogId+'/comments/'+commentId,
				success: function(data) {
					render();
				} 
		});
	});

//delete blog posting
$('.insertContainer').on('click', '.delete', function(event){
	event.preventDefault();
	var blogId = $(this).closest('.blog-content').attr('data-id');
	var blogDelete = allBlogs.filter(function (blog) {
				return (blog._id == blogId);
			})[0];
	$.ajax({
		type: 'DELETE',
		url: '/api/blogs/'+blogId,
		data: blogDelete,
		success: function(data){
			allBlogs.splice(allBlogs.indexOf(blogDelete),1);
			render();
		}
	});
});


});