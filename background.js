const base_url = 'https://cerber.cpcs.ws/api/v1';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchToken") {
        chrome.storage.sync.get(['email', 'password'], (result) => {
            const { email, password } = result;
            fetch(`${base_url}/auth`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({ email, password })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        sendResponse({ success: true, token: data.token });
                    } else {
                        sendResponse({ success: false, message: 'Failed to fetch token' });
                    }
                })
                .catch(error => {
                    console.error('Error fetching token:', error);
                    sendResponse({ success: false, message: 'Failed to fetch token' });
                });
        });
        return true;
    } else if (request.action === "sendRequest") {
        fetch(`${base_url}/${request.url}`, {
            method: request.method,
            headers: {
                ...request.headers,
                'User-Agent': userAgent
            },
            body: JSON.stringify(request.body)
        })
            .then(response => response.json())
            .then(data => sendResponse({ success: true, data }))
            .catch(error => sendResponse({ success: false, error }));
        return true;
    } else if (request.action === "getSettings") {
        chrome.storage.sync.get(['analysis_category_id', 'development_category_id', 'meeting_category_id',
            'bug_fixing_category_id', 'projectMappings', 'selectedLocation'], (result) => {
            sendResponse(result);
        });
        return true;
    }
});

