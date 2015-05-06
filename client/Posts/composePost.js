
var submitPost = function() {

  var postBody = $('#composeBox').val();
  if (postBody !== '') {
    var postId = createPost({
      message: postBody
    });
    Router.go('/');
  } else {
		//TODO: Handle error
  }
};

Template.composePostHeader.events({
  'click #post-button': function (event) {
    submitPost();
  }
})
