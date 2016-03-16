(function() {
    
    angular
        .module('ionigram')
        .filter('fromNow', fromNowFilter);
        
    fromNowFilter.$inject = [];
    
    function fromNowFilter() {
        return function(value) {
            return moment(value).fromNow();
        };
    }
    
})();