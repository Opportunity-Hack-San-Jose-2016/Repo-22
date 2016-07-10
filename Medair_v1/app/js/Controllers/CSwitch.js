
angular.module('CSwitch', ['ngRoute', 'ngCookies'])
    // .config(['$routeProvider', '$locationProvider', '$httpProvider',
    //     function ($routeProvider, $locationProvider, $httpProvider) {
    //         $httpProvider.defaults.headers.common = {};
    //         $httpProvider.defaults.headers.post = {};
    //         $httpProvider.defaults.headers.put = {};
    //         $httpProvider.defaults.headers.patch = {};
    //
    //         $routeProvider
    //             .when('/Help', {
    //                 templateUrl: '../../Pages/Organization_Services/Help.html',
    //                 controller: "DashCtrl",
    //                 controllerAs: 'dash'
    //             })
    //             .when('/pending/:name',{
    //                 templateUrl:'../../Pages/Organization_Services/ServicesPage.html',
    //                 controller: "ReqCtrl"
    //             })
    //
    //             .when('/Refugees',{
    //                 templateUrl: '../../Pages/Organization_Services/refugee.html',
    //                 controller: "refugeeCtrl as ref",
    //             })
    //             // .otherwise({
    //             //     templateUrl: ''
    //             // });
    //
    //         // $locationProvider.html5Mode(true);
    //     }])

    .factory('restCall', function($http) {
        console.log("inside restcall");
        var requests;
        var serverReq = function () {
            console.log("inside restcall");
            $http({
                method: "GET",
                url: 'localhost:3000/api/requests',
                headers: {'Content-Type': 'application/json'},
            }).success(function (resp) {
                console.log(resp);
                requests = value;
                if (resp.Result != null) {

                    console.log("Account Creation was Successful");
                }

            }).error(function (resp) {
                console.log(resp);
                this.errMsg = "Please check your Username and Password";
            });

            return requests;
        };

        return {
            serverReq : serverReq
        };
})
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
        $scope.requests=restCall.serverReq();
        $scope.accept=function () {
         $scope.acptBtn ="Accepted";
        }
            
            

    }])
    .controller('ReqCtrl',['$scope','$routeParams','restCall',function ($scope,$routeParams,restCall) {
        $scope.requests=restCall.serverReq();
        console.log("params :"+$routeParams.name);
        $scope.serviceName=$routeParams.name;
        // $scope.serviceName =
    }])
//
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

