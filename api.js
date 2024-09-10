function sendRequest(url, method, headers, body) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({action: "sendRequest", url, method, headers, body}, (response) => {
            if (response && response.success) {
                resolve(response);
            } else {
                reject(response ? response.error : 'No response from background script');
            }
        });
    });
}

async function getTaskId(token, projectId, query) {
    const url = `/projects/tasks/search?project=${projectId}&query=${query}`;
    const response = await sendRequest(url, 'GET', {
        'Accept': 'application/json, text/plain, */*',
        'X-Token': token
    });
    if (response.success && response?.data?.total === 1) {
        return response.data.content[0].id;
    }
    return null;
}

function fetchToken() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({action: "fetchToken"}, (response) => {
            if (response && response.success) {
                resolve(response.token);
            } else {
                console.error('Error fetching token:', response.message);
                reject(response ? response.message : 'No response from background script');
            }
        });
    });
}

function getSettings() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({action: "getSettings"}, (response) => {
            if (response) {
                resolve(response);
            } else {
                reject('Failed to retrieve settings');
            }
        });
    });
}
