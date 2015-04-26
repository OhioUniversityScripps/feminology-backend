if (Meteor.isClient) {

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

  Template.removePostButton.helpers({
    myPost: function(postId) {
      if(!postId)
        return false;
      var post = Posts.find(postId).fetch()[0]
      if (!post) {
        return false;
      };
      return post.ownedBy==whoami();
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

  Template.statusHeader.events({
    // 'click .add': function(event, template) {
    //   var coords = coordsRelativeToElement(event.currentTarget, event);
    //   openCreateDialog(coords.x / 500, coords.y / 500);
    // }
  });


  Template.like_area.events({
    'click .like_button': function() {
      var postId = this._id;
      var userId = whoami();
      if (!haveILikedThis(postId)) {
        Meteor.call("like", postId, userId);
      } else{
        Meteor.call("unlike", postId, userId);
      };
    }
  });
}
