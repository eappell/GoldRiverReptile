/**
 * Created by Eddie on 01/03/15.
 */

(function($scope){
    angular
    .module('grr')
    .controller('Project', Project);
})();

function Project($stateParams, $scope) {
    var vm = this;
    vm.project = GetProjectById(projects, $stateParams.projectId);

    vm.project.sire = GetAnimalById(collection, vm.project.sireId);
    vm.project.dam = GetAnimalById(collection, vm.project.damId);

    if(vm.project.isComplete) {
        vm.project.babies = GetProjectOffspring(vm.project.id);
        vm.project.actualIncubationDays = moment(vm.project.actualHatchDate).diff(moment(vm.project.eggsLaidDate), "days") + 1;
    } else {
        vm.project.expectedHatchDate = moment(vm.project.eggsLaidDate, "YYYY-MM-DD").add(52,'days').format('MMM D, YYYY');
        vm.project.daysToGo = moment(vm.project.expectedHatchDate, 'MMM D, YYYY').diff(moment(),'days') + 1;
        vm.project.incubationPeriod = 52;
        vm.project.daysPassed = moment().diff(moment(vm.project.eggsLaidDate),'days');

        vm.project.increasePeriod = function() {
            vm.project.incubationPeriod++;
        }

        vm.project.decreasePeriod = function() {
            vm.project.incubationPeriod--;
        }
    }
}

function GetProjectById(projects, id) {
    var selectedProjects = $.grep(projects, function(project, index){
        if(project.id == id) return project;
    });

    if(selectedProjects.length > 0)
        return selectedProjects[0];

    return null;
}

function GetProjectOffspring(projectId) {
    var offspring = $.grep(collection, function(animal, index) {
        if(animal.productOfProject == projectId) return animal;
    });

    if(offspring.length > 0)
        return offspring;

    return null;
}
