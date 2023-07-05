const getURL = (endpoint) => {
  return `${process.env.REACT_APP_API}/${endpoint}`;
};

const postData = async (resource, body) => {
  const url = getURL(resource);
  const response = await fetch(url, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: new Headers({ 'content-type': 'application/json' })
  });

  if (response.status === 400 || response.status === 500)
    throw new Error('Ooops, spróbuj ponownie później!');

  return response;
};

const deleteData = async (endpoint) => {
  const url = getURL(endpoint);
  const response = await fetch(url, {
    method: 'delete',
    credentials: 'include'
  });

  if (response.status === 400 || response.status === 500)
    throw new Error('Ooops, spróbuj ponownie później!');

  return response;
};

const getData = async (endpoint) => {
  const url = getURL(endpoint);
  const response = await fetch(url, { method: 'get', credentials: 'include' });

  if (response.status === 400 || response.status === 500)
    throw new Error('Ooops, spróbuj ponownie później!');

  return response;
};

const putData = async (endpoint, body) => {
  const url = getURL(endpoint);
  const response = await fetch(url, {
    method: 'put',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: new Headers({ 'content-type': 'application/json' })
  });

  if (response.status === 400 || response.status === 500)
    throw new Error('Ooops, spróbuj ponownie później!');

  return response;
};

export { getData, putData, postData, deleteData };
