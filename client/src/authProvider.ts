// src/authProvider.ts
export default {
  login: ({ username, password }) => {
    const request = new Request('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include',
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          console.log(response.status);
          console.log("About to say Fuck");
          throw new Error("Fuck", response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem('token', token);
      });
  },

logout: () => {
  // Remove token from local storage
  localStorage.removeItem('token');

  // Make a request to the server to logout
  return fetch('http://localhost:3000/api/users/logout', {
    method: 'POST',
    credentials: 'include', // Make sure to include credentials to keep the session
  })
  .then(response => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error("Server logout failed");
    }
    return Promise.resolve();
  })
  .catch(error => {
    console.log("Logout failed: ", error);
    return Promise.reject();
  });
},

  checkError: () => Promise.resolve(),
  checkAuth: () => (localStorage.getItem('token') ? Promise.resolve() : Promise.reject()),
  getPermissions: () => Promise.resolve(),
};
