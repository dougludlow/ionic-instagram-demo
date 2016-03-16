(function() {

    angular
        .module('ionigram')
        .factory('InstagramService', InstagramService);

    InstagramService.$inject = ['$http', '$q', 'AuthService'];

    function InstagramService($http, $q, auth) {

        return {
            getPosts: getPosts
        };

        function getPosts() {

            if (!auth.user) return $q(function(resolve) { resolve([]) });

            var config = {
                params: {
                    'access_token': auth.user.identities[0].access_token,
                    'callback': 'JSON_CALLBACK'
                }
            };

            return $http.jsonp('https://api.instagram.com/v1/users/self/media/recent/', config)
                .then(function(response) {
                    var media = response.data.data;
                    media.forEach(function(m) { m.created_time = convertToDate(m.created_time) });
                    return media;
                });

            function convertToDate(value) {
                var date = new Date();
                date.setTime(parseInt(value) * 1000);
                return date;
            }

        }
    }

})();