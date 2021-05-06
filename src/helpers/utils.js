export function getFormBody(params) {
  let fromBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    fromBody.push(encodedKey + '=' + encodedValue);
  }

  return fromBody.join('&');
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
