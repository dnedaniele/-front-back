// Article List

/* const productList = [
    {
      title : "First Article",
      image: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
          {
      name : "Second Article",
      image: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
   
  ] */




//Render Articles

function renderArticle(article) {  // renderJson Data
  const articleContainer = document.createElement("div");
  articleContainer.style.display = "flex";
  articleContainer.style.flexDirection = "column";
  //title
  const title = document.createElement("h1");
  title.innerHTML = title.text;
  //paragraph
  const paragraph = document.createElement("p");
  paragraph.innerHTML = paragraph.text;

  articleContainer.appendChild(title);
  articleContainer.appendChild(paragraph);

  document.getElementById("prod-list-cont").appendChild(articleContainer);
}

// Fetch from Server

fetch("http://localhost:3500/test", {
    method: "get",
    mode: "cors"
  } ).then((response) => {
    console.log(response)
    return response.json()
    
  }).then((jsonData) => {

      console.log("jsonData", jsonData)
    });

    renderArticle(jsonData); 