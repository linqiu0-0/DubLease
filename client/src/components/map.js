import "./map.css";

function Map() {
    const google = window.google;
    var options = {     
        zoom: 10,
        center: { lat: 47.65, lng: -122.30 }
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

    var marker = new google.maps.Marker({
        position: { lat: 47.65, lng: -122.30 },
        map: map
    });
}

export default Map;