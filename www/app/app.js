
angular.module('ionigram', ['ionic', 'auth0', 'angular-jwt', 'LocalStorageModule'])

    .run(['$ionicPlatform', 'auth', function($ionicPlatform, auth) {
        
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            if (window.cordova && window.cordova.InAppBrowser) {
                window.open = cordova.InAppBrowser.open;
            }
        });

        auth.hookEvents();
    }])

    .config(['authProvider', function(authProvider) {
        
        authProvider.init({
            domain: '[auth0 domain]',
            clientID: '[auth0 client id]',
        });
    }])

    .config(['$httpProvider', 'jwtInterceptorProvider', function($httpProvider, jwtInterceptorProvider) {

        $httpProvider.interceptors.push(function() {
            return {
                request: function(config) {
                    if (config.url.indexOf('auth0.com') === -1) {
                        config.skipAuthorization = true;
                    }
                    return config;
                }
            }
        });

        $httpProvider.interceptors.push('jwtInterceptor');
    }])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                url: '/',
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: 'app/home/home.html'
            });

        $urlRouterProvider.otherwise("/");
    }]);
