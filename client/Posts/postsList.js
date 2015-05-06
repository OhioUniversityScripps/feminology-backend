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

	var coordsRelativeToElement = function(element, event) {
		var offset = $(element).offset();
		var x = event.pageX - offset.left;
		var y = event.pageY - offset.top;
		return {
			x: x,
				y: y
		};
	};

	var openCreateDialog = function(x, y) {
		Session.set("createCoords", {
			x: x,
			y: y
		});
		Session.set("createError", null);
		Session.set("showCreateDialog", true);
	};

	var timer = null;
	Template.postlist.events({
		'scroll': function() {
			if(timer !== null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				history.pushState({scroll: $('.content').scrollTop()});
			}, 50);
		},
	});

	var readyToScroll = false;
	window.onpopstate = function(event) {
		if(event.state && event.state.scroll) {
			readyToScroll = false;
			var scrollWait = setInterval(function() {
				if(readyToScroll) {
					$('.content').scrollTop(event.state.scroll);
					clearInterval(scrollWait);
				}
			}, 50)
		}
	};

	Template.femFeed.onRendered(function() {
		readyToScroll = true;
	});

	Template.userName.user_name = function (user) {
		return displayName(user);
	};

	Template.liked_by.liked_list = function (postId) {
		var liked_id;

		var post = Posts.find(postId).fetch("likedBy")[0];
		if (!post) {
			return "Error";
		};

		usersThatLikedPost = post.likedBy;
		var str ="";
		for (var i = usersThatLikedPost.length - 1; i >= 0; i--) {
			if (usersThatLikedPost[i]) {
				str += displayName(usersThatLikedPost[i]);
			};
			if(i!=0)
				str+=", ";
		};

		if(usersThatLikedPost.length==0)
			return "No one likes this yet";
		return str;
	};


	Template.comment_area.helpers({
		commentsCount: function(pid) {
			return Comments.find({postId: pid}).count();
		}
	});
	Template.like_area.helpers({
		likesCount: function(pid) {
			return getPostLikeCount(pid);
		}
	});


	Template.comments_on.show = function (postId) {

	}

	Template.postTextShort.helpers({
		ShortMessage: function (message) {
			return ShortLinkMessage(message);
		}
	});

	Template.postlist.helpers({
		postsList: function() {
			return Posts.find({},{sort: {updatedAt: -1}});
		}
	});

	Template.femFeed.helpers({
		showCreateDialog: function() {
			return Session.get("showCreateDialog");
		}
	});


	Template.postlist.selected_name = function() {
		var post = Posts.findOne(Session.get("selected_post"));
		return post && post.name;
	};

	Template.post.selected = function() {
		return Session.equals("selected_post", this._id) ? "selected" : '';
	};

	Template.post.events({
		'click a[target=_blank]': function(event) {
			event.preventDefault();
			window.open(event.target.href, '_blank');
		}
	});

	Template.removePostButton.helpers({
		myPost: function(postId) {
			if(!postId)
		return false;
	var post = Posts.find(postId).fetch()[0]
		if (!post) {
			return false;
		};
	return post.ownedBy==Meteor.userId();
		}
	});

	Template.like_area.helpers({
		haveLiked: function (postID) {
			return haveILikedThis(postID);
		}
	});

	Template.removePost.events({
		'click .remove': function(event, template) {
			removePost(template.data)
		},

	});

	Template.like_area.events({
		'click .like_button': function() {
			var postId = this._id;
			var userId = Meteor.userId();
			if (!haveILikedThis(postId)) {
				Meteor.call("like", postId, userId);
			} else{
				Meteor.call("unlike", postId, userId);
			};
		}
	});
}
