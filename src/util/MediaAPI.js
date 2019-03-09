const apiUrl = 'http://media.mw.metropolia.fi/wbma/media/';

const getAllMedia = () => {
  return fetch(apiUrl).then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
};

const getSingleMedia = (id) => {
  return fetch(apiUrl+id).then(response => {
    return response.json();
  }).then(json => {
    return json;
  });
};



export {getAllMedia, getSingleMedia};