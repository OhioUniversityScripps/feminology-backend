var submitPost = function() {

  var postBody = $('#composeBox').val();
  if (postBody !== '') {
    /* global createPost */
		createPost({
      message: postBody
    });
    Router.go('/');
  } else {
		//TODO: Handle error
  }
};

Template.composePostHeader.events({
  'click #post-button': function () {
    submitPost();
  }
});
