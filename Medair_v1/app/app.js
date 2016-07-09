angular.module('mainMod',[])

.controller('myCtrl',function ($scope) {

})



.config(function ($routeProvider,$locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider

      .when('/', {
        templateUrl: 'templates/index.html',
        controller: 'mainPageCtrl'
      }
      .otherwise({
        redirectTo: '/'
      });

});