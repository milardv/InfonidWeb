'use strict';

angular.module('app.map', ['firebase'])

// Home controller
  .controller('MapController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray){

    L.mapbox.accessToken = 'pk.eyJ1IjoidmFscmVmZ2VvIiwiYSI6ImNpdndlZDFyNTAxNGoyenBkZ3d1Z2phZmMifQ.nzDRmWqsETzMwJyIwrNazQ';

    var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
      attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var mapLeaflet = L.mapbox.map('map-leaflet', 'mapbox.light')
      .addLayer(mapboxTiles)
      .setView([46.9896, 3.159 ], 5);

/*
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
      center: [3.159, 46.9896], // starting position
      zoom: 5 // starting zoom
    });
*/

    var geojson = [];

    console.log("MapController");
    var ref = firebase.database().ref();
    $scope.nests = $firebaseArray(ref.child('nests'));
    $scope.nests.$loaded()
      .then(function(){
        angular.forEach($scope.nests, function(user) {
          angular.forEach(user, (function(nest) {
            if (nest && nest['diameter']){
              L.marker([nest['lat'],nest['long']]).addTo(mapLeaflet).bindPopup('<img style="width: 50px" src="' + nest['imgURL'] + '">' +
                ' <h2>' + "Nid : " + nest['type'] + '</h2>' +
                ' <p>' + "Hauteur : " + nest['height'] + "cm   " + "Diamètre : " + nest['height'] + "cm" + '</p>' +
                ' <p>' + "Détruit le " + nest['moment'] + '</p>');
            }
          }));
        })
      }).then(function(){

      //myLayer.setGeoJSON(geojson);
      mapLeaflet.scrollWheelZoom.disable();
    });

    var myLayer = L.mapbox.featureLayer().addTo(mapLeaflet);

    $scope.saveJSON = function () {
      $scope.toJSON = '';
      $scope.toJSON = angular.toJson($scope.nests);
      var blob = new Blob([$scope.toJSON], { type:"application/json;charset=utf-8;" });
      var downloadLink = angular.element('<a></a>');
      downloadLink.attr('href', window.URL.createObjectURL(blob));
      downloadLink.attr('download', 'donnée-nids.csv');
      downloadLink[0].click();
    };
  }]);
