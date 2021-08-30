import fetch from 'node-fetch';
import { config } from './create-jira-ticket.config.js';
import { issues } from './create-jira-ticket.issues.js';

const { uri, token } = config;

const promises = issues.map((issue) => {
  return fetch(`${uri}/rest/api/2/issue`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(issue),
  })
    // TODO 一旦投稿できればよいので後回し
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
});

// TODO 投稿確認できたか分かればよいので後回し
Promise.allSettled(promises)
  .then((results) => {
    results.forEach((result) => console.log(result.status));
  });
