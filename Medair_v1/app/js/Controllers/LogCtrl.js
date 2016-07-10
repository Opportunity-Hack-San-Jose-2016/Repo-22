/**
 * Created by Pulkit on 01-05-2016.
 */

var app = angular.module('LoginApp', ['ngCookies', 'ngRoute']);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.controller('LoginController', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies) {
    this.errMsg = "";
    $scope.signIn = function () {

        console.log($scope.user.userName);
        console.log($scope.user.passWord);

        $http({
            method: "GET",
            url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/check/' + $scope.user.userName + '/' + $scope.user.passWord,
            headers: undefined,
        }).then(function (resp) {
            console.log(resp);
            if (resp.data.Result === true) {
                this.errMsg = "Successfully Logged In";


            }

        },function (resp) {
            this.errMsg = "Please check your Username and Password";
        });
    };
}]);
app.controller('SignUpController', ['$scope', '$http', function ($scope, $http) {


    $scope.signUp = function () {
        $http({
            method: "POST",
            url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/create',
            data: {
                "Username": $scope.user.userName,
                "Password": $scope.user.passWord,
            },
            headers: undefined
        }).success(function (resp) {
            console.log(resp);
            if (resp.Result === true) {
                console.log("Account Creation was Successful");

                
            }

        }).error(function (resp) {
            this.errMsg = "Please check your Username and Password";
        });
    };
}]);



app.controller('ServiceReqCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.services = ['Health Care','Cash Assitence','water','Housing','Other'];

    $scope.signUp = function () {
        $http({
            method: "POST",
            url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/create',
            data: {
                "Username": $scope.user.userName,
                "Password": $scope.user.passWord,
            },
            headers: undefined
        }).success(function (resp) {
            console.log(resp);
            if (resp.Result === true) {
                console.log("Account Creation was Successful");

                window.location.assign('Login.html');

            }

        }).error(function (resp) {
            this.errMsg = "Please check your Username and Password";
        });
    };
}]);