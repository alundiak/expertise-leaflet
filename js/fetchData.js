//
// File designed to get data for Expertise Leaflet component.
//

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
    myData.forEach(function (repo, index) {
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

function fetchFromGitHub(reposData) {
    // Due to the fact of Behind The Code project stores in localStorage.
    const tokenValue = localStorage.getItem('userAccessToken');

    let graphqlQuery = createRepositoriesQueryBody(reposData);

    return fetch(apiUrl, {
        method: 'post',
        headers: {
            Authorization: `token ${tokenValue}`,
            'Content-Type': 'application/json'  // if provided, then OPTIONS + POST to avoid CORS.
        },
        body: JSON.stringify({
            query: graphqlQuery
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('ERROR', response);
            }
        })
        .then(({ data, errors }) => {
            if (errors && errors.length > 0) {
                console.log(errors[0].message, errors); // to attract attention
            }
            return data || {};
        });
}

async function fetchRealData() {
    const reposData = await fetch(initialDataJson).then(response => response.json());
    const gitHubData = await fetchFromGitHub(reposData);
    return gitHubData;
}

async function fetchSnapshotData() {
    const { data } = await fetch(snapshotDataJson).then(response => response.json());
    return data;
}

(async () => {
    'use strict';
    // const data = await fetchRealData();
    // const data = await fetchSnapshotData();
    // console.log(data);
})();