
/*
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
    var mapOptions = {
        center: new google.maps.LatLng(37.338208, -121.886329),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
    google.maps.event.addListener(map, 'click', function (e) {
        document.getElementById('lat').value = e.latLng.lat();
        document.getElementById('lng').value = e.latLng.lng();
        var lat =e.latLng.lat();
        var lng = e.latLng.lng();
        // var lat = position.coords.latitude;
        // var lng = position.coords.longitude;
        //var latlng = new google.maps.LatLng(lat, lng);

    });

}

function errorFunction(){
    alert("Geocoder failed");
}
//For getting city name and other details
