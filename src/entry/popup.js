import { createApp } from 'vue';
import App from '../view/popup.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

createApp(App).mount('#app');

const setBlock = async (status) => {
    await chrome.storage.local.set({ block: status });
}

const setRedirectURL = async (url) => {
    await chrome.storage.local.set({ redirectURL: url });
}

const startBlockListener = () => {
    chrome.runtime.sendMessage({ block: true }, (response) => {
        console.log(response);
    });
}

const stopBlockListener = () => {
    chrome.runtime.sendMessage({ block: false }, (response) => {
        console.log(response);
    });
}



export default {
    setBlock,
    setRedirectURL,
    startBlockListener,
    stopBlockListener
}