$(document).foundation()
let configApiUrl = 'https://api.spoonacular.com/recipes/complexSearch?';
let enterText;
let allData = [];
let resultDiv = document.getElementById('results-div');

function findRecipe()
{
    if(document.getElementById('txtSearch').value !== "")
    enterText = document.getElementById('txtSearch').value;

let APIKey = 'apiKey=8894628f29f7420cb7bbe58642a9456b';

let getURL = configApiUrl + APIKey + "&query=" + enterText

fetch(getURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
    if(data.results.length > 0)
        {

        allData = data.results;
         console.log(data)
          
         customDOM(); 
        } 
        else
        {
            resultDiv.innerHTML = 'Item does not exist';
        }
    });
}

function customDOM()
{
    resultDiv.innerHTML= '';
	for (let i = 0; i < allData.length; i++)

	{
    let img = document.createElement("img");
    let div = document.createElement("div");
	div.innerHTML += '<img class="img-fluid" src="'+allData[i].image+'">';
    div.innerHTML +='<h4> <a href="javascript:void(0);" onclick="goToSourceURL('+ allData[i].id+');">' + allData[i].title + ' </h4> </a>';
        
    resultDiv.appendChild(div)
    }

}
function orgURL(recipeID){
    console.log(recipeID);
    let url = "https://api.spoonacular.com/recipes/" + recipeID + '/information?apiKey=8894628f29f7420cb7bbe58642a9456b';
    console.log(url)
    fetch(url)
    .then(function(response) {
        return response.json();       
    })
    .then((data) => {
        window.open(data.sourceUrl, '_blank').focus();
    });
}