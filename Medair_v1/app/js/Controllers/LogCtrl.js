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
        $http({
            method: "GET",
            url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/check/' + $scope.user.uName + '/' + $scope.user.pass,
            headers: undefined,
        }).then(function (resp) {
            console.log(resp);
            if (resp.data.Result === true) {
                this.errMsg = "Successfully Logged In";
                $cookies.put('loggedIn', true);
                $cookies.put('uName', $scope.user.uName);
                $cookies.put('uPass', $scope.user.pass);
                $cookies.put('isAdmin',$scope.isAdmin);
                if ($scope.isAdmin == true)
                    window.location.assign('Admin.html');
                else
                    window.location.assign('User.html');
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
                "Username": $scope.user.uName,
                "Password": $scope.user.pass,
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
