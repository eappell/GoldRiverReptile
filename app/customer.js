(function($scope){
    angular
        .module('grr')
        .controller('Customer', Customer);
})();

function Customer($stateParams, $scope) {
    var rootUrl = 'https://query.yahooapis.com/v1/public/yql?';
    var yClientId = 'dj0yJmk9dkhMbkNXRzdVQ2lQJmQ9WVdrOVIwaFhjblJ6TkcwbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0wMA--';
    var format = 'json';
    var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="baltimore, md';
    var grweather = {};

    $.ajax({
        url: rootUrl + '?clientId=' + yClientId + '&format=' + format + '&q=' + query + '")',
        success: function(data){
            var test = data;
        },
        failure: function(error){
            var err = error;
        }
    });
}