console.log("Client side loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const mesOne = document.querySelector("#mes-1");
const mesTwo = document.querySelector("#mes-2");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  fetch(
    `http://localhost:3000/weather?address=${encodeURIComponent(search.value)}`
  ).then(response => {
    response.json().then(data => {
      if (data.error) {
        mesOne.textContent = data.error;
        mesTwo.textContent = "";
      } else {
        mesOne.textContent = data.location;
        mesTwo.textContent = data.forecast;
      }
    });
  });
});

//TextContent
