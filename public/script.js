const fetchData = async () => {
  const api = localStorage.getItem("apiUrl");
  console.log(api);
  if (api) {
    const response = await fetch(`${api}/users`);
    const data = await response.json();
    console.log(data);
  } else {
    window.location.href = "/api";
  }
};

fetchData();
