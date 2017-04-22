'use strict';

angular.module('app.auth')
  .factory('AuthService', function(){
    console.log("auth service")
    //var auth = $firebaseAuth();
    var auth = 'firebaseauth';
    return auth;
  });