/**
 * Created by Eddie on 9/28/14.
 */
(function(){
    angular
    .module('grr')
    .controller('Available', Available);
})();

function Available($scope) {
    /* jshint validthis: true */
    var vm = this;

//    vm.status = 'available';

    vm.selling = function(animals){
        var forSale = [];
        for(var i = 0; i < animals.length;i++){
            if(animals[i].price > 0)
                forSale.push(animals[i]);
        }
        return forSale;
    };

    vm.all = vm.selling(collection);
    vm.available = GetAvailable(collection);
    vm.forSale = getCount(vm.all, 'available');
    vm.sold = getCount(vm.all, 'sold');
    vm.hold = getCount(vm.all, 'payments');
    vm.feeding = getCount(vm.all, 'feeding');
    vm.noneAvailable = getCount(vm.all, 'available') < 1;
}

function GetAvailable(all) {
    var available = $.grep(all, function(n,i){
        return n.status == 'available';
    });

    return available;
}

function getStatus(arr, strStatus){
    var newArray = $.grep(arr, function(n,i){
        return n.status == strStatus;
    });

    return newArray;
}

function getCount(arr, strStatus){
    var newArray = $.grep(arr, function(n,i){
        return n.status == strStatus;
    });
    return newArray.length;
}

