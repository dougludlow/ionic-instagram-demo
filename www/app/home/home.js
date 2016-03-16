(function() {
    angular
        .module('ionigram')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$ionicActionSheet', 'InstagramService', 'AuthService'];

    function HomeController($ionicActionSheet, instagram, auth) {
        var vm = this;

        vm.login = login;
        vm.logout = logout;
        vm.isLoggedIn = isLoggedIn;
        vm.showMenu = showMenu;

        activate();

        function activate() {
            if (vm.isLoggedIn()) {
                loadPosts();
            }
        }

        function login() {
            return auth.login().then(function() {
                return loadPosts();
            });
        }

        function logout() {
            return auth.logout();
        }

        function isLoggedIn() {
            return auth.isLoggedIn();
        }

        function showMenu() {
            var hide = $ionicActionSheet.show({
                titleText: 'Menu',
                destructiveText: 'Logout',
                destructiveButtonClicked: function() {
                    hide();
                    logout();
                },
                cancelText: 'Cancel'
            });
        }

        function loadPosts() {
            return instagram.getPosts().then(function(posts) {
                vm.posts = posts;
            });
        }
    }

})();