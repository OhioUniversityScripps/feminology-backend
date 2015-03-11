
var submitPost = function() {

  var postBody = $('#composeBox').val();
  if (postBody !== '') {
    var postId = createPost({
      message: postBody.autoLink()
    });
    Router.go('/');
  } else {
    console.log("Can't submit an empty post!");
  }
};

Template.composePostHeader.events({
  'click #post-button': function (event) {
    submitPost();
  }
})
