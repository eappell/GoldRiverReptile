angular.module('grr')
    .directive('offspringListing', function(){
        return {
            restrict: 'E',
            scope: {
                project: '='
            },
            templateUrl: '/app/directives/offspring-listing.html'
        };
    });

