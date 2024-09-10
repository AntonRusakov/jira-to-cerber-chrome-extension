function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard: " + text);
        highlightButton(button);
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
}

function highlightButton(button) {
    button.classList.add('button-highlight');
    setTimeout(() => {
        button.classList.remove('button-highlight');
    }, 500);
}

function highlightButtonWithError(button) {
    button.classList.add('button-error');
    setTimeout(() => {
        button.classList.remove('button-error');
    }, 500);
}

function highlightButtonInProgress(button) {
    button.classList.add('button-in-progress');
}

function highlightButtonCompleted(button) {
    button.classList.remove('button-in-progress');
}

function formatTicketTitle(title) {
    return title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-');
}

function createCopyButton(textToCopy, buttonLabel, tooltip, withC = false) {
    const copyButton = document.createElement('button');
    copyButton.ariaLabel = buttonLabel;
    copyButton.className = 'css-1078jy css-1l34k60';
    copyButton.type = 'button';
    copyButton.style.width = '32px';
    copyButton.style.height = '32px';
    copyButton.style.border = '0';
    copyButton.style.marginLeft = '8px';
    copyButton.style.padding = '6px';
    copyButton.style.display = 'flex';
    copyButton.style.alignItems = 'center';
    copyButton.style.justifyContent = 'center';
    copyButton.tabIndex = 0;
    copyButton.title = tooltip;

    copyButton.innerHTML = withC ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          <text x="15" y="19" text-anchor="middle" fill="currentColor" font-size="10" font-family="Arial, sans-serif">C</text>
        </svg>
      ` : `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;

    copyButton.addEventListener('click', () => {
        copyToClipboard(textToCopy, copyButton);
    });

    return copyButton;
}
