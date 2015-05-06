var errorMessage = null;
var setErrorMessage = function(_newMessage) {
	errorMessage = _newMessage;
	document.querySelector('#error-message').innerText = errorMessage;
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
		}, function(error) {
			if(error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(null);
				event.target.email.value = '';
				event.target.password.value = '';
				event.target.name.value = '';
				Router.go('/');
			}
		});
	}
});

Template.twitterSignupButton.events({
	'click': function () {
		Meteor.loginWithTwitter(function (error) {
			if(error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(null);
				Router.go('/');
			}
		});
	}
});

Template.emailLoginForm.events({
	'submit': function () {
		event.preventDefault();
		var email = event.target.email.value;
		var password = event.target.password.value;
		Meteor.loginWithPassword(email, password, function(error) {
			if (error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(null);
				event.target.email.value = '';
				event.target.password.value = '';
				Router.go('/');
			}
		});
		return false;
	},
});

Template.twitterLoginButton.events({
	'click': function () {
		Meteor.loginWithTwitter(function (error) {
			if(error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(null);
				Router.go('/');
			}
		});
	}
});
