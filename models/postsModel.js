Posts = new Meteor.Collection("posts");

Posts.allow({
  insert: function (userId, post) {
    return false;
  },

  remove: function (userId, post) {
    // You can only remove posts that you created and nobody else upvoted.
    return post.ownedBy === userId;
  }
});

likedByCount = function (post) {
  return post.likedBy.length;
};

var NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});

var NonEmptyArray = Match.Where(function (x) {
  check(x, Array);
  return x.length > 0;
});



createPost = function (options) {
  var id = Random.id();
  Meteor.call('createPost', _.extend({ _id: id }, options));
  return id;
};


removePost = function (post) {
  Meteor.call('removePost', post);
  window.history.back();
};

Meteor.methods({
  createPost: function (options) {
    check(options, {
      message: NonEmptyString,
      _id: Match.Optional(NonEmptyString)
    });

    if (! this.userId)
      throw new Meteor.Error(403, "You must be logged in to post");

    var id = options._id || Random.id();
    Posts.insert({
      _id: id,
      ownedBy: this.userId,
      message: options.message,
      likedBy: [],
      comments: [],
      likedByCount: 0,
      createdAt: Date.parse(Date()),
      updatedAt: Date.parse(Date())
    });
    return id;
  },

  like: function (postId, userId) {
    check(postId, String);
    check(userId, String);

    var post = Posts.findOne(postId);
    if (! post)
      throw new Meteor.Error(404, "No such post");
    if (_.contains(post.likedBy, userId))
      throw new Meteor.Error(403, "Already liked this post");

    Posts.update(postId, { $addToSet: {likedBy: userId}, $inc: {likedByCount: 1}});
  },


  unlike: function (postId, userId) {
    check(postId, String);
    check(userId, String);

    var post = Posts.findOne(postId);
    if (! post)
      throw new Meteor.Error(404, "No such post");
    if (! _.contains(post.likedBy, userId))
      throw new Meteor.Error(403, "Already unliked this post");

    Posts.update(postId, { $pull: {likedBy: userId}, $inc: {likedByCount: -1}});
  },

  removePost: function (post) {
    check(post._id, String);

    if (! post)
      throw new Meteor.Error(404, "No such post");
    if (post.ownedBy != Meteor.userId()) {
      throw new Meteor.Error(405, "You can only remove your posts");
    };
    commentIds = post.comments;

    //remove comments
    for (var i = commentIds.length - 1; i >= 0; i--) {
      commentId = commentIds[i];
      if (commentId) {
        Comments.remove(commentId)
      };
    };
    Posts.remove(post._id);
  }

});
