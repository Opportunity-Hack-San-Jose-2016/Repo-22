var app = angular.module('myApp', ['LoginApp', 'ngRoute', 'ngCookies']);

app.controller('homeCtrl',function ($scope) {


});

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);

  $routeProvider

      .when('/', {
        templateUrl: 'Pages/home/index.html',
        controller: 'homeCtrl'
      })

      .when('/login', {
        templateUrl: 'pages/login/login.html',
        controller: 'LoginController'
      })

      .when('/signup', {
        templateUrl: 'pages/login/signup.html',
        controller: 'SignUpController'
      })

      .when('/organization', {
        templateUrl: '/Pages/organization/Admin.html',
        controller: 'CSwitch'
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