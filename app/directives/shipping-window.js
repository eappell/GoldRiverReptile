angular.module('grr')
    .directive('shippingWindow', function() {

        var rootUrl = 'https://query.yahooapis.com/v1/public/yql?';
        var yClientId = 'dj0yJmk9dkhMbkNXRzdVQ2lQJmQ9WVdrOVIwaFhjblJ6TkcwbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0wMA--';
        var format = 'json';

        return {
            restrict: 'E',
            scope: {
                project: '='
            },
            templateUrl: '/app/directives/shipping-window.html'
        };
    });
