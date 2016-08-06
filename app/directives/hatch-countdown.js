angular.module('grr')
    .directive('hatchCountdown', function() {
        var controller = ['$scope', function ($scope, incubationPeriod, project) {
            var prj = project;
            $scope.updateIP = function(days) {
                $scope.project.incubationPeriod = days;
                var project = $scope.project;
                $scope.incubationPeriod = days;
                project.expectedHatchDate = moment(project.eggsLaidDate, "YYYY-MM-DD").add(days,'days').format('MMM D, YYYY');
                project.daysToGo = moment(project.expectedHatchDate, 'MMM D, YYYY').diff(moment(),'days') + 1;
            }
        }];

        return {
            restrict: 'E',
            scope: {
                project: '=',
                incubationPeriod: '=days'
            },
            templateUrl: '/app/directives/hatch-countdown.html',
            controller: controller
        };
});
