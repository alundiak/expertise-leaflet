'use strict';

function fixUp(name, avatarUrl) {
  if (name === 'backbone.marionette') {
    name = 'marionette';
  }

  if (name === 'backbone') {
    avatarUrl = 'https://humancoders-formations.s3.amazonaws.com/uploads/course/logo/64/thumb_bigger_formation-backbone-js.png';
  }

  if (name === 'underscore') {
    avatarUrl = 'https://images-platform.99static.com/WG4uXLVV_iftAlJttXgvXgU6th0=/500x500/top/smart/99designs-contests-attachments/12/12583/attachment_12583422'
  }

  if (name === 'react') {
    avatarUrl = 'https://cdn-images-1.medium.com/max/1600/1*6kK9j74vyOmXYm1gN6ARhQ.png'
  }

  if (name === 'react-native') {
    avatarUrl = 'https://www.secret-source.eu/wp-content/uploads/2017/11/react-native-logo.jpg'
  }  

  if (name === 'handlebars.js') {
    avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxH7fJHOirzp24iUFvIUToQvP3fZzzqa61QGNLpGNbaTnOwo9'
  }

  if (name === 'phantomjs') {
    avatarUrl = 'https://pbs.twimg.com/profile_images/1884362265/phantomjs_400x400.png'
  }  

  if (name === 'jest') {
    avatarUrl = 'https://camo.githubusercontent.com/f6414ee20933d5fb8b06dc32ed38c8aa175da559/687474703a2f2f64702e68616e6c6f6e2e696f2f3331337933753244307033382f6a6573742e706e67'
  }

  return {
    name,
    avatarUrl
  }
}

function sortByName(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}


(async() => {

  const componentCssUrl = 'css/expertise_leaflet.css';
  const snapshotDataJson = 'data/snapshot.json';
  // https://raw.githubusercontent.com/alundiak/expertise-leaflet/master/data/snaphost.json

  const gitHubData = await fetch(snapshotDataJson).then(response => response.json());
  const resultsData = gitHubData.data;
  var parsedData = [];

  const projects = {
    backbone: 10,
    marionette: 8,
    react: 5,
    'react-native': 1,
    angular: 3
  }

  for (const field in resultsData) {
    let repo = resultsData[field];
    let owner = repo.nameWithOwner.split('/')[0];
    
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
        <li title="${item.projectsCount || "x"} projects">
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
