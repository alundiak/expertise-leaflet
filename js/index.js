// 
// JavaScript code to get Frontend Expertize data and show as CSS Grid
// 
// import from './components.js'; // TODO

const apiUrl = 'https://api.github.com/graphql';
const initialDataJson = '../data/expertise_tools.json';
const snapshotDataJson = '../data/snapshot.json';

function createRepositoriesQueryBody(myData) {
  let fragmentString = `
        fragment repositoryFragment on Repository {
            name
            nameWithOwner
            owner {
                avatarUrl
            }
            homepageUrl
            url
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
})();
