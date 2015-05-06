/* global getPicURLForUser */
/* global displayName */
/* global shortLinkMessage */
/* global createComment */
/* global whoami */
/* global removeComment */
/* global getPostLikeCount: true */

if (Meteor.isClient) {

	var haveILikedThis = function (postID) {
		var post = Posts.findOne({_id:postID});
		if (!post) {
			return false;
		}

		var likedBy = post.likedBy;
		var me = Meteor.userId();
		if(_.contains(likedBy, me))
			return true;
		return false;
	};

	Template.comment.events({
		'click a[target=_blank]': function(event) {
			event.preventDefault();
			window.open(event.target.href, '_blank');
		}
	});

	Template.commentList.helpers({
		comments: function() {
			return Comments.find({postId: this._id});
		}
	});

	Template.post.helpers({
		hasPicture: function (userId,ownedBy) {
			return getPicURLForUser(userId,ownedBy,false) !== '';
		},
		user_name: function (user) {
			return displayName(user);
		},
		shortMessage: function (message) {
			return shortLinkMessage(message);
		},
		getUrl: function(userId, ownedBy) {
			return getPicURLForUser(userId,ownedBy,false);
		}
	});

	Template.comment.helpers({
		user_name: function (user) {
			return displayName(user);
		}
	});

	Template.username.helpers({
		user_name: function (userId) {
			var userArray = Meteor.users.find(userId).fetch();
			if (userArray.length === 0) {
				return 'Error!!';
			}
			var user = userArray[0];
			if (user.profile && user.profile.name){
				return user.profile.name;
			}
			if (user.emails[0].address) {
				return user.emails[0].address;
			}
			return user;
		}
	});

	Template.commentSubmit.events({
		'submit form': function(e, template) {
			e.preventDefault();
			var body = document.getElementsByName('body')[0];
			var comment = {
				message: body.value,
				postId: template.data._id
			};
			createComment(comment);
			body.value = '';
		}
	});

	Template.like_button_individual.haveLiked = function (postID) {
		return haveILikedThis(postID);
	};

	Template.like_button_individual.events({
		'click .like_button_individual': function() {
			var postId = this._id;
			var userId = whoami();
			if (!haveILikedThis(postId)) {
				Meteor.call('like', postId, userId);
			} else{
				Meteor.call('unlike', postId, userId);
			}
		}
	});

	Template.removeCommentButton.myComment = function(commentId) {
		return Comments.find(commentId).fetch()[0].ownedBy === Meteor.userId();
	};
	Template.commentShort.ShortMessage = function (message) {
		return shortLinkMessage(message);
	};

	Template.removeComment.events({
		'click .remove': function(event, template) {
			removeComment(template.data);
		},
	});
}

getPostLikeCount = function (postId) {
	return Posts.findOne(postId).likedByCount;
};
