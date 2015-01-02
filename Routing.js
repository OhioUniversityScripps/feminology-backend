/*
Router.configure({
   layoutTemplate: 'layout',
   loadingTemplate: 'loading',
   waitOn: function() { return Meteor.subscribe('posts'); }
});
*/
// Router.map(function() {
//   this.route('postsPage', {path: '/'})
//   this.route('about');
//   this.route('profPage', {
// 	  path: '/profile/:_id',
// 	  data: function() { return Meteor.users.findOne(this.params._id); }
// 	});
// });

Router.configure({
  layout: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
  	return Meteor.subscribe('posts') && Meteor.subscribe('comments');
  }
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
    // action: function () {
		// Router.go('/sign-in');
    // }
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

  this.route('postPage',{
    path:'/post/:_id',
    waitOn: function() {
		    return Meteor.subscribe('comments', this.params._id);
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
    template: "profile",
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
  this.route('browser',{
    action: function () {
      var generalURL = "https://feminologywiki.com/";
      showWebViewBrowser(generalURL);
    }
  });
});

showWebViewBrowserCurrent = function () {
  showWebViewBrowser("https://feminologywiki.com/index.php?title=Current_Events");
}


showWebViewBrowser = function (url) {
    if (!url) {
      url = "https://feminologywiki.com/";
    };
    var ref = window.open(url,"_system");
    // var ref = window.open("http://www.facebook.com","_blank","location=yes");
}
