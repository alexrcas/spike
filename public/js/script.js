if (!navigator.geolocation) {
    throw Error('Geolocation not supported!')
}

const initializeMap = MAP => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(MAP);
}

const updatePosition = position => {
    if (PLAYER_MARKER) {
        MAP.removeLayer(PLAYER_MARKER)
    }
    PLAYER_MARKER = L.marker([position.coords.latitude, position.coords.longitude]);
    MAP.addLayer(PLAYER_MARKER);
}

const initializeMapPosition = position => {
    MAP.setView([position.coords.latitude, position.coords.longitude], 13);
}

const MAP = L.map('map').setView([51.505, -0.09], 13);
let PLAYER_MARKER = null;

initializeMap(MAP);
navigator.geolocation.getCurrentPosition(initializeMapPosition);

setInterval(() => {
    navigator.geolocation.getCurrentPosition(updatePosition);
    console.log('posición actualizada')
}, 3000)



