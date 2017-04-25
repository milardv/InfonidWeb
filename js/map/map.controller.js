'use strict';

angular.module('app.map', ['firebase'])

// Home controller
  .controller('MapController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray){

    mapboxgl.accessToken = 'pk.eyJ1IjoidmFscmVmZ2VvIiwiYSI6ImNpdndlZDFyNTAxNGoyenBkZ3d1Z2phZmMifQ.nzDRmWqsETzMwJyIwrNazQ';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
      center: [3.159, 46.9896], // starting position
      zoom: 5 // starting zoom
    });


    console.log("MapController");
    var ref = firebase.database().ref();
    $scope.nests = $firebaseArray(ref.child('nests'));
    $scope.nests.$loaded()
      .then(function(){
        angular.forEach($scope.nests, function(user) {
          angular.forEach(user, (function(nest) {
            console.log(nest['diameter']);
          }));
        })
      });
    /*for (var nest in $scope.nests[$scope.nests.size - 1]){
      console.log(nest);

    }*/

    console.log($scope.nests);
    //var vm = this;

    //console.log($firebase(new Firebase("https://infonid-e83a2.firebaseio.com" + '/nests')));
  }]);
