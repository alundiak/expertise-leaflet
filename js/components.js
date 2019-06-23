'use strict';
import { fixUp, sortByName } from './utils.js';

// TODO extract Custom Element code and fix async/await issue

(async () => {
    const snapshotDataJson = 'data/snapshot.json'; // works ok on github-pages.
    // https://raw.githubusercontent.com/alundiak/expertise-leaflet/master/data/snaphost.json

    const gitHubData = await fetch(snapshotDataJson).then(response => response.json());
    const resultsData = gitHubData.data;
    const parsedData = [];

    const projects = {
        backbone: 10,
        marionette: 8,
        react: 5,
        'react-native': 1,
        angular: 3
    };

    for (const field in resultsData) {
        let repo = resultsData[field];
        // let owner = repo.nameWithOwner.split('/')[0];

        let {
            name, avatarUrl
        } = fixUp(resultsData[field].name, repo.owner.avatarUrl);

        // maybe
        let projectsCount = projects[name];

        parsedData.push({
            name,
            avatarUrl,
            projectsCount
        });
    }

    parsedData.sort(sortByName); // and so "alphabet" idea implements.

    //
    // Taken from https://github.com/mdn/web-components-examples/blob/master/editable-list/main.js
    // First idea was to have class outside of async function,
    // but this only one way Custom WebComponents properly works with async/await-ed data
    //

    const componentCssUrl = 'css/expertise_leaflet.css';

    class ExpertiseLeaflet extends HTMLElement {
        constructor(options) {
            // console.log(options); // passed from new ()
            // establish prototype chain
            super();

            // attaches shadow tree and returns shadow root reference
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
            const shadow = this.attachShadow({
                mode: 'open'
            });

            // creating a container for the editable-list component
            const listContainer = document.createElement('ul');

            // get attribute values from getters
            const title = this.title;
            const listItems = this.listItems;

            // adding a class to our container for the sake of clarity
            listContainer.classList.add('listing');

            let strLI = listItems.map(item => `
            <li title="${item.projectsCount || 'x'} projects">
                <div class="body">
                    <img src="${item.avatarUrl}">
                </div>
                <div class="expertise-name">${item.name}</div>
            </li>`).join('');

            // <h3>${item.name}</h3>

            // creating the inner HTML of the editable list element
            listContainer.innerHTML = `
            <link rel="stylesheet" type="text/css" href="${componentCssUrl}">
            ${strLI}
            `;

            // appending the container to the shadow DOM
            shadow.appendChild(listContainer);
        }

        get title() {
            return this.getAttribute('title') || '';
        }

        get listItems() {
            return parsedData;
        }
    }

    customElements.define('expertise-leaflet', ExpertiseLeaflet);

})();
