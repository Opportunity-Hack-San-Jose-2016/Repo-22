var app = angular.module('VolunteerApp', ['ngCookies', 'ngRoute']);
app.controller('VolunteerCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

	console.log("volunteerCtrl Loaded");

	/**
	* initializations
	*/

	$scope.data = {
		
		name: "asdf"

	}

	$scope.servicesSelected = [{
		service_name: 'Water',
		selected: false
	},
	{
		service_name: 'Medical',
		selected: false
	},
	{
		service_name: 'Housing',
		selected: false
	},
	{
		service_name: 'Financial',
		selected: false
	}];

	/**
	*
	*/

	$scope.init = function(){

		console.log("volunteer controller init");

		serviceVolunteerGetAll(function(err, response){

			console.log("got reponse: ", response);

			$scope.volunteers = response;


		})
	}

	/**
	* quick testing 
	*/

	$scope.testClick = function() {

		console.log("test click");
	}

	/**
	* view changes
	*/

	// $scope.addOrganizationClicked = function() {

	// 	//reroute
	// 	$location.path('/organization/add');
	// }

	$scope.onServiceSelected = function(index) {

		console.log("service selected: ", index);
		console.log("debug", $scope.servicesSelected[index]);
		console.log("debug", $scope.servicesSelected[index].selected);
		var selection = $scope.servicesSelected[index].selected;

		$scope.servicesSelected[index].selected = !(selection);

		console.log("afterchage", $scope.servicesSelected[index].selected);
		// var selection = ($scope.servicesSelected.indexOf(index)).selected = !(selected);
		//console.log("service selection changed:", selection);
	}

	/**
	* services
	*/


	$scope.serviceAddVolunteer = function() {

		console.log("serviceAddVolunteer");

		var url_host = "http://localhost:3000";
		var url_path = "/api/volunteer/create";


		//MOCK DATA
		// var MOCK_organization_data = {
		// 	    "organization": {
		// 	    "name":"Medair",
		// 	    "locations":[{"lat": "35.15", "lng":"34.56"}],
		// 	    "services":["Health", "Water"],
		// 	    "contactPerson":"Mitul",
		// 	    "contactNumber":"1234343434",
		// 	    "email":"mitul@gmail.com"
		// 	    }
		// }
		

		// var data = MOCK_organization_data;

		//add services the organization has selected


		// var servicesSelected = [];
		// $scope.servicesSelected.forEach(function(ele){

		// 	if(ele.selected === true) {
		// 		servicesSelected.push(ele.service_name);
		// 	}

		// })


//sample post body
// 		{
//     "volunteer": {
//     "email(email)":"vis19@asdf.com",
//     "name(name)":"Vishv Brahmbhatt",
//     "password(password)":"somepass",
//     "organizationId(organization_id)":"org1234",
//     "contactNumber(phone)":"1234343434"
//     }
// }


		var data = {

			"volunteer": {
			    "email":$scope.volunteer_email,
			    "name":$scope.volunteer_name,
			    "password":$scope.volunteer_password,
			    "organizationId":$scope.volunteer_organization_id,
			    "contactNumber":$scope.volunteer_phone
			}

		}

		console.log("Making post request with data, ", data);


		var requestOptions = {

		   'method': "POST",
           'url': url_host + url_path,
           'data': data,
           'headers': {
           		'Content-Type': 'application/json'
           }

		}

		$http(requestOptions).success(function(response) {

			console.log(response);

		}).error(function(error) {

			console.log(error.errMsg);
		});

	}

	function serviceVolunteerGetAll(callback) {

		console.log("serviceVolunteerGetAll");

		var url_host = "http://localhost:3000";
		var url_path = "/api/volunteer/getAll";

		var requestOptions = {

		   'method': "GET",
           'url': url_host + url_path,
           'headers': {
           		'Content-Type': 'application/json'
           }

		}

		// $http.post(url_host + url_path, data, config).then(function(){

		// 	console.log("Success");

		// }, function() {

		// 	console.log("Failure");

		// });

		$http(requestOptions).success(function(response) {

			console.log(response);
			callback(null, response);

		}).error(function(error) {

			console.log(error.errMsg);
			callback(response, null);

		});

	}

    $scope.init();



}]);