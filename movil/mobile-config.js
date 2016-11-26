App.accessRule('http://*');
App.accessRule('https://*');


App.info({
  id: 'com.masoft.ready2get',
  name: 'Ready2Get',
  description: 'Ready2Get',
  author: 'Masoft',
  email: 'francisco@masoft.mx',
  website: 'http://masoft.mx',
  version: '0.1',
  buildNumber: '100'
});

App.setPreference('BackgroundColor', '0x0023adc2');





App.icons({
  // iOS
  //'ios_settings': 'resources/icons/icon-29x29.png',
  //'ios_settings_2x': 'resources/icons/icon-58x58.png',
  //'ios_settings_3x': 'resources/icons/icon-87x87.png',

  //'ios_spotlight': 'resources/icons/icon-40x40.png',
  //'ios_spotlight_2x': 'resources/icons/icon-80x80.png',

  //iPhone
  'iphone': 'resources/icons/icon-120x120.png',
  'iphone_2x': 'resources/icons/icon-120x120.png',
  'iphone_3x': 'resources/icons/icon-180x180.png',

  //iPad
  'ipad': 'resources/icons/icon-76x76.png',
  'ipad_2x': 'resources/icons/icon-152x152.png',


  // Android
  'android_ldpi': 'resources/icons/icon-48x48.png',
  'android_mdpi': 'resources/icons/icon-48x48.png',
  'android_hdpi': 'resources/icons/icon-72x72.png',
  'android_xhdpi': 'resources/icons/icon-96x96.png'
});




App.launchScreens({
  // iPhone
	'iphone': 'resources/splash/splash-320x480.png',
  'iphone_2x': 'resources/splash/splash-640x960.png',
  'iphone5': 'resources/splash/splash-640x1136.png',
  'iphone6': 'resources/splash/splash-750x1334.png',
  'iphone6p_portrait': 'resources/splash/splash-1242x2208.png',

  // iPad
  'ipad_portrait': 'resources/splash/splash-768x1024.png',
  'ipad_portrait_2x': 'resources/splash/splash-1536x2048.png',

  // Android
  'android_ldpi_portrait': 'resources/splash/splash-320x470.png',
  'android_mdpi_portrait': 'resources/splash/splash-320x470.png',
  'android_hdpi_portrait': 'resources/splash/splash-480x640.png',
  'android_xhdpi_portrait': 'resources/splash/splash-720x960.png'
});