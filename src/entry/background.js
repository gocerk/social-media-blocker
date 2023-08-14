console.log('hello world background todo something~')

const blockedList = [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
    "https://www.tiktok.com/",
    "https://www.reddit.com/",
    "https://www.tiktok.com/",
    "https://web.snapchat.com/",
    "http://pinterest.com/",
    "https://www.linkedin.com/",
    "https://twitter.com/"
];

const listener = async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
        const { redirectURL } = await getRedirectURL();
        
        // if tab url startswith any of the blocked list
        if (blockedList.some((blockedURL) => tab.url.startsWith(blockedURL))) {
            chrome.tabs.update(tabId, { url: redirectURL ? redirectURL : 'https://www.youtube.com/watch?v=GChhRrU6BJU' });
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.block) {
        console.log('block');
        chrome.tabs.onUpdated.addListener(listener);
        console.log('listener added');
    } else {
        console.log('unblock');
        chrome.tabs.onUpdated.removeListener(listener);
        console.log('listener removed');
    }
    sendResponse('ok');
});

const getRedirectURL = async () => {
    const { redirectURL } = await chrome.storage.local.get(['redirectURL']);
    return { redirectURL };
};