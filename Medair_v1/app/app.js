app = angular.module('myApp', ['ngRoute']);

app.controller('homeCtrl',function ($scope) {


});

// app.controller('todoCtrl', function($scope) {

// 	console.log("todoCTRL init");

// });

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);

  $routeProvider

      .when('/', {
        templateUrl: 'Pages/home/index.html',
        controller: 'homeCtrl'
      })

      .when('/organization/add', {
      	templateUrl: '/Pages/organization/add.html',
      	controller: 'orgCtrl'
      })

      .when('/organization/view', {
      	templateUrl: '/Pages/organization/view.html',
      	controller: 'orgCtrl'
      })

      // .when('/admin', {
      // 	templateUrl: 'Pages/organization/Admin.html'
      // 	controller: 'todoCtrl'
      // })

      .otherwise({
        redirectTo: '/'
      })

})