angular.module('grr')
    .directive('sireDamInfo', function(){
        return {
            restrict: 'E',
            scope: {
                project: '='
            },
            templateUrl: '/app/directives/sire-dam-info.html'
        };
    });

