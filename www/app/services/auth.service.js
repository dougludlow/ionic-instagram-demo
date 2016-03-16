(function() {

    angular
        .module('ionigram')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$q', 'auth', 'localStorageService'];

    function AuthService($q, auth, localStorageService) {

        var service = {
            user: null,
            local: localStorageService,
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
        }

        window.service = service;

        activate();

        return service;

        function activate() {
            // If there is a profile saved in local storage
            service.user = getProfile();
        }

        function isLoggedIn() {
            return !!service.user;
        }

        function login() {
            return $q(function(resolve, reject) {
                // Show the Auth0 Lock widget
                auth.signin({
                    authParams: {
                        scope: 'openid offline_access',
                        device: 'Mobile device'
                    }
                }, function(profile, token, accessToken, state, refreshToken) {
                    if (profile) service.local.set('profile', profile);
                    if (accessToken) service.local.set('access_token', accessToken);
                    if (token) service.local.set('id_token', token);
                    if (refreshToken) service.local.set('refresh_token', refreshToken);
                    service.user = profile;
                    resolve();
                }, function(err) {
                    reject(err);
                });
            });
        }

        function logout() {
            return $q(function(resolve, reject) {
                service.local.remove('profile');
                service.local.remove('id_token');
                service.local.remove('refresh_token');
                auth.signout();
                service.user = null;
                resolve();
            });
        }

        function getProfile() {
            if (!service.user) {
                var profile = service.local.get('profile');
                if (profile) {
                    service.user = profile;
                }
            }
            return service.user;
        }
    }

})();