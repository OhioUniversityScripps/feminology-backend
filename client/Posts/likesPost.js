Template.likeList.usersWhoLikeThis = function (postId) {
	var likerIds = Posts.findOne(postId).likedBy;
	var likers = [];
	var liker;
	for (var i = likerIds.length - 1; i >= 0; i--) {
		liker = Meteor.users.findOne(likerIds[i]);
		liker.postId = postId;
		likers[i]=liker;
	};
	return likers;
}

Template.liker.user_name = function (user) {
    return displayName(user);
  };


Template.likeList.comments = function (postId) {
	var commentIds = Posts.findOne(postId).comments;
	var comments = [];
	var comment; 
	for (var i = commentIds.length - 1; i >= 0; i--) {
		comment = Comments.findOne(commentIds[i]);
	};
}

Template.liker.hasComment = function (postId,userId) {
	return getCommentForPostFromUser(postId,userId).length>0;
};

Template.showLastComment.latestTime = function (postId,userId) {
	var comments = getCommentForPostFromUser(postId,userId);
	var latestTime = new Date().setFullYear(1960);
	var thisTime;
	var latestDateString = "";
	for (var i = comments.length - 1; i >= 0; i--) {
		thisTime =new Date( comments[i].createdAt);
		if (latestTime<thisTime) {
			latestTime = thisTime;
			latestDateString = comments[i].createdAt;
		};
	};
	return DateStringFixer(latestDateString);
};




getCommentForPostFromUser = function (postId,userId) {
	var commentIds = Posts.findOne(postId).comments;
	var comments = [];
	var comment; 
	var count = 0
	for (var i = commentIds.length - 1; i >= 0; i--) {
		comment = Comments.findOne(commentIds[i]);
		if(comment.ownedBy == userId){
			comments[count] = comment;
			count+=1;
		}
	}
	return comments
}
