const LOCAL_PORT = 8888;
const LOCAL_FRONT = 3000;

const clientHostName = window.location.hostname;

let backendHostName;
let frontendHostName;

if (clientHostName === "localhost") {
    backendHostName = "http://localhost:" + LOCAL_PORT;
    frontendHostName = "http://localhost:" + LOCAL_FRONT;
} else {
    // backendHostName = 'http://43.203.105.27:8888';
    // frontendHostName = "http://doggle.kr";
}

const API_BASE_URL = backendHostName;
const APP_BASE_URL = frontendHostName;

// const ROOM = "/room";

export const BASE_URL = API_BASE_URL;
// export const ROOM_URL = API_BASE_URL + ROOM;