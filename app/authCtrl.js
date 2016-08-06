(function(){
    "use strict";

    angular
        .module("grr")
        .controller("AuthCtrl", ["userAccount", authController]);

    function authController(userAccount){
        var vm = this;
        vm.isLoggedIn = false;
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.register = function(){

        };

        vm.login = function(){

        };
    }
})();
