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

app.controller('LoginController', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies,$location) {
    this.errMsg = "";

    $scope.signIn = function () {

        console.log($scope.user.userName);
        console.log($scope.user.passWord);

        $http({
            method: "GET",
            url: 'http://localhost:3000/api/refugee/signIn',
            headers: {'Content-Type': 'application/json'},
            data: {
                "id": $scope.user.userName,
                "password": $scope.user.passWord,
            },

        }).then(function (resp) {
            console.log(resp);
            if (resp.data.Result === true) {
                this.errMsg = "Successfully Logged In";


            }

        },function (resp) {
            this.errMsg = "Please check your Username and Password";
        });
    };
}])

// .factory('getLocation',['$http', function ($http) {
//
//     var location = {};
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//
//             mysrclat = position.coords.latitude;
//             mysrclong = position.coords.longitude;
//             location = {"lat": mysrclat, "long":mysrclong};
//             console.log(mysrclat);
//             console.log(mysrclong);
//         });
//
//     }
//
//     return location;
// }])

app.controller('SignUpController', ['$scope', '$cookies','$http', function ($scope, $cookies,$http) {

    var location = {};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            mysrclat = position.coords.latitude;
            mysrclong = position.coords.longitude;
            location = {"lat": mysrclat, "long":mysrclong};
            console.log(mysrclat);
            console.log(mysrclong);
        });

    }

    console.log(location);
    $scope.signUp = function () {

        var dataJson = {"refugee": {
            "id":$scope.id,
            "firstname":$scope.firstName,
            "lastname":$scope.lastName,
            "password":$scope.passWord,
            "age":$scope.age,
            "location":location,
            "contactNumber":$scope.phonenumber,
            "gender":$scope.gender,
            "disabled":""+$scope.disabled
        }};

        console.log(dataJson);

        $http({
            method: "POST",
            url: 'http://localhost:3000/api/refugee/create',
            headers: {'Content-Type': 'application/json'},
            data:dataJson
        }).success(function (resp) {
            console.log(resp);
            $cookies.put('refugeeId', resp.id);
            if (resp.Result != null) {
                console.log("Account Creation was Successful");
            }

        }).error(function (resp) {
            console.log(resp);
            this.errMsg = "Please check your Username and Password";
        });
    };
}])

.factory('restCall', function($http) {
    // console.log("inside restcall");
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

app.controller('PendingReqCtrl', ['restCall','$scope', '$http', function (restCall,$scope, $http) {

    $scope.requests = restCall.serverReq();


    $scope.services = [
        { type:'Medical Assistance', img_url: 'medicalIcon.png'},
        { type:'Housing Repairs', img_url: 'houseIcon.png'},
        { type:'Water', img_url: 'waterIcon.png'},
        { type:'Financial Assistance', img_url: 'financeIcon.png'}
    ];

    // $scope.requests = [ {type: 'Medical Assistance', img_url:'medicalIcon.png', date: 'June 14th, 2016'},
    //     {type: 'Financial Assistance', img_url:'financeIcon.png', date: 'June 14th, 2016'},
    //     {type: 'Housing Repairs', img_url:'houseIcon.png', date: 'June 15th, 2016', details:'Roof is leaking, need repairs.', response: 'MedAir repair volunteers will be arriving to your location on July 14th, 2016 to assist you.'},
    //     {type: 'Water', img_url:'waterIcon.png', date: 'June 14th, 2016', details:'Need water purification system.', response: 'MedAir has been experiencing a funding shortage.  We are deeply sorry we cannot meet your request at this time.'}
    // ];
    $scope.getIconUrl = function(request){
        return request.img_url;
    }
    $scope.getDate = function(request){
        return request.date;
    }
    $scope.getType = function(request){
        return request.type;
    }
    $scope.getResponse = function(request){
        return request.response?request.response:false;
    }
    $scope.getDetails = function(request){
        return request.details?request.details:false;
    }
}]);

app.controller('ServiceReqCtrl', ['$scope', '$http', '$cookies', function ($scope, $http,$cookies) {
    $scope.service_names = ['Medical Assistance', 'Housing Repairs','Water', 'Financial Assistance'];
    $scope.service_imgurls = ['medicalIcon.png','houseIcon.png','waterIcon.png','financeIcon.png'];
    $scope.serviceId =[];
    $scope.services = [
        { name:'Medical Assistance', img_url: 'medicalIcon.png', selected: false },
        { name:'Housing Repairs', img_url: 'houseIcon.png', selected: false },
        { name:'Water', img_url: 'waterIcon.png', selected: false },
        { name:'Financial Assistance', img_url: 'financeIcon.png', selected: false }
    ]

    var location = {};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            mysrclat = position.coords.latitude;
            mysrclong = position.coords.longitude;
            location = {"lat": mysrclat, "long":mysrclong};
            console.log(mysrclat);
            console.log(mysrclong);
        });

    }


    $scope.serviceReq = function () {

        var refugeeId = $cookies.get('refugeeId');

        var dataJson = {"request": {
            "refugeeId":refugeeId,
            "location":location,
            "requiredService":$scope.serviceId
            // "requestComment":$scope.comment
        }};

        console.log(dataJson);

        $http({
            method: "POST",
            url: 'localhost:3000/api/makeRequest',
            headers: {'Content-Type': 'application/json'},
            data:dataJson
        }).success(function (resp) {
            console.log(resp);
            alert('success');
            if (resp.Result != null) {
                console.log("Account Creation was Successful");
            }

        }).error(function (resp) {
            console.log(resp);
            this.errMsg = "Please check your Username and Password";
        });
    };

    $scope.isSelected = function(idx){
        return $scope.services[idx].selected?"active-icon":"inactive-icon";
        $scope.serviceId.push($scope.services[idx].name);
    };

    $scope.selectService = function(service){
        var idx = service.$index;
        $scope.services[idx].selected=!$scope.services[idx].selected;

        $scope.serviceId.push($scope.services[idx].name);
    }

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
