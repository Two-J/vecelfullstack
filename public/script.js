const api = localStorage.getItem("apiUrl");

const fetchData = async () => {
  console.log(api);
  if (api) {
    const response = await fetch(`${api}/users`);
    const data = await response.json();
    // console.log(data);
  } else {
    window.location.href = "/api";
  }
};

const uploadFile = async () => {
  const input = document.querySelector("#fileupload");
  // console.log(input.files);
  const formdata = new FormData();
  const files = [...input.files];
  files.forEach((file) => {
    formdata.append("files", file);
  });
  console.log(files);
  const response = await fetch(`${api}/upload`, {
    method: "POST",
    body: formdata,
  });
  const data = await response.json();
  console.log(data);
};
fetchData();
