'use strict';

angular.module('app.auth', ['ngRoute'])

  // Home controller
  .controller('LoginController', [function(AuthService) {
    console.log("Login controller");
    console.log(AuthService);
  }]);