import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);
  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function getFiles() {
  return request({
    url: API_BASE_URL + "/user-files",
    method: "GET",
  });
}

export function downloadFile(internalFileRef) {
  const url = API_BASE_URL + "/files/ref?file=" + internalFileRef;

  return fetch(url, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", internalFileRef);
      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
}

export function uploadFile(file, path, onUploadProgress) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);

  const headers = new Headers({
    Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
  });

  const defaults = { headers: headers };
  let options = {
    method: "POST",
    body: formData,
  };
  options = Object.assign({}, defaults, options);
  return fetch(API_BASE_URL + "/files", options).then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response;
  });
}
