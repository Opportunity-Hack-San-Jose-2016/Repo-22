/**
 * Created by Pulkit on 03-05-2016.
 */
angular.module('CSwitch', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};

            $routeProvider
                .when('/Help', {
                    templateUrl: 'Help.html',
                    controller: "DashCtrl",
                    // controllerAs: 'dash'
                })
                // .otherwise({
                //     templateUrl: ''
                // });

            // $locationProvider.html5Mode(true);
        }])

    //for loading component

    .directive('ifLoading', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                scope.isLoading = isLoading;

                scope.$watch(scope.isLoading, toggleElement);

                ////////

                function toggleElement(loading) {
                    if (loading) {
                        elem.show();
                    } else {
                        elem.hide();
                    }
                }

                function isLoading() {
                    return $http.pendingRequests.length > 0;
                }
            }
        };
    }])
    .controller('DashCtrl',['$http','$scope',function($http,$scope){

        $http({
            method:"GET",
            url:'https://www.google.com',
            headers: undefined,
            data:{
                //JSON DATA to be sent Token ReqId
            }
        }).then(function(resp){
            //resp.data contains all the JSON data.
            //merge the resp.data array with a ng-model.
            $scope.requests= resp.data;

        }), function (resp) {
            console.log("")
        }
    }])
    //Directive for making alerts
    /*
     .directive('notification', function ($timeout) {
     return {
     restrict: 'E',
     replace: true,
     scope: {
     ngModel: '='
     },
     template: '<div class="alert fade" bs-alert="ngModel"></div>',
     link: function (scope, element, attrs) {
     $timeout(function () {
     element.hide();
     }, 3000);
     }
     }
     })*/

    //Pulkit

