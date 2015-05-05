// App metadata
App.info({
	id: 'edu.zp376411.feminology',
	name: 'Feminology',
	description: '',
	author: 'Ohio University',
	email: 'feminology@ohio.edu',
	website: 'http://feminologyapp.com'
});

// Ensures twitter profile pictures load
App.accessRule('*');

// PhoneGap config.xml preferences
App.setPreference('Orientation', 'portrait');
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarStyle', 'false');
App.setPreference('StatusBarBackgroundColor', '#f7f7f7');

// App media
App.icons({
	// iOS
	'iphone': 'resources/icons/icon-iphone.png',
	'iphone_2x': 'resources/icons/icon-iphone_2x.png',
	'iphone_3x': 'resources/icons/icon-iphone_3x.png',
});

App.launchScreens({
	// iOS
	'iphone': 'resources/splash/splash-iphone.png',
	'iphone_2x': 'resources/splash/splash-iphone_2x.png',
	'iphone5': 'resources/splash/splash-iphone5.png',
	'iphone6': 'resources/splash/splash-iphone6.png',
	'iphone6p_portrait': 'resources/splash/splash-iphone6p_portrait.png',
});
