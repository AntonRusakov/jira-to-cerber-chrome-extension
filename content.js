function addCopyButtons() {
    const ticketNumberElement = document.querySelector('li a[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"] span');
    const ticketTitleElement = document.querySelector('h1[data-testid="issue.views.issue-base.foundation.summary.heading"]');
    let actionsWrapper = document.querySelector('div[data-testid="issue-view-ecosystem.ecosystem-actions-wrapper"]');
    let withButtonMargins = true;
    if (!actionsWrapper) {
        const buttonElement = document.querySelector('button[data-testid="issue-view-foundation.quick-add.quick-add-items-compact.add-button-dropdown--trigger"]');
        if (buttonElement) {
            actionsWrapper = buttonElement.parentElement.parentElement;
            withButtonMargins = false;
        }
    }

    if (ticketNumberElement && ticketTitleElement && actionsWrapper) {
        const ticketNumber = ticketNumberElement.innerText;
        const ticketTitle = ticketTitleElement.innerText;
        const formattedTitle = formatTicketTitle(ticketTitle);
        const textToCopy1 = `${ticketNumber} - ${ticketTitle}`;
        const textToCopy2 = `${ticketNumber}-${formattedTitle}`;
        const textToCopy3 = `#${ticketNumber} - ${ticketTitle}`;

        const copyButton1 = createCopyButton(`${textToCopy2}\n${textToCopy1}`, 'Copy Ticket Info', 'Copy for Credibly branch and commit');
        const copyButton2 = createCopyButton(textToCopy3, 'Copy Formatted Ticket Info', 'Copy for Cerber', true);

        const buttons = [
            {button: copyButton1},
            {button: copyButton2}
        ];

        getSettings().then(settings => {

            let buttonsAdded = !!document.querySelector('div.custom-button');
            if (buttonsAdded) {
                return;
            }

            const categories = [
                {name: 'Development', id: settings.development_category_id},
                {name: 'Analysis', id: settings.analysis_category_id},
                {name: 'Meeting', id: settings.meeting_category_id},
                {name: 'Bug Fixing', id: settings.bug_fixing_category_id}
            ];

            categories.forEach(category => {
                const sendRequestButton = createSendRequestButton(ticketNumber, textToCopy3, '/timers/create', category.name, category.id);
                buttons.push({button: sendRequestButton});
            });

            buttons.forEach((item, index) => {
                const wrapperDiv = document.createElement('div');
                wrapperDiv.role = 'presentation';
                wrapperDiv.classList.add('custom-button');
                wrapperDiv.appendChild(item.button);
                if (withButtonMargins) {
                    if (index === 0 || index === 2) {
                        wrapperDiv.style.marginLeft = '16px';
                    }
                }
                actionsWrapper.appendChild(wrapperDiv);
            });

        }).catch(error => console.error('Error fetching settings:', error));
    } else {
        console.log("Required elements not found");
    }
}

function observeDomChanges() {
    const targetNode = document.body;
    const config = {childList: true, subtree: true};

    const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
            const buttonsAdded = !!document.querySelector('div.custom-button');
            if (
                mutation.type === 'childList'
                && (document.querySelector('div[data-testid="issue-view-ecosystem.ecosystem-actions-wrapper"]') ||
                    document.querySelector('button[data-testid="issue-view-foundation.quick-add.quick-add-items-compact.add-button-dropdown--trigger"]'))
                && !buttonsAdded
            ) {
                setTimeout(() => {
                    addCopyButtons();
                }, 100);
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

observeDomChanges();