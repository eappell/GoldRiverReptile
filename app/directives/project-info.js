angular.module('grr')
    .directive('projectInfo', function(){
        return {
            restrict: 'E',
            scope: {
                project: '='
            },
            templateUrl: '/app/directives/project-info.html'
//            ,
//            controller: function('ProjectInfo', ['$scope','$uibModal','$log', function($scope,$uibModal,$log) {
//                $scope.showForm = function () {
//
//                    var modalInstance = $uibModal.open({
//                        animation: true,
//                        templateUrl: 'app/directives/interest-form.html',
//                        controller: 'ModalInstanceCtrl',
//                        resolve: {
//                            items: function () {
//                                return $scope.items;
//                            }
//                        }
//                    });
//
//                    modalInstance.result.then(function (selectedItem) {
//                        $scope.selected = selectedItem;
//                    }, function () {
//                        $log.info('Modal dismissed at: ' + new Date());
//                    });
//                };
//            }])
        };
    });
