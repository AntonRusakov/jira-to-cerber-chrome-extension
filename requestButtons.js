function createSendRequestButton(ticketNumber, ticketTitle, apiUrl, category, categoryId) {
    const sendRequestButton = document.createElement('button');
    const buttonTitle = `Cerber - start ${category}`;
    sendRequestButton.title = buttonTitle;
    sendRequestButton.ariaLabel = buttonTitle;
    sendRequestButton.className = 'css-1078jy css-1l34k60';
    sendRequestButton.type = 'button';
    sendRequestButton.style.width = '32px';
    sendRequestButton.style.height = '32px';
    sendRequestButton.style.border = '0';
    sendRequestButton.style.marginLeft = '8px';
    sendRequestButton.style.padding = '6px';
    sendRequestButton.style.display = 'flex';
    sendRequestButton.style.alignItems = 'center';
    sendRequestButton.style.justifyContent = 'center';
    sendRequestButton.tabIndex = 0;

    let svgIcon;
    switch (category) {
        case 'Analysis':
            svgIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                  <path d="m22 20.59-4.69-4.69C18.37 14.55 19 12.85 19 11c0-4.42-3.58-8-8-8-4.08 0-7.44 3.05-7.93 7h2.02C5.57 7.17 8.03 5 11 5c3.31 0 6 2.69 6 6s-2.69 6-6 6c-2.42 0-4.5-1.44-5.45-3.5H3.4C4.45 16.69 7.46 19 11 19c1.85 0 3.55-.63 4.9-1.69L20.59 22z"></path><path d="M8.43 9.69 9.65 15h1.64l1.26-3.78.95 2.28h2V12h-1l-1.25-3h-1.54l-1.12 3.37L9.35 7H7.7l-1.25 4H1v1.5h6.55z"></path>
                </svg>
              `;
            break;
        case 'Development':
            svgIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4m13.1-8.16c.01-.11.02-.22.02-.34 0-.12-.01-.23-.03-.34l.74-.58c.07-.05.08-.15.04-.22l-.7-1.21c-.04-.08-.14-.1-.21-.08l-.86.35c-.18-.14-.38-.25-.59-.34l-.13-.93c-.02-.09-.09-.15-.18-.15h-1.4c-.09 0-.16.06-.17.15l-.13.93c-.21.09-.41.21-.59.34l-.87-.35c-.08-.03-.17 0-.21.08l-.7 1.21c-.04.08-.03.17.04.22l.74.58c-.02.11-.03.23-.03.34 0 .11.01.23.03.34l-.74.58c-.07.05-.08.15-.04.22l.7 1.21c.04.08.14.1.21.08l.87-.35c.18.14.38.25.59.34l.13.93c.01.09.08.15.17.15h1.4c.09 0 .16-.06.17-.15l.13-.93c.21-.09.41-.21.59-.34l.87.35c.08.03.17 0 .21-.08l.7-1.21c.04-.08.03-.17-.04-.22zm-2.6.91c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25m.42 3.93-.5-.87c-.03-.06-.1-.08-.15-.06l-.62.25c-.13-.1-.27-.18-.42-.24l-.09-.66c-.02-.06-.08-.1-.14-.1h-1c-.06 0-.11.04-.12.11l-.09.66c-.15.06-.29.15-.42.24l-.62-.25c-.06-.02-.12 0-.15.06l-.5.87c-.03.06-.02.12.03.16l.53.41c-.01.08-.02.16-.02.24 0 .08.01.17.02.24l-.53.41c-.05.04-.06.11-.03.16l.5.87c.03.06.1.08.15.06l.62-.25c.13.1.27.18.42.24l.09.66c.01.07.06.11.12.11h1c.06 0 .12-.04.12-.11l.09-.66c.15-.06.29-.15.42-.24l.62.25c.06.02.12 0 .15-.06l.5-.87c.03-.06.02-.12-.03-.16l-.52-.41c.01-.08.02-.16.02-.24 0-.08-.01-.17-.02-.24l.53-.41c.05-.04.06-.11.04-.17m-2.42 1.65c-.46 0-.83-.38-.83-.83 0-.46.38-.83.83-.83s.83.38.83.83c0 .46-.37.83-.83.83M4.74 9h8.53c.27 0 .49-.22.49-.49v-.02c0-.27-.22-.49-.49-.49H13c0-1.48-.81-2.75-2-3.45v.95c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.14C9.68 4.06 9.35 4 9 4s-.68.06-1 .14V5.5c0 .28-.22.5-.5.5S7 5.78 7 5.5v-.95C5.81 5.25 5 6.52 5 8h-.26c-.27 0-.49.22-.49.49v.03c0 .26.22.48.49.48M9 13c1.86 0 3.41-1.28 3.86-3H5.14c.45 1.72 2 3 3.86 3"></path>
                </svg>
              `;
            break;
        case 'Meeting':
            svgIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29M20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3"></path>
                </svg>
              `;
            break;
        case 'Bug Fixing':
            svgIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                    <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20zm-6 8h-4v-2h4zm0-4h-4v-2h4z"></path>
                </svg>
              `;
            break;
        default:
            svgIcon = '';
    }

    sendRequestButton.innerHTML = svgIcon;

    sendRequestButton.addEventListener('click', async () => {
        try {
            highlightButtonInProgress(sendRequestButton);
            const token = await fetchToken();

            const currentTime = new Date().toISOString();

            const settings = await getSettings();
            const ticketShortcode = ticketNumber?.split('-')?.[0];
            const projectId = settings.projectMappings.find(
                mapping => window.location.hostname.includes(mapping.subdomain) && ticketShortcode === mapping.shortcode
            )?.project_id;
            if (!projectId) {
                console.error(`Can't find project for subdomain: ${getFirstPartOfHostname()} and shortcode: ${ticketShortcode}. Please check settings`);
                highlightButtonWithError(sendRequestButton);
                return;
            }

            const selectedLocation = settings.selectedLocation;

            const taskId = await getTaskId(token, projectId, ticketNumber);

            const requestBody = {
                title: ticketTitle,
                project: projectId,
                category: categoryId,
                type: selectedLocation || 'WFH',
                start: currentTime
            };

            if (taskId) {
                requestBody.task = taskId;
            }

            const response = await sendRequest(apiUrl, 'POST', {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Token': token,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
            }, requestBody);

            console.log('response', response);

            highlightButtonCompleted(sendRequestButton);
            if (response.success) {
                highlightButton(sendRequestButton);
            } else {
                highlightButtonWithError(sendRequestButton);
            }
        } catch (error) {
            console.error('Error:', error);
            highlightButtonWithError(sendRequestButton);
        } finally {
            highlightButtonCompleted(sendRequestButton);
        }
    });

    return sendRequestButton;
}

function getFirstPartOfHostname() {
    const hostname = window.location.hostname;
    const parts = hostname.split('.atlassian.net');
    return parts[0];
}
