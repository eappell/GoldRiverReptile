angular.module('grr')
    .directive('offspringPrint', function(){
        var controller = ['$scope', function ($scope, incubationPeriod, project) {
            
        }];
        return {
            restrict: 'E',
            scope: {
                project: '='
            },
            templateUrl: '/app/directives/offspring-print.html'
        };
    });

