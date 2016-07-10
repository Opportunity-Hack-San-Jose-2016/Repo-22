var app = angular.module('OrganizationApp', ['ngCookies', 'ngRoute']);
app.controller('orgCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

	console.log("orgCtrl Loaded");


	/**
	* initializations
	*/

	$scope.data = {
		name: "asdf"
	}

	/**
	*
	*/

	$scope.init = function(){

		console.log("orgCtrl init");
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

	$scope.addOrganizationClicked = function() {

		//reroute
		$location.path('/organization/add');
	}

	/**
	* private
	*/

	$scope.serviceAddOrganization = function() {

		console.log("serviceAddOrganization");

		var url_host = "http://localhost:3000";
		var url_path = "/api/organizations/create";


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



		var data = {

			"organization": {
			    "name":$scope.org_company,
			    "locations":[{"lat": "35.15", "lng":"34.56"}],
			    "services":["Health", "Water"],
			    "contactPerson":$scope.org_contact_name,
			    "contactNumber":$scope.org_phone,
			    "email":$scope.org_email
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

		// $http.post(url_host + url_path, data, config).then(function(){

		// 	console.log("Success");

		// }, function() {

		// 	console.log("Failure");

		// });

		$http(requestOptions).success(function(response) {

			console.log(response);

		}).error(function(error) {

			console.log(error.errMsg);
		});

	}


}]);