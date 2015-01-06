if (Meteor.isClient) {

	Template.commentList.helpers({
	  comments: function() {
	    return Comments.find({postId: this._id});
	  }
	});

	Template.post.helpers({
		hasPicture: function (userId,ownedBy) {
			return getPicURLForUser(userId,ownedBy,false) != "";
		},
		user_name: function (user) {
			return displayName(user);
		},
		ShortMessage: function (message) {
			return ShortLinkMessage(message);
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
		user_name: function (user) {
			return displayName(user);
		}
	});

	Template.commentSubmit.events({
	  'submit form': function(e, template) {
	    e.preventDefault();
	    var body = document.getElementsByName("body")[0];
	    var comment = {
	      message: body.value,
	      postId: template.data._id
	    };
	    createComment(comment);
	    body.value = "";
	  }
	});

	Template.longPostMessage.linkMessage = function (message) {
		var messageWithLinks = createMessageWithLinks(message);
		var element = document.getElementById("longMessageDiv");
		if (element!=null) {
			element.innerHTML = messageWithLinks;
		}
		else{
			return messageWithLinks;
		};
	}

	Template.longPostMessage.rendered = function () {
		var messageWithLinks = createMessageWithLinks(this.data.message);
		var element = document.getElementById("longMessageDiv");
		if (element!=null) {
			element.innerHTML = messageWithLinks;
		}
		else{
			return messageWithLinks;
		};
	}

	Template.comment.rendered = function () {
		var messageWithLinks = createMessageWithLinks(this.data.message);
		var elements = document.getElementsByClassName("commentMessageLong");
		var element;
		var temp;
		for (var i = elements.length - 1; i >= 0; i--) {
			temp = elements[i];
			if(temp.id == this.data._id)
				element = temp;
		};
		if (element!=null) {
			element.innerHTML = messageWithLinks;
		}
		else{
			 return this.data.message;
		};
	}

  Template.like_button_individual.haveLiked = function (postID) {
    return haveILikedThis(postID);
  };

  Template.like_button_individual.events({
    'click .like_button_individual': function() {
      var postId = this._id;
      var userId = whoami();
      if (!haveILikedThis(postId)) {
        Meteor.call("like", postId, userId);
      } else{
        Meteor.call("unlike", postId, userId);
      };
    }
  });


	Template.removeCommentButton.myComment = function(commentId) {
    return Comments.find(commentId).fetch()[0].ownedBy==Meteor.userId();
  };
  Template.commentShort.ShortMessage = function (message) {
    return ShortLinkMessage(message);
  }
  Template.numLikes.helpers({
	  likesCount: function(pid) {
	    return getPostLikeCount(pid);
	  },
	  likesCountEq: function (pid,num) {
	  	return getPostLikeCount(pid)==num;
	  }
	});

  Template.removeComment.events({
    'click .remove': function(event, template) {
      removeComment(template.data)
    },
  });
};


getPostLikeCount = function (postId) {
	return Posts.findOne(postId).likedByCount;
}
