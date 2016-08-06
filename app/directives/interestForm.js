angular.module('grr')
    .directive('interestForm', function(){
    return {
        restrict: 'E',
        scope: {
            project: '='
        },
        templateUrl: '/app/directives/interest-form.html'
    };
});
