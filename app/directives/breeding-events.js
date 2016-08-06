angular.module('grr')
    .directive('breedingEvents', function(){
        return {
            restrict: 'E',
            scope: {
                project: '='
            },
            templateUrl: '/app/directives/breeding-events.html'
        };
    });
