const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const getAllMedia = () => {
  return fetch(apiUrl + 'media/').then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + 'media/' + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
};

const getSingleMedia = (id) => {
  return fetch(apiUrl + 'media/' + id).then(response => {
    return response.json();
  }).then(json => {
    return json;
  });
};

const login = (username, password) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password}),
  };
  return fetch(apiUrl + 'login', settings).then(response => {
    return response.json();
  }).then(json => {
    return json;
  });
};

export {getAllMedia, getSingleMedia, login};