const bing_api_endpoint = "https://api.bing.microsoft.com/v7.0/images/search";
const bing_api_key = BING_API_KEY

function runSearch() {

  document.getElementById("resultsImageContainer").innerHTML = "";

  openResultsPane();

  let q = document.getElementById("searchbartext").value;
  let query = `${bing_api_endpoint}?q=${q}`;
  let request = new XMLHttpRequest();
  
  request.open("GET", query);
  request.setRequestHeader("Ocp-Apim-Subscription-Key", bing_api_key);

  request.responseType = "json";

  request.onload = function(event) {
    
    if (event.target.status == 200) {

      let response = event.target.response;
    

      let imgcontainer = document.getElementById("resultsImageContainer");
      let suggestions = document.getElementById("suggestions_list");

      images = response.value
      suggestedSearches = response.relatedSearches

      suggestedSearches.forEach(listItem => {
        console.log(listItem.text)
        let listObject = document.createElement("li");
        listObject.textContent = listItem.text
        listObject.addEventListener("click", runSearch);

        suggestions.appendChild(listObject);
      });

      images.forEach(image => {
        let img = document.createElement("img");
        img.setAttribute("src", image.thumbnailUrl);
        img.addEventListener("click", addtoMoodBoard);


        imgcontainer.appendChild(img);
      });
    } else {
      console.log("Theres an error");
    } 
  }

  function addtoMoodBoard (e) {

    let moodboard = document.getElementById("board");
    let img = document.createElement("img");
    
    img.setAttribute("src", e.target.getAttribute("src")); 
  
    moodboard.appendChild(img);
  }


  request.send();

  return false;  // Keep this; it keeps the browser from sending the event
                  // further up the DOM chain. Here, we don't want to trigger
                  // the default form submission behavior.
}


function openResultsPane() {
  // This will make the results pane visible.
  document.querySelector("#resultsExpander").classList.add("open");
}

function closeResultsPane() {
  // This will make the results pane hidden again.
  document.querySelector("#resultsExpander").classList.remove("open");
}

// This will 
document.querySelector("#runSearchButton").addEventListener("click", runSearch);
document.querySelector(".search input").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {runSearch()}
});

document.querySelector("#closeResultsButton").addEventListener("click", closeResultsPane);
document.querySelector("body").addEventListener("keydown", (e) => {
  if(e.key == "Escape") {closeResultsPane()}
});
