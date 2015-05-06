/* global Comments: true */
/* global createComment: true */
/* global removeComment: true */

Comments = new Meteor.Collection('comments');

Comments.allow({
	insert: function () {
		return false;
	},

	remove: function (userId, comment) {
		// You can only remove comments that you created and nobody else upvoted.
		return comment.ownedBy === userId;
	}
});

createComment = function (options) {
	var id = Random.id();
	Meteor.call('comment', _.extend({ _id: id }, options));
	return id;
};

removeComment = function (comment) {
	Meteor.call('removeComment', comment);
};

Meteor.methods({
	comment: function(commentAttributes) {
		var currentDate = Date.parse(Date());
		var user = Meteor.user();
		var post = Posts.findOne(commentAttributes.postId);
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, 'You need to login to make comments');
		if (!commentAttributes.message)
			throw new Meteor.Error(422, 'Please write some content');
		if (!post)
			throw new Meteor.Error(422, 'You must comment on a post');
		var comment = _.extend(_.pick(commentAttributes, 'postId', 'message'), {
			ownedBy: this.userId,
			createdAt: currentDate,
			updatedAt: currentDate
		});
		var thisId = Comments.insert(comment);
		Posts.update(comment.postId, {$addToSet: {comments: thisId}});
		Posts.update(comment.postId, {$set: {updatedAt: currentDate}});
		return thisId;
	},

	removeComment: function (comment) {
		Posts.update(comment.postId, {$pull: {comments: comment._id}});
		Comments.remove(comment._id);
	}
});
