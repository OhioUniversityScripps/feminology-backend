'use strict';
Router.configure({
	layout: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	// waitOn: function() {
	// 	return Meteor.subscribe('posts') && Meteor.subscribe('comments');
	// }
});

Router.map(function () {
	this.route('femFeed',{
		path:'/feed',
		waitOn: function () {
			return Meteor.subscribe('posts');
		}
	});

	this.route('login',{
		path:'/login',
	});

	this.route('signup', {
		path: '/signup',
	});

	this.route('termsOfService', {
		path: '/tos',
	});

	this.route('split',{
		path:'/split'
	});

	this.route('splash',{
		path:'/',
		action: function () {
			Router.go('femFeed');
		}
	});

	this.route('lgoin',{
		path:'/profile',
		action: function () {
			Router.go('femFeed');
		}
	});

	this.route('home',{
		path:'/home',
		action: function () {
			Router.go('femFeed');
		}
	});

	this.route('composePost', {
		path: '/post/new',
		template: 'composePost'
	});

	this.route('postPage',{
		path:'/post/:_id',
		waitOn: function() {
			return Meteor.subscribe('posts') && Meteor.subscribe('comments', this.params._id);
		},
		data: function () {
			return Posts.findOne({_id:this.params._id});
		}
	});

	this.route('likesPost',{
		path:'/post/:_id/likes',
		data: function () {
			return Posts.findOne({_id:this.params._id});
		}
	});

	this.route('profileId',{
		path:'/profile/:_id',
		template: 'profile',
    waitOn: function() {
      return Meteor.subscribe('posts');
    },
		data: function () {
			return Meteor.users.findOne({_id:this.params._id});
		}
	});

	this.route('profile',{
		path:'/profile/:ownedBy',
		data: function () {
			return Meteor.users.findOne({_id:this.params.ownedBy});
		}
	});

	this.route('editProfile',{
		path:'/profile/:_id/edit',
		data: function () {
			return Meteor.users.findOne({_id:this.params._id});
		}
	});
});
