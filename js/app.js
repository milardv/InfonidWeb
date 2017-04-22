/**
 * Main AngularJS Web Application
 */
var app = angular.module('app', [
  'ngRoute',
  'firebase',
  'app.map',
  'app.auth'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/carte", {templateUrl: "partials/map.html", controller: "MapController"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
      .when("/login", {templateUrl: "partials/login.html", controller: "LoginController"})
      // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});

  var config = {
    apiKey: "AIzaSyDp61s00WOYg2xt4jLUdxZgtxYBuGC2z90",
    authDomain: "infonid-e83a2.firebaseapp.com",
    databaseURL: "https://infonid-e83a2.firebaseio.com",
    storageBucket: "infonid-e83a2.appspot.com",
    messagingSenderId: "294600999902"
  };
  firebase.initializeApp(config);
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

/**
 * Controls the Login
 */
app.controller('HomeCtrl', ['$scope', '$firebaseSimpleLogin', function($scope, $firebaseSimpleLogin) {
    var firebaseObj = new Firebase("https://infonid-e83a2.firebaseio.com");
    var loginObj = $firebaseSimpleLogin(firebaseObj);

    $scope.user = {};
    $scope.SignIn = function(e){
        e.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
        loginObj.$login('password', {
            email: username,
            password: password
        })
            .then(function(user) {
                //Success callback
                console.log('Authentication successful');
            }, function(error) {
                //Failure callback
                console.log('Authentication failure');
            });
    }
}]);

