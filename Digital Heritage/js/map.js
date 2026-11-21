/* =================================
   DIGITAL HERITAGE
   HERITAGE MAP
================================= */


/* ---------------------------------
   INITIALIZE MAP
--------------------------------- */

const map = L.map("heritage-map", {
    zoomControl: true,
    scrollWheelZoom: true
});


/* ---------------------------------
   MAP TILES
--------------------------------- */

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,

        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(map);


/* ---------------------------------
   HERITAGE LOCATIONS
--------------------------------- */

const heritageLocations = [

    {
        number: "01",
        name: "Gateway of India",
        city: "Mumbai",
        lat: 18.92196,
        lng: 72.83456
    },

    {
        number: "02",
        name: "Rajabai Clock Tower",
        city: "Mumbai",
        lat: 18.92955,
        lng: 72.82985
    },

    {
        number: "03",
        name: "CSMT Railway Station",
        city: "Mumbai",
        lat: 18.94010,
        lng: 72.83520
    },

    {
        number: "04",
        name: "CSMVS Museum",
        city: "Mumbai",
        lat: 18.92690,
        lng: 72.83160
    },

    {
        number: "05",
        name: "Panhala Fort",
        city: "Kolhapur",
        lat: 16.80878,
        lng: 74.10781
    },

    {
        number: "06",
        name: "Bhavani Mandap",
        city: "Kolhapur",
        lat: 16.69428,
        lng: 74.22409
    },

    {
        number: "07",
        name: "Shalini Palace",
        city: "Kolhapur",
        lat: 16.69212,
        lng: 74.20615
    }

];


/* ---------------------------------
   FIND LOCATION
--------------------------------- */

function getLocation(name) {

    return heritageLocations.find(
        function(location) {
            return location.name === name;
        }
    );

}


/* ---------------------------------
   CUSTOM MAP MARKER
--------------------------------- */

function createMarkerIcon(number) {

    return L.divIcon({

        className: "custom-map-marker",

        html: `
            <div class="heritage-marker">
                <span>${number}</span>
            </div>
        `,

        iconSize: [40, 40],

        iconAnchor: [20, 20],

        popupAnchor: [0, -22]

    });

}


/* ---------------------------------
   GOOGLE MAPS DIRECTIONS
--------------------------------- */

function getDirectionsURL(location) {

    return (
        "https://www.google.com/maps/dir/?api=1"
        + "&destination="
        + location.lat
        + ","
        + location.lng
    );

}


/* ---------------------------------
   ADD MARKERS
--------------------------------- */

const mapBounds = [];


heritageLocations.forEach(
    function(location) {


        const marker = L.marker(
            [
                location.lat,
                location.lng
            ],
            {
                icon:
                    createMarkerIcon(
                        location.number
                    ),

                title:
                    location.name
            }
        ).addTo(map);


        mapBounds.push([
            location.lat,
            location.lng
        ]);


        /* -----------------------------
           POPUP
        ----------------------------- */

        const popupHTML = `

            <div class="map-popup">

                <span class="map-popup-city">
                    ${location.city}
                </span>

                <h3>
                    ${location.name}
                </h3>

                <p>
                    Heritage location
                </p>

            </div>

        `;


        marker.bindPopup(
            popupHTML,
            {
                maxWidth: 250,

                className:
                    "heritage-popup"
            }
        );


        /*
         * Store marker on location
         * so the Explore button
         * can use it later.
         */

        location.marker = marker;

    }
);


/* ---------------------------------
   FIT MAP TO ALL LOCATIONS
--------------------------------- */

map.fitBounds(
    mapBounds,
    {
        padding: [80, 80]
    }
);


/* ---------------------------------
   EXPLORE BUTTONS
--------------------------------- */

const exploreButtons =
    document.querySelectorAll(
        ".explore-button"
    );


exploreButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const locationName =
                    button.dataset.location;


                const location =
                    getLocation(
                        locationName
                    );


                if (!location) {
                    return;
                }


                /*
                 * Move the map
                 * to selected place.
                 */

                map.flyTo(
                    [
                        location.lat,
                        location.lng
                    ],
                    15,
                    {
                        duration: 1.2
                    }
                );


                /*
                 * Open marker popup
                 * after the map moves.
                 */

                setTimeout(
                    function() {

                        location.marker.openPopup();

                    },
                    700
                );

            }
        );

    }
);


/* ---------------------------------
   VIEW DIRECTION BUTTONS
--------------------------------- */

const directionButtons =
    document.querySelectorAll(
        ".direction-button"
    );


directionButtons.forEach(
    function(button) {

        const locationName =
            button.dataset.direction;


        const location =
            getLocation(
                locationName
            );


        if (!location) {
            return;
        }


        button.href =
            getDirectionsURL(
                location
            );

    }
);