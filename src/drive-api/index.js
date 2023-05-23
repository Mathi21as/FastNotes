import { gapi } from 'gapi-script';

const CLIENT_ID = '65688372327-c28ea7dvlcqpu6sc3q522v1j1f3daohn.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAiLD3cnTs1seV1m43yKh7KzDUimyUnUxQ';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive';

const initClient = () => {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    })
}

export const isSigned = () => {
    const sign = gapi.auth2.getAuthInstance().isSignedIn.le;
    return sign;
}

export const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
}

export const handleSignin = () => {
    gapi.auth2.getAuthInstance().signIn();
}

export const handleSignout = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        window.location.reload();
    });
    auth2.disconnect();
}