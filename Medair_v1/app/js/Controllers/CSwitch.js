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
                // .otherwise({
                //     templateUrl: ''
                // });

            // $locationProvider.html5Mode(true);
        }])
    .factory('restCall',['$http', function ($http) {
        var requests;
        requests=[{
            "serviceId":"111123",
            "RefugeeId":"reg11",
            "dataAdded":"111123",
            "status":"pending",
            "comments":"test",
            "reqId":"12312312312"
        },
            {
                "serviceId":"222222",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"pending",
                "comments":"test",
                "reqId":"12312312312"
            },
            {
                "serviceId":"3333333",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"pending",
                "comments":"test",
                "reqId":"12312312312"
            },
            {
                "serviceId":"4444444",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"pending",
                "comments":"test",
                "reqId":"12312312312"
            },{
                "serviceId":"5555555",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"processing",
                "comments":"test",
                "reqId":"12312312312"
            },{
                "serviceId":"111123",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"pending",
                "comments":"test",
                "reqId":"12312312312"
            },{
                "serviceId":"111123",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"completed",
                "comments":"test",
                "reqId":"12312312312"
            },{
                "serviceId":"111123",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"pending",
                "comments":"test",
                "reqId":"12312312312"
            },{
                "serviceId":"111123",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"processing",
                "comments":"test",
                "reqId":"12312312312"
            },{
                "serviceId":"111123",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"processing",
                "comments":"test",
                "reqId":"12312312312"
            },{
                "serviceId":"111123",
                "RefugeeId":"reg11",
                "dataAdded":"111123",
                "status":"pending",
                "comments":"test",
                "reqId":"12312312312"
            }
            ];/*
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
            requests= resp.data;

        }), function (resp) {
            console.log("")
        }*/
        return requests;
    }])
    //for loading component
    .filter('unique', function () {

        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    })
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
    .controller('DashCtrl',['restCall','$http','$scope',function(restCall,$http,$scope){
        $scope.requests=restCall;
        $scope.accept=function () {
         $scope.acptBtn ="Accepted";
        }
            
            

    }])
    .controller('ReqCtrl',['$scope','$routeParams','restCall',function ($scope,$routeParams,restCall) {
        $scope.requests=restCall;
        console.log("params :"+$routeParams.name);
        $scope.serviceName=$routeParams.name;
        // $scope.serviceName =
    }])

    .controller('refugeeCtrl',['$http','$scope',function($http,$scope){
        $scope.refJson= [];
        $scope.refNames= [];
        $scope.searchid ="a";
        $http({
            method:"GET",
            url:'../../data/sampleJson.json',
            headers: undefined,
            data:{}
        }).then(function(resp){


            angular.forEach(resp.data,function(value,index){
                // console.log(value.refugeeName);
                $scope.refJson.push(value);
                $scope.refNames.push(value.refugeeName+"-"+value.RefugeeId);

            });



        }), function (resp) {
            console.log("")
        }


        $scope.updateSelection= function (id) {

            if(id.indexOf('-') > 0){
                var values = id.split("-");
                $scope.searchid = values[1];
            }

        }
    }])



    //Directive for making alerts

