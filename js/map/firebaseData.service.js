(function() {
  'use strict';

  angular
    .module('app.map')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    console.log(firebase);
    var root = firebase.database().ref();

    var dataService = {
      root: root,
      users: root.child('users'),
      nests: root.child('nests')
    };

    console.log(root);

    return dataService;
  }
})();