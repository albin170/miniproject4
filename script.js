const container = document.getElementById("websiteContainer");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");

let allLinks = [];

fetch("links.json")
.then(res => res.json())
.then(data => {

allLinks = data;

displayLinks(allLinks);
loadCategories();

});

function displayLinks(links){

container.innerHTML="";

links.forEach(site=>{

const domain = new URL(site.url).hostname;

const icon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const card = document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${icon}">
<div>
<a href="${site.url}" target="_blank">${site.name}</a>
<p>${site.category}</p>
</div>

`;

container.appendChild(card);

});

}

function loadCategories(){

const categories=[...new Set(allLinks.map(i=>i.category))];

categories.forEach(cat=>{

const option=document.createElement("option");

option.value=cat;

option.textContent=cat;

categoryFilter.appendChild(option);

});

}

searchBox.addEventListener("input", filterLinks);

categoryFilter.addEventListener("change", filterLinks);

function filterLinks(){

const search=searchBox.value.toLowerCase();

const category=categoryFilter.value;

const filtered=allLinks.filter(site=>{

const matchSearch=site.name.toLowerCase().includes(search);

const matchCategory=category==="all" || site.category===category;

return matchSearch && matchCategory;

});

displayLinks(filtered);

}

document.getElementById("darkModeToggle").onclick=()=>{
document.body.classList.toggle("dark");
};
