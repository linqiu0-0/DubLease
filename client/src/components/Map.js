import React, {useEffect} from 'react';
import '../styles/map.css';

const center = { lat: 47.659662, lng: -122.31 };

let propertyData, fromSubleaseInfo;

function Map({leaseData, isSubleaseInfo}) {
    propertyData = leaseData;
    fromSubleaseInfo = isSubleaseInfo;
    console.log(leaseData);

    useEffect(() => {
        if (propertyData.length === 1 && !propertyData[0].category) {
            console.log("no data for map");
            return;
        }
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

        if (!fromSubleaseInfo) {
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
}

window.initMap = initMap;

export default Map;