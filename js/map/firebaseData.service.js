'use strict';

angular.module('app.map')
  .factory('MapService', function(){
    var root = firebase.database().ref();
    console.log('MapService');

    var MapService = {
      root: root,
      users: root.get('users'),
      nests: root.get('nests')
    };

    return MapService;
  });