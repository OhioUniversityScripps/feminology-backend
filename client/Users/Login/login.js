Template.emailLoginForm.rendered = function () {

};

Template.signupForm.events({
	'submit': function (event) {
		event.preventDefault();
		var email = event.target.email.value;
		var password = event.target.password.value;
		var name = event.target.fullname.value;
		Accounts.createUser({email: email,
							 password: password,
							 profile: {name: name},
							 }, function(err) {
			if(err) {
				console.log('Could not sign up: ', error);
			} else {
				event.target.email.value = "";
				event.target.password.value = "";
				event.target.name.value = "";

				Router.go('/');
			}
		});
	}
})

Template.twitterSignupButton.events({
	'click': function (event) {
		Meteor.loginWithTwitter(function (error) {
			if(error) {
				console.log('Unable to login with Twitter:', error);
			} else {
				Router.go('/');
			}
		});
	}
})

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
				Router.go('/');
			}
		});
		return false;
	},
});

Template.twitterLoginButton.events({
	'click': function (event) {
		Meteor.loginWithTwitter(function (error) {
			if(error) {
				console.log('Unable to login with Twitter:', error);
			} else {
				Router.go('/');
			}
		});
	}
})
