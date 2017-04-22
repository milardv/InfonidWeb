angular.module('app.auth')
  .factory('AuthService', function($firebaseAuth){
    var auth = $firebaseAuth();

    return auth;
  });