document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const analysisCategoryInput = document.getElementById('analysis_category_id');
    const developmentCategoryInput = document.getElementById('development_category_id');
    const meetingCategoryInput = document.getElementById('meeting_category_id');
    const bugFixingCategoryInput = document.getElementById('bug_fixing_category_id');
    const projectMappingsContainer = document.getElementById('projectMappings');
    const addMappingButton = document.getElementById('addMapping');
    const saveButton = document.getElementById('save');
    const locationInputs = document.querySelectorAll('input[name="location"]');

    function loadSettings() {
        chrome.storage.sync.get(['email', 'password', 'analysis_category_id', 'development_category_id',
            'meeting_category_id', 'bug_fixing_category_id', 'projectMappings', 'selectedLocation'], (result) => {
            if (result.email) emailInput.value = result.email;
            if (result.password) passwordInput.value = result.password;
            if (result.analysis_category_id) analysisCategoryInput.value = result.analysis_category_id;
            if (result.development_category_id) developmentCategoryInput.value = result.development_category_id;
            if (result.meeting_category_id) meetingCategoryInput.value = result.meeting_category_id;
            if (result.bug_fixing_category_id) bugFixingCategoryInput.value = result.bug_fixing_category_id;
            if (result.projectMappings) {
                projectMappingsContainer.innerHTML = '';
                result.projectMappings.forEach((mapping, index) => {
                    addProjectMapping(mapping.subdomain, mapping.shortcode, mapping.project_id, index);
                });
            }
            if (result.selectedLocation) {
                document.getElementById(result.selectedLocation).checked = true;
            }
        });
    }

    function saveSettings() {
        const email = emailInput.value;
        const password = passwordInput.value;
        const analysisCategoryId = analysisCategoryInput.value;
        const developmentCategoryId = developmentCategoryInput.value;
        const meetingCategoryId = meetingCategoryInput.value;
        const bugFixingCategoryId = bugFixingCategoryInput.value;
        const projectMappings = [...projectMappingsContainer.querySelectorAll('.project-mapping')].map(mapping => ({
            subdomain: mapping.querySelector('.subdomain').value,
            shortcode: mapping.querySelector('.shortcode').value,
            project_id: mapping.querySelector('.project_id').value
        }));
        const selectedLocation = [...locationInputs].find(input => input.checked).id;

        chrome.storage.sync.set({
            email, password, analysis_category_id: analysisCategoryId, development_category_id: developmentCategoryId,
            meeting_category_id: meetingCategoryId, bug_fixing_category_id: bugFixingCategoryId, projectMappings,
            selectedLocation
        }, () => {
            alert('Settings saved');
        });
    }

    function addProjectMapping(subdomain = '', shortcode = '', projectId = '', index = null) {
        const mappingDiv = document.createElement('div');
        mappingDiv.className = 'project-mapping';
        mappingDiv.innerHTML = `
          <div>
            <label>Jira Subdomain</label>
            <input type="text" class="subdomain" placeholder="cpcs" value="${subdomain}">
          </div>
          <div>
            <label>Jira Project Shortcode</label>
            <input type="text" class="shortcode" placeholder="cpcs" value="${shortcode}">
          </div>
          <div>
            <label>Cerber Project ID</label>
            <input type="text" class="project_id" placeholder="466" value="${projectId}">
          </div>
          <div>
            <label>&nbsp;</label>
            <button class="remove-mapping">X</button>
          </div>
        `;
        if (index !== null) {
            mappingDiv.dataset.index = index;
        }
        projectMappingsContainer.appendChild(mappingDiv);

        mappingDiv.querySelector('.remove-mapping').addEventListener('click', () => {
            mappingDiv.remove();
        });
    }

    addMappingButton.addEventListener('click', () => addProjectMapping());

    saveButton.addEventListener('click', saveSettings);

    loadSettings();
});
