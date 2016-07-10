/**
 * Created by Pulkit on 03-05-2016.
 */
angular.module('CSwitch', ['ngRoute', 'ngAnimate', 'ngCookies'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};

            $routeProvider
                .when('/Dashboard', {
                    templateUrl: 'Dashboard.html',
                    controller: "DashCtrl",
                    // controllerAs: 'dash'
                })
                .when('/AdminDashboard', {
                    templateUrl: 'AdminDash.html',
                    controller: "AdminCtrl"

                })
                .when('/Profile', {
                    templateUrl: 'profile.html',
                    controller: "ProfileCtrl",
                    //controllerAs: 'prof'
                })
                .when('/SensorManagement', {
                    templateUrl: 'Sensor Management.html',
                    controller: 'SensorCtrl'

                }).when('/SensorManager', {
                    templateUrl: 'Sensor Manager.html',
                    controller: 'SensorCtrl2'

                })
                .when('/Reports', {
                    templateUrl: 'Reports.html',
                    controller: 'ReportCtrl'

                })
                .when('/Maps', {
                    templateUrl: 'Maps.html',
                    controller: 'MapCtrl'

                })
                .when('/Billing', {
                    templateUrl: 'Billing.html',
                    controller: 'BillingCtrl'

                })
                .when('/Subscription', {
                    templateUrl: 'Subscriptions.html',
                    controller: 'SubscriptionsCtrl'
                })
                .otherwise({
                    templateUrl: 'Dashboard.html'
                });

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
    .controller('SensorCtrl2', ['$scope', function ($scope) {

    }])
    .controller('AdminCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
        var userN = $cookies.get('uName');
        var userP = $cookies.get('uPass');
        userN = decodeURIComponent(userN);
        $scope.message = "Successful AdminDash";
        var list = [];
        $http({
            method: "GET",
            url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/dashboard/details/' + userN + '/' + userP + '/', //change PD to userN and 123 to userP
            headers: undefined,
        }).then(function (resp) {
            console.log("Successful");
            $scope.list = resp.data.admin_details;
            console.log(resp.data);
            $scope.list = resp.data.admin_details;
            $scope.tUser = resp.data.user_count;
            $scope.tSensor = resp.data.tot_sensor;
            $scope.aSensor = resp.data.active_sensor;

        }, function (resp) {
            console.log(" Failed" + resp.status + "  " + resp.data);
        })
    }])
    .controller('ProfileCtrl', ['$scope', function ($scope) {
        $scope.message = "Successful Profile";
        $scope.uName = "jerrygao";
        $scope.fname = "Jerry";
        $scope.lname = "Gao";

        $scope.addSensor = function () {
            $http({
                method: 'POST',
                url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensor/add/',
                headers: undefined,
                data: {

                    "Location": $scope.city,
                    "Type": $scope.sTypes[$scope.sType],
                    "Typecode": $scope.sType,
                    "Coordinate": {
                        "Lat": $scope.latitude,
                        "Lng": $scope.longitude
                    }

                }
            }).then(function (resp) {
                console.log(resp.data);
                if (resp.data.typecode == $scope.sType) {
                    $scope.message = {
                        "type": "success",
                        "title": "Success!",
                        "content": "User Profile Updated Successfully!!"
                    };

                    //($timeout($scope.hideAlert(),50000)); Not Working**
                    console.log('Sensor ADDED Successfully');

                }
            }, function (resp) {
                $scope.message = {
                    "type": "danger",
                    "title": "Fail!",
                    "content": "User Profile Updation Failed!!"
                };
                console.log("COuld nt add sensor " + resp.data);
                //($timeout($scope.hideAlert(), 5000));
            })
        }


    }])
    .controller('MapCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

        var userN = $cookies.get('uName');
        var userP = $cookies.get('uPass');
        userN = decodeURIComponent(userN);
        $scope.cityT = [];
        $scope.cityA = [];
        $scope.cityH = [];
        $scope.cityP = [];
        var fetch = function () {
            $http({
                method: 'GET',
                url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensorlist/' + userN + '/' + userP + '/',
                headers: undefined//change hardcoded Pd to userN and 123 to userP
            }).then(function (resp) {
                var result = resp.data.result;
                console.log(resp);
                for (var i = 0; i < result.length; i++) {
                    var city = {
                        'city': result[i].location,
                        'lat': result[i].coordinate.lat,
                        'long': result[i].coordinate.lng,
                        'desc': result[i].value
                    }
                    console.log(typeof result[i]['typecode']);
                    switch (result[i]['typecode']) {

                        case 1:
                            //Temeratur
                            $scope.cityT.push(city);
                            break;

                        case 2:
                            $scope.cityP.push(city);
                            break;
                        case 3:
                            //Humidity
                            $scope.cityH.push(city);
                            break;
                        case 4:
                            //Air Quality
                            $scope.cityA.push(city);
                            break;
                        default:
                            console.log("Check some prob in switch" + result[i]['typecode']);

                    }

                }//console.log("Done with assignment");
            }, function (resp) {
                console.log("Error Occured while fetching" + resp.status);
            })
        }
        fetch();
        function showMaps() {
            var mapOptions = {
                center: new google.maps.LatLng(37.338208, -121.886329),
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP

            };
            new google.maps.Map(document.getElementById("dvMap"), mapOptions);

            $scope.map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

            //Get data through a fn and put in here using markers
        }

        showMaps();

        $scope.showMarkers = function (cityObj) {
            showMaps();
            $scope.markers = [];


            var infoWindow = new google.maps.InfoWindow();

            var createMarker = function (info) {

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    animation: google.maps.Animation.DROP,
                    title: info.city
                });
                marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open($scope.map, marker);
                });
                //Conditional Push using Switch to be added.
                $scope.markers.push(marker);

            }

            for (i = 0; i < cityObj.length; i++) {
                createMarker(cityObj[i]);
            }
            console.log("Done with markers");

        }


    }])
    .controller('SensorCtrl', ['$scope', '$http', '$window', '$cookies', '$timeout', function ($scope, $http, $window, $cookies, $timeout) {
        $scope.alShow = false;
        var userN = $cookies.get('uName');
        var userP = $cookies.get('uPass');
        userN = decodeURIComponent(userN);
        $scope.alHide = true;
        function successFunction() {

            var mapOptions = {
                center: new google.maps.LatLng(37.338208, -121.886329),
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("dvMap1"), mapOptions);
            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: {lat: 37.338208, lng: -121.886329}
            });
            google.maps.event.addListener(marker, "dragend", function (e) {
                $scope.latitude = e.latLng.lat();
                $scope.longitude = e.latLng.lng();
                $scope.getCity();
                $scope.$apply()

            });

        }

        successFunction();
        $scope.sTypes = {
            1: "Temperature",
            2: "Pressure",
            3: "Humidity",
            4: "Air Quality Index"
        };
        $scope.getCity = function () {
            $http({
                method: 'GET',
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.latitude + "," + $scope.longitude,
                headers: undefined,

            }).then(function (resp) {
                    if (resp.data.status != "ZERO_RESULTS") {
                        console.log(resp.data);
                        var str = resp.data['results'][1]['formatted_address'];
                        var lastIndex = str.lastIndexOf(",");
                        str = str.substring(0, lastIndex);
                        var pieces = str.split(/[\,]+/);
                        var newcity = pieces[pieces.length - 2];
                        $scope.city = newcity;
                    }
                    else {
                        $window.alert("Enter a valid location");
                    }
                },
                function (resp) {
                    this.errMsg = resp.data;
                });
        }
//Rest now working here
        $scope.removeSensor = function () {
            $http({
                method: 'DELETE',
                url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensor/remove/' + userN + '/' + userP + '/' + $scope.sensorId, //change PD to userN and 123 to userP
                headers: undefined,
            }).then(function (resp) {
                    //was it successful
                    console.log(resp);
                    // $timeout(hideAlert(),50000);
                    console.log('Sensor Removed Successfully');
                    //if(resp.data.Result=='true'){

                    //}
                },
                function (resp) {
                    console.log("COuld nt remove sensor" + resp.data);
                })
        }
        /*For hiding alerts on Sensor Management page old way
         $scope.hideAlert = function(){$scope.alShow=false;
         }
         /* $scope.addSensor=function() {
         //Temp Code all these will go in the implementation and assigned dynamically
         $scope.alType = "success";
         $scope.alShow = true;
         $scope.alMessage ="Sensor Add was successful."


         }*/
        //Final Code
        $scope.addSensor = function () {
            $http({
                method: 'POST',
                url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensor/add/',
                headers: undefined,
                data: {

                    "Username": userN,      //Change PD to $cookies.get('uName')
                    "Password": userP,  //$cookies.get('uPass')
                    "Location": $scope.city,
                    "Type": $scope.sTypes[$scope.sType],
                    "Typecode": $scope.sType,
                    "Coordinate": {
                        "Lat": $scope.latitude,
                        "Lng": $scope.longitude
                    }

                }
            }).then(function (resp) {
                console.log(resp.data);
                if (resp.data.typecode == $scope.sType) {
                    $scope.message = {
                        "type": "success",
                        "title": "Success!",
                        "content": "Sensor Added Successfully!!"
                    };
                    $scope.alShow = true;
                    //($timeout($scope.hideAlert(),50000)); Not Working**
                    console.log('Sensor ADDED Successfully');

                }
            }, function (resp) {
                $scope.message = {
                    "type": "danger",
                    "title": "Fail!",
                    "content": "Sensor Addition Failed!!"
                };
                $scope.alShow = true;
                console.log("COuld nt add sensor " + resp.data);
                //($timeout($scope.hideAlert(), 5000));
            })
        }
        $scope.subscribe = function () {
            $http({
                method: 'GET',
                url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensor/status/' + userN + '/' + userP + '/' + $scope.sensorId2,
                headers: undefined,
            }).then(function (resp) {
                    //Show alert that successfully Subscribe
                    console.log("Subscription Successful");
                }, function (resp) {

                    console.log("Subscription Failed" + resp);
                }
            )

        }
        $scope.unsubscribe = function () {
            $http({
                method: 'GET',
                url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensor/status/' + userN + '/' + userP + '/' + $scope.sensorId3 + '/0',
                headers: undefined,
            }).then(function (resp) {
                    //Show alert that successfully Subscribe
                    console.log("UnSubscription Successful");
                }, function (resp) {
                    console.log("UnSubscription Failed" + resp);
                }
            )

        }

    }])


    //Mounika
    .controller('ReportCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
        var userN = $cookies.get('uName');
        var userP = $cookies.get('uPass');
        userN = decodeURIComponent(userN);
        $scope.message = "Successful Report";
        var list = [];
        $http({
            method: "GET",
            url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensorlist/' + userN + '/' + userP, //change PD to userN and 123 to userP
            headers: undefined,
        }).then(function (resp) {
            console.log(resp.data);
            console.log("Successful");
            $scope.list = resp.data.result;
        }, function (resp) {
            console.log(" Failed" + resp.status + "  " + resp.data);
        })
    }])

    .controller('BillingCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
        var userN = $cookies.get('uName');
        var userP = $cookies.get('uPass');
        userN = decodeURIComponent(userN);
        $scope.message = "Successful Billing Details";
        //var list = [];
        $scope.list = [];
        $http({
            method: "GET",
            url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/user/billing/' + userN + '/' + userP, //change PD to userN and 123 to userP
            headers: undefined,
        }).then(function (resp) {
            console.log(resp.data);
            console.log("Successful");
            //use resp here
            $scope.list = resp.data;
            for (count = 0; count < $scope.list.length; count++) {
                $scope.list[count].costeach = $scope.list[count].cost * $scope.list[count].timeUsed;
            }
        }, function (resp) {
            console.log(" Failed" + resp.status + "  " + resp.data);
        })

        $scope.totalPrice = function () {
            var total = 0;
            for (count = 0; count < $scope.list.length; count++) {
                total += $scope.list[count].cost * $scope.list[count].timeUsed;
            }
            return total;
        }
    }])
    .controller('DashCtrl', ['$scope', '$http', '$window', '$cookies', function ($scope, $http, $window, $cookies) {
        // $scope.message = "Successful Dash";
        var userN = $cookies.get('uName');
        var userP = $cookies.get('uPass');
        userN = decodeURIComponent(userN);
        var list = [];
        console.log('http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensorlist/' + userN + '/' + userP);
        $http({
            method: "GET",
            url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensorlist/' + userN + '/' + userP, //change PD to userN and 123 to userP
            headers: undefined,
        }).then(function (resp) {
            $scope.list = resp.data.result;

            var result = resp.data.result;

            console.log($scope.list);
            console.log(resp.data);
            console.log("Successful");
            var datat1 = [];
            var datat2 = [];
            var datath = [];
            var dataph = [];
            var dataah = [];
            var datahh = [];
            var datap1 = [];
            var datap2 = [];
            var datah1 = [];
            var datah2 = [];
            var dataa1 = [];
            var dataa2 = [];
            var t = 0;
            var p = 0;
            var a = 0;
            var h = 0;
            $scope.d = [];


            for (count = 0; count < result.length; count++) {
                if (result[count].typecode == '1') {
                    datath[t] = result[count].history;
                    datat1[t] = result[count].location;
                    datat2[t] = result[count].value;
                    t++;
                }
                if (resp.data.result[count].typecode == '2') {
                    dataph[p] = result[count].history;
                    datap1[p] = result[count].location;
                    datap2[p] = result[count].value;
                    p++;
                }
                if (result[count].typecode == '3') {
                    datahh[h] = result[count].history;
                    datah1[h] = result[count].location;
                    datah2[h] = result[count].value;
                    h++;
                }
                if (result[count].typecode == '4') {
                    dataah[a] = result[count].history;
                    dataa1[a] = result[count].location;
                    dataa2[a] = result[count].value;
                    a++;
                }
            }
            $scope.d.dt1 = datat1;
            $scope.d.dt2 = datat2;
            $scope.d.h = datath;
            $scope.d.dp1 = datap1;
            $scope.d.dp2 = datap2;
            $scope.d.ph = dataph;
            $scope.d.dh1 = datah1;
            $scope.d.dh2 = datah2;
            $scope.d.hh = datahh;
            $scope.d.da1 = dataa1;
            $scope.d.da2 = dataa2;
            $scope.d.ah = dataah;


            Highcharts.chart('containers', {
                title: {
                    text: 'Temperature Data'
                },
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 30,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                xAxis: {
                    categories: datat1
                },

                plotOptions: {
                    column: {
                        depth: 25
                    },
                    series: {

                        color: '#F97069',

                    }
                },
                series: [{
                    name: "Temperature",
                    data: datat2,

                }]
            });


            //Pressure Chart
            Highcharts.chart('pressure', {
                title: {
                    text: 'Pressure Data'
                },
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 30,
                        depth: 50,
                        viewDistance: 25
                    }
                }, xAxis: {
                    categories: datap1
                },

                plotOptions: {
                    column: {
                        depth: 25
                    },
                    series: {
                        color: '#B5BAFF'
                    }
                },
                series: [{
                    name: "Pressure",
                    data: datap2,

                }]
            });

            Highcharts.chart('humidity', {
                title: {
                    text: 'Humidity Data'
                },
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 30,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                plotOptions: {
                    column: {
                        depth: 25
                    },
                    series: {
                        color: '#B5F2FF'
                    }
                }, xAxis: {
                    categories: datah1
                },

                series: [{
                    name: "Humidity",
                    data: datah2

                }]
            });


            Highcharts.chart('airqualityindex', {
                title: {
                    text: 'Air Quality Index'
                },
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 30,
                        depth: 50,
                        viewDistance: 25
                    }
                }, xAxis: {
                    categories: dataa1
                },

                plotOptions: {
                    column: {
                        depth: 25
                    },
                    series: {
                        color: '#F4FFCC'
                    }
                },
                series: [{
                    name: "Air Quality",
                    data: dataa2,

                }]
            });
            console.log("hist det temp");
            console.log($scope.d.h);

            $scope.fun = function (hist) {

                console.log(hist);
                Highcharts.chart('popdiv', {
                    title: {
                        text: 'Most recent Temperature values'
                    },

                    xAxis: {},

                    series: [{
                        name: "Temperature",
                        data: [hist[0], hist[1], hist[2], hist[3], hist[4], hist[5], hist[6], hist[7], hist[8], hist[9]],
                    }]
                });

            }
            $scope.funp = function (hisp) {
                console.log("hisp");
                console.log(hisp);

                Highcharts.chart('popdiv', {
                    title: {
                        text: 'Most recent Pressure values'
                    },

                    xAxis: {},

                    series: [{
                        name: "Pressure",
                        data: [hisp[0], hisp[1], hisp[2], hisp[3], hisp[4], hisp[5], hisp[6], hisp[7], hisp[8], hisp[9]],
                    }]
                });

            }

            $scope.funh = function (hish) {

                Highcharts.chart('popdiv', {
                    title: {
                        text: 'Most recent Humidity values'
                    },

                    xAxis: {},

                    series: [{
                        name: "Humidity",
                        data: [hish[0], hish[1], hish[2], hish[3], hish[4], hish[5], hish[6], hish[7], hish[8], hish[9]],
                    }]
                });

            }

            $scope.funa = function (hisa) {

                Highcharts.chart('popdiv', {
                    title: {
                        text: 'Most recent Pressure values'
                    },

                    xAxis: {},

                    series: [{
                        name: "Air Quality Index",
                        data: [hisa[0], hisa[1], hisa[2], hisa[3], hisa[4], hisa[5], hisa[6], hisa[7], hisa[8], hisa[9]],
                    }]
                });

            }

        }, function (resp) {
            console.log(" Failed" + resp.status + "  " + resp.data);
        })



}])

.
controller('SubscriptionsCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    var userN = $cookies.get('uName');
    var userP = $cookies.get('uPass');
    userN = decodeURIComponent(userN);
    $scope.message = "Successful Subscriptions";
    var list = [];
    $http({
        method: "GET",
        url: 'http://ec2-54-187-86-28.us-west-2.compute.amazonaws.com/sensorlist/' + userN + '/' + userP, //change PD to userN and 123 to userP
        headers: undefined,
    }).then(function (resp) {
        console.log(resp.data);
        console.log("Successful");
        $scope.list = resp.data.result;
    }, function (resp) {
        console.log(" Failed" + resp.status + "  " + resp.data);
    })

}])
//.controller('MainCtrl',function($scope){

//})
