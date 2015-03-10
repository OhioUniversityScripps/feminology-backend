if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllPosts: function() {
        Comments.remove({});
        return Posts.remove({});
      },
      removeAllUsers: function() {
        return Meteor.users.remove({});
      },
      removeAllComments: function() {
        return Comments.remove({});
      },
      removeUser: function(id) {
        comments = Comments.find({ownedBy:id}).fetch();

        for (var i = 0; i < comments.length; i++) {
          removeComment(comments[i]);
        };
        thesePosts = Posts.find({ownedBy:id}).fetch();
        for (var i = 0; i < thesePosts.length; i++) {
          removeComment(thesePosts[i]);
        };
        return Meteor.users.remove({_id:id});
      }
    });
  });

  Meteor.publish("posts", function () {
    return Posts.find({});
  });

  Meteor.publish('comments', function(postId) {
    return Comments.find({});
  });

  Meteor.publish("allUserData", function () {
      return Meteor.users.find({});
  });


  var TWITTER_KEY = process.env.TWITTER_KEY;
  var TWITTER_SECRET = process.env.TWITTER_SECRET;
  console.log(TWITTER_KEY, TWITTER_SECRET);
  ServiceConfiguration.configurations.upsert(
  { service: "twitter" },
  {
    $set: {
      consumerKey: TWITTER_KEY,
      loginStyle: "popup",
      secret: TWITTER_SECRET
    }
  }
);

  // BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');
}
