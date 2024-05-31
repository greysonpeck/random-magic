let data = [];

async function getRandomLegend() {
  // gets the response from the api and put it inside a constant
  const response = await fetch(
    "https://api.scryfall.com/cards/random?q=is%3Acommander"
  );
  //the response have to be converted to json type file, so it can be used
  const data = await response.json();
  //the addData adds the object "data" to an array
  addData(data);
}

function addData(object) {
  // the push method add a new item to an array
  // here it will be adding the object from the function getRandomUser each time it is called
  data.push(object);
  //the fetched data is available only on this scope
  console.log("This is the value of date inside the function addData:");
  console.log(data[0].name);
}

//Calls the function that fetches the data
getRandomLegend();

console.log("This is the value of data outside the scope");
console.log(data);

// window.addEventListener(
//   "load",
//   function () {
//     const paraPara = document.getElementById("test-para");
//     paraPara.innerHTML = "fuck";
//     const commanderHeader = document.getElementById("commander-name");
//     // commanderHeader.innerHTML = data[0];
//     console.log("trying to read it:");
//     console.log(data[7]);
//   },
//   false
// );

console.log("trying to read it AGAIN:");
console.log(data);
