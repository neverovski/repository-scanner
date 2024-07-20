export const RequestUtilMock = {
  github: {
    url: 'https://api.github.com/users/github',
    body: { login: 'github' },
    headers: { 'Content-Type': 'application/json' },
  },
  jsonplaceholder: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: { userId: 1, title: 'Title', body: 'Body' },
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  },
};
