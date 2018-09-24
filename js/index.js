// 
// JavaScript code to get Frontend Expertize data and show as CSS Grid
// 

const apiUrl = 'https://api.github.com/graphql';
const initialDataJson = '../data/expertize_tools.json';
const snapshotDataJson = '../data/snapshot.json';

function createRepositoriesQueryBody(myData) {
  let fragmentString = `
        fragment repositoryFragment on Repository {
            name
            nameWithOwner
            owner {
                avatarUrl
            }
        }
    `;

  let strings = [];

  // if myData is instanceof Array
  myData.forEach(function(repo, index) {
    let lineTemplate = `repo${++index}: repository(owner: "${repo.owner}", name: "${repo.name}") { ...repositoryFragment }`;
    strings.push(lineTemplate);
  });

  let queryString = `
        {
            ${strings.join('\n')}
        }
    `;

  let queryBody = fragmentString + queryString;

  return queryBody;
}

customElements.define('expertize-list',
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

customElements.define('expertize-item',
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

function renderList(resultsData) {
  // if resultsData is instanceof Object
  for (const field in resultsData) {
    let repo = resultsData[field];
    let name = resultsData[field].name; // TODO: capitalize()
    let owner = repo.nameWithOwner.split('/')[0];
    let url = repo.owner.avatarUrl;

    let listItem = `
      <li>
          <h2>${name}</h2>
          <div class="body">
              <p></p>
              <img src="${url}">
          </div>
          <div class="cta"><a href="">Call to action!</a></div>
      </li>`;

    console.log(listItem);
    // const list = document.querySelector('.listing');
    // let liElement = document.createElement(listItem);
    // list.append(liElement);

    // strings.push(listItem);
  }

}

async function fetchRealData() {
  const reposData = await fetch(initialDataJson).then(response => response.json());
  console.log(reposData);

  let graphqlQuery = createRepositoriesQueryBody(reposData);
  console.log(graphqlQuery);

  return reposData;
}

async function fetchSnapshotData() {
  const reposData = await fetch(snapshotDataJson).then(response => response.json());
  // console.log(reposData);
  return reposData.data;
}

(async() => {
  'use strict';

  // const data = await fetchRealData();
  const data = await fetchSnapshotData();
  console.log(data);
  renderList(data);
})();
