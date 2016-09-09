angular.module("FLOKsports").run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.main');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	console.log("Acceso Denegado");
				console.log("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }

    if (error === 'AUTH_REQUIRED') {
      $state.go('anon.login');
    }

  });
});


angular.module('FLOKsports').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');
	
  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/templates/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.main', {
      url: '/main',
      templateUrl: 'client/templates/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .state('anon.signup', {
      url: '/signup',
      templateUrl: 'client/templates/signup.html',
      controller: 'SignupCtrl as sg'
    }) 
    .state('anon.forgot', {
      url: '/forgot',
      templateUrl: 'client/templates/forgot.html',
      controller: 'ForgotPasswordCtrl as forgot'
    })

    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', function ($meteor, $state) {
          return $meteor.logout().then(
            function () {
              $state.go('anon.login');
            },
            function (error) {
              console.log(error.reason);
            }
          );
        }]
      }
    }
   );

  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
    })       
    .state('tabs.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
					templateUrl: 'client/templates/profile.html',
					controller: 'ProfileCtrl as profile',      
        }
      }      
    })
    .state('tabs.leagues', {
      url: '/leagues',
      views: {
        'tab-leagues': {
					templateUrl: 'client/templates/leagues.html',
					controller: 'LeaguesCtrl as leagues',      
        }
      }      
    })
    .state('tabs.home-howToPlay', {
      url: '/home/howToPlay',
      views: {
        'tab-home': {
          templateUrl: 'client/templates/howToPlay.html',

              
        }
      }      
    })
    .state('tabs.news', {
      url: '/news',
      views: {
        'tab-news': {
					templateUrl: 'client/templates/news.html',
					controller: 'NewsCtrl as news',      
        }
      }      
    })
    .state('tabs.modal', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'client/templates/ligaActual.html',
          controller: 'LigaActualCtrl as ligaActual',      
        }
      }      
    })
     /////////////////////////// TAB PROFILE ///////////////////////////////////////

    .state('tabs.profile-chooseSports', {
      url: '/profile/chooseSports',
      views:{
        'tab-profile':{
          templateUrl: 'client/templates/chooseSports.html',
          controller: 'ChooseSportsCtrl as chooseSports',      
        }       
      }
    })
    .state('tabs.profile-ligas', {
      url: '/profile/ligas/:id',
      views:{
        'tab-profile':{
          templateUrl: 'client/templates/ligas.html',
          controller: 'LigasCtrl as ligas',      
        }       
      }
    }) 
    
    .state('tabs.profile-ligaActual', {
      url: '/profile/ligaActual/:id',
      views:{
        'tab-profile':{
          templateUrl: 'client/templates/ligaActual.html',
          controller: 'LigaActualCtrl as ligaActual',      
        }       
      }
    })  
    
     .state('tabs.profile-myPicks', {
      url: '/profile/myPicks',
      views:{
        'tab-profile':{
          templateUrl: 'client/templates/myPicks.html',
          controller: 'MyPicksCtrl',      
        }       
      }
    })
     .state('tabs.profile-amigo', {
      url: '/profile/amigo/:id',
      views:{
        'tab-profile':{
          templateUrl: 'client/templates/amigo.html',
          controller: 'AmigoCtrl as amigo',      
        }       
      }
    })
    /////////////////////////// TAB HOME ///////////////////////////////////////
    .state('tabs.misHijos', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'client/templates/home.html',
          controller: 'HomeCtrl as home',      
        }
      }      
    })
    
    
    $urlRouterProvider.otherwise('/main');
}]);