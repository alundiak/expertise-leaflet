'use strict';

(async() => {

  const componentCssUrl = 'css/expertise_leaflet.css';
  const snapshotDataJson = '../data/snapshot.json';

  const gitHubData = await fetch(snapshotDataJson).then(response => response.json());
  const resultsData = gitHubData.data;
  var parsedData = [];

  for (const field in resultsData) {
    let repo = resultsData[field];
    let name = resultsData[field].name; // TODO: capitalize()
    let owner = repo.nameWithOwner.split('/')[0];
    let url = repo.owner.avatarUrl;

    parsedData.push({
      name: resultsData[field].name,
      avatarUrl: repo.owner.avatarUrl,
      projectsCount: '' // TODO somehow :)
    });
  }

  //
  // Taken from https://github.com/mdn/web-components-examples/blob/master/editable-list/main.js
  // First idea was to have class outside of async function, 
  // but this only one way Custom WebComponents properly works with async/await-ed data
  // 
  class ExpertisesLeaflet extends HTMLElement {
    constructor() {
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
        <li>
            <h2>${item.name}</h2>
            <div class="body">
                <p></p>
                <img src="${item.avatarUrl}">
            </div>
            <div class="cta">${item.projectsCount || "x"} projects</div>
        </li>`).join('');

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

  customElements.define('expertises-leaflet', ExpertisesLeaflet);

  // REMOVE LATER
  customElements.define('expertise-list',
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById('listTemplate');
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({
            mode: 'open'
          }) // so we create shadow DOM and
          .appendChild(templateContent.cloneNode(true)); // append with cloned content
      }
    })

  // REMOVE LATER
  customElements.define('expertise-item',
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById('listItemTemplate');
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({
            mode: 'open'
          }) // so we create shadow DOM and
          .appendChild(templateContent.cloneNode(true)); // append with cloned content
      }
    })

})();
