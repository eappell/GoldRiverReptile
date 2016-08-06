'use strict';

angular.module('grr')
    .directive('incubationPeriod', function() {
        var controller = ['$scope', function ($scope, incubationPeriod, project) {

            if(!$scope.project.isComplete) {
                $scope.increasePeriod = function() {
                    $scope.project.incubationPeriod++;

                    var days = $scope.project.incubationPeriod;
                    $scope.updateDates(days);
                    $scope.period = days;
                };

                $scope.decreasePeriod = function() {
                    $scope.project.incubationPeriod--;

                    var days = $scope.project.incubationPeriod;
                    $scope.updateDates(days);
                    $scope.period = days;
                };

                $scope.updateDates = function(days) {
                    var project = $scope.project;

                    $scope.incubationPeriod = days;
                    project.expectedHatchDate = moment(project.eggsLaidDate, "YYYY-MM-DD").add(days,'days').format('MMM D, YYYY');
                    project.daysToGo = moment(project.expectedHatchDate, 'MMM D, YYYY').diff(moment(),'days');
                    if(!isNegativeInteger(project.daysToGo))
                        project.daysToGo++;
                };
                
                function isNegativeInteger(s) {
                    return /^\-?[0-9][\d]*$/.test(s);
                }
            }
        }];

        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/app/directives/incubation-period.html',
            controller: controller,
            scope: {
                project: '=',
                period: "="
            }
        }
    });