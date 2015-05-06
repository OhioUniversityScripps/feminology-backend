/* global getDropdownValue: true */
/* global getElementFromEditScreen: true */
/* global getProfileAtrributes */
/* global getStringValue: true */
/* global saveMyProfile: true */
/* global saveUserProfile: true */
/* global setDropdownValue: true */
/* global setStringValue: true */

if (Meteor.isClient) {

	Template.updateUserProfileButton.events({
		'click .update' : function() {
			saveUserProfile();

			window.history.back();
			return;
		}
	});

	saveMyProfile = function () {
		//save profile
		saveUserProfile();

		//go back
		window.history.back();
	};

	saveUserProfile = function () {
		var profile = {};
		profile.name = getStringValue('name');
			profile.acedemics = {
				school:getDropdownValue('university'),
				role:getDropdownValue('role'),
				major:getStringValue('major'),
				minor:getStringValue('minor')
			};

		profile.bio = getStringValue('bio');

		profile.genderAndSexuality = {
			gender:getStringValue('gender'),
			sex:getStringValue('sex')
		};

		profile.interests = [];
		Meteor.call('updateUserProfile', profile);
	};

	Template.editProfile.rendered = function () {
		if (!this.rendered) {
			var profileAttrib = getProfileAtrributes(Meteor.userId());
			setStringValue('name',profileAttrib.name);

			setDropdownValue('university',profileAttrib.acedemics.school);
			setDropdownValue('role',profileAttrib.acedemics.role);
			setStringValue('major',profileAttrib.acedemics.major);
			setStringValue('minor',profileAttrib.acedemics.minor);

			setStringValue('bio',profileAttrib.bio);
			setStringValue('gender',profileAttrib.genderAndSexuality.gender);
			setStringValue('sex',profileAttrib.genderAndSexuality.sex);
		}
	};

	Template.updateUserProfileButton.myProfile = function (userId) {
		return userId === Meteor.userId();
	};

	getDropdownValue = function (elementId) {
		var dropdown = getElementFromEditScreen(elementId);
		return dropdown.options[dropdown.value-1].text;
	};

	getStringValue = function (elementId) {
		var textBox = getElementFromEditScreen(elementId);
		return textBox.value;
	};

	setDropdownValue = function (elementId) {
		var dropdown = getElementFromEditScreen(elementId);
		return dropdown.options[dropdown.value-1].text;
	};

	setStringValue = function (elementId,sString) {
		var textBox = getElementFromEditScreen(elementId);
		textBox.value = sString;
	};

	getElementFromEditScreen = function (elementId) {
		return document.getElementById(elementId);
	};
}
