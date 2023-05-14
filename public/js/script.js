if (!navigator.geolocation) {
    throw Error('Geolocation not supported!')
}

const initializeMap = MAP => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(MAP);
}
var SEND_TO_SERVER = false;

const updatePosition = position => {
    if (PLAYER_MARKER) {
        MAP.removeLayer(PLAYER_MARKER)
    }
    PLAYER_MARKER = L.marker([position.coords.latitude, position.coords.longitude]);
    MAP.addLayer(PLAYER_MARKER);

    if (!SEND_TO_SERVER) {
        return;
    }

    const playerName = document.querySelector('#playerName').value;
    const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        name: document.querySelector('#playerName').value
    }

    console.log('transmitir:' + data);
    SOCKET.emit('position', data)

}

const initializeMapPosition = position => {
    MAP.setView([position.coords.latitude, position.coords.longitude], 13);
}

const MAP = L.map('map').setView([51.505, -0.09], 13);
let PLAYER_MARKER = null;
let SOCKET = io();

SOCKET.on('position', data => {

    console.log('data', data)
})

initializeMap(MAP);
navigator.geolocation.getCurrentPosition(initializeMapPosition);

setInterval(() => {
    navigator.geolocation.getCurrentPosition(updatePosition);
    console.log('posición actualizada')
}, 3000)



const start = e => {
    SEND_TO_SERVER = true;
}