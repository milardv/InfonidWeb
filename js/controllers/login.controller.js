(function () {
    'use strict';

    angular
        .module('app.controllers')
        .controller('loginController', loginController);

    loginController.$inject = [];


    function loginController() {

        function activate() {
            console.log("here in the login ctrl");
        }
        activate();
    }
})();