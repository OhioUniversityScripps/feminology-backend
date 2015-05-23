if (Meteor.isServer) {
	Meteor.methods({
		
		updateUserProfile: function(profile) {
			if (profile.name === '' || profile.name === null) {
				profile.name = Meteor.user().profile.name;
			}
			return Meteor.users.update(Meteor.user(), {$set: {profile: profile}});
		},

		initUserProfile: function () {
			var profile = {};
			profile.acedemics = {
				school: 'OU',
				role: 'Student'
			};
			profile.name = 'Anonymous';
			profile.bio = '';

			profile.genderAndSexuality = {
				gender:'Not disclosed',
				sex:'Not disclosed'
			};

			profile.interests = [];
			return Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
		}
	});
}
