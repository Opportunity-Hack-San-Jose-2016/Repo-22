var app = angular.module('myApp', ['LoginApp', 'OrganizationApp', 'VolunteerApp', 'CSwitch', 'ngRoute', 'ngCookies']);

app.controller('homeCtrl',function ($scope) {


});

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);

  $routeProvider

      .when('/', {
          templateUrl: 'pages/login/login.html',
          controller: 'LoginController'
      })

      .when('/login', {
        templateUrl: 'pages/login/login.html',
        controller: 'LoginController'
      })

      .when('/signup', {
        templateUrl: 'pages/login/signup.html',
        controller: 'SignUpController'
      })

      .when('/service_req', {
          templateUrl: 'Pages/refugee_services/service_request.html',
          controller: 'ServiceReqCtrl'
      })

      .when('/pending_req', {
          templateUrl: 'Pages/refugee_services/pending_requests.html',
          controller: 'PendingReqCtrl'
      })


      .when('/admin', {
        templateUrl: '/Pages/Organization_Services/Admin.html',
        controller: 'ReqCtrl'
      })

      .when('/organization/add', {
      	templateUrl: '/Pages/organization/add.html',
      	controller: 'orgCtrl'
      })

      .when('/organization/view', {
      	templateUrl: '/Pages/organization/view.html',
      	controller: 'orgCtrl'
      })

      .when('/Help', {
          templateUrl: '../../Pages/Organization_Services/Help.html',
          controller: "DashCtrl",
          controllerAs: 'dash'
      })
      .when('/pending/:name',{
          templateUrl:'../../Pages/Organization_Services/ServicesPage.html',
          controller: "ReqCtrl"
      })

      .when('/Refugees',{
          templateUrl: '../../Pages/Organization_Services/refugee.html',
          controller: "refugeeCtrl as ref",
      })
      // .when('/admin', {
      // 	templateUrl: 'Pages/organization/Admin.html'
      // 	controller: 'todoCtrl'
      // })

      .when('/volunteer/add', {
          templateUrl: '/../Pages/volunteer/add.html',
          controller: "VolunteerCtrl"
      })
      
      .when('/volunteer/view', {
          templateUrl: '/../Pages/volunteer/view.html',
          controller: "VolunteerCtrl"
      })      

      .otherwise({
        redirectTo: '/'
      })

})