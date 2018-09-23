// 
// JavaScript code to get Frontend Expertize data and show as CSS Grid
// 

const apiUrl = 'https://api.github.com/graphql';

function createRepositoriesQueryBody(myData) {
    let fragmentString = `
        fragment repositoryFragment on Repository {
            name
            owner {
                avatarUrl
            }
        }
    `;

    let strings = [];
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

(async function() {
    'use strict';

    const data = await fetch('../data.json').then(response => response.json());
    console.log(data);

    let graphqlQuery = createRepositoriesQueryBody(data);
    console.log(graphqlQuery);

}());
