import React, {useEffect} from 'react';
import '../styles/map.css';

const center = { lat: 47.659662, lng: -122.31 };

let propertyData;

function Map({leaseData}) {
    propertyData = leaseData;

    useEffect(() => {
        initMap();
    }, [leaseData]);

    return (
        <div id='map' ></div>
    )
}

function hoverOver(markerView) {
    markerView.content.classList.add("hover");
}

function unhover(markerView) {
    markerView.content.classList.remove("hover");
}

function load(p) {
    const comp = document.createElement("div");
    comp.classList.add("property");
    p.category = p.category === "Apartment" ? "building" : p.category;
    p.category = p.category.toLowerCase();

    comp.innerHTML = `
        <div class="icon">
            <i class="fa fa-icon fa-${p.category}"></i>
        </div>
        <div class="info">
            <div class="price">${p.price}</div>
            <div class="address">${p.address}</div>

            <div class="features">
            <div>
                <i class="fa fa-bed fa-lg bed"></i>
                <span>${p.bedNum}</span>
            </div>
            <div>
                <i class="fa fa-bath fa-lg bath"></i>
                <span>${p.bathNum}</span>
            </div>
            <div>
                <i class="fa fa-ruler fa-lg size"></i>
                <span>${p.space} ft<sup>2</sup></span>
            </div>
            </div>
        </div>
        `;
    return comp;
}

export function initMap() {
    const google = window.google;

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center,
        mapId: "4504f8b37365c3d0",
    });


    // Add Markers with label
    for (const p of propertyData) {
        let position =  {
            lat: p.latitude,
            lng: p.longitude
        };
        const advancedMarkerView = new google.maps.marker.AdvancedMarkerView({
            map,
            position: position,
            content: load(p)
        });

        const ele = advancedMarkerView.element;
        ["focus", "pointerenter"].forEach((event) => {
            ele.addEventListener(event, () => {
                hoverOver(advancedMarkerView);
            });
        });
        ["blur", "pointerleave"].forEach((event) => {
            ele.addEventListener(event, () => {
                unhover(advancedMarkerView);
            });
        });
    }
}

const properties = [
    {
        position: {
            lat: 47.657101,
            lng: -122.315224,
        },
        type: "building-user",
        price: "$ 3,050",
        bed: 4,
        bath: 2,
        size: 200,
        address: "4106 12th Ave NE, Seattle, WA 98105",
    },
    {
        position: {
            lat: 47.664710,
            lng: -122.302990,
        },
        type: "building",
        price: "$ 3,125",
        bed: 4,
        bath: 4,
        size: 800,
        address: "2251 NE Blakeley St, Seattle, WA 98105",
    },
    {
        position: {
            lat: 47.674390,
            lng: -122.316440,
        },
        type: "building",
        price: "$ 1,225",
        bed: 2,
        bath: 1,
        size: 210,
        address: "1020 NE 63rd St, Seattle, WA 98115",
    },
    {
        position: {
            lat: 47.66188049316406,
            lng: -122.31425476074219,
        },
        type: "building-user",
        price: "$ 3,850",
        bed: 4,
        bath: 4,
        size: 600,
        address: "5216 Brooklyn Ave NE, Seattle, WA 98105",
    },
    {
        position: {
            lat: 47.66, 
            lng: -122.31
        },
        type: "house",
        price: "$ 1,889",
        bed: 2,
        bath: 2,
        size: 300,
        address: "5000 University Way NE, Seattle, WA 98105",
    },
    {
        position: {
            lat: 47.6600777,
            lng: -122.315682,
        },
        type: "house",
        price: "$ 2,500",
        bed: 2,
        bath: 2,
        size: 100,
        address: "1120 NE 43rd St, Seattle, WA 98105",
    },
    {
        position: {
            lat: 47.6659662,
            lng: -122.3122513,
        },
        type: "building",
        price: "$ 2,500",
        bed: 3,
        bath: 2,
        size: 350,
        address: "5035 15th Ave NE, Seattle, WA 98105",
    },
    {
        position: {
            lat: 47.665794372558594,
            lng: -122.31192779541016,
        },
        type: "house",
        price: "$ 700",
        bed: 1,
        bath: 0.5,
        size: 50,
        address: "5020 15th Ave NE, Seattle, WA 98105",
    },
    {
        position: {
            lat: 47.6642363,
            lng: -122.3138869,
        },
        type: "house",
        price: "$ 2,225",
        bed: 4,
        bath: 3.5,
        size: 500,
        address: "4732 Brooklyn Ave NE, Seattle, WA 98105",
    },
    {
        position: {
            lat: 47.663370,
            lng: -122.312770,
        },
        type: "building",
        price: "$ 1,200",
        bed: 1,
        bath: 1,
        size: 70,
        address: "4710 University Way NE, Seattle, WA 98105",
    },
];

window.initMap = initMap;

export default Map;