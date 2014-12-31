Template.loginButtons.rendered = function()
{
	Accounts._loginButtonsSession.set('dropdownVisible', true);
};

Template.loginButtons.events({
	'click .login-button-form-submit': function (event) {
		Router.go('/');
	},
	'click #login-buttons-logout': function (event) {
		Router.go('/');
	}
});
