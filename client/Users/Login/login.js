Template.emailLoginForm.rendered = function () {

};


Template.emailLoginForm.events({
	'submit': function (event) {
		event.preventDefault();
		var email = event.target.email.value;
		var password = event.target.password.value;
		Meteor.loginWithPassword(email, password, function(error) {
			if (error) {
				console.log('Could not login: ', error);
			} else {
				event.target.email.value = "";
				event.target.password.value = "";
				Router.go('/')
			}
		});
		return false;
	},
});

Template.twitterLoginButton.events({
	'click': function (event) {
		console.log('Attempting to login with Twitter');
		Meteor.loginWithTwitter();
	}
})
