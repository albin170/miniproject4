const container = document.getElementById("websiteContainer");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const darkModeToggle = document.getElementById("darkModeToggle");

const categories = [
"Education",
"Programming",
"AI Tools",
"Design",
"Finance",
"Learning",
"Developer Tools",
"Online Utilities",
"Marketing",
"Productivity",
"SEO Tools",
"Cloud Services",
"Startup Tools",
"Analytics",
"Video Tools"
];

let allSites = [];


/* Generate 1200 websites */

categories.forEach(category => {

for(let i=1;i<=80;i++){

allSites.push({
name: `${category} Site ${i}`,
url: `https://example.com/${category.replace(/\s/g,'').toLowerCase()}/${i}`,
category: category
});

}

});


/* Load category filter */

categories.forEach(cat=>{

let option=document.createElement("option");

option.value=cat;
option.textContent=cat;

categoryFilter.appendChild(option);

});


displaySites(allSites);



function displaySites(sites){

container.innerHTML="";

let grouped={};

sites.forEach(site=>{

if(!grouped[site.category]) grouped[site.category]=[];

grouped[site.category].push(site);

});


Object.keys(grouped).forEach(category=>{

let section=document.createElement("div");

section.className="categorySection";

let title=document.createElement("h2");

title.textContent=category;

section.appendChild(title);

let grid=document.createElement("div");

grid.className="grid";


grouped[category].forEach(site=>{

const domain=new URL(site.url).hostname;

const icon=`https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

let card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${icon}">

<div>
<a href="${site.url}" target="_blank">${site.name}</a>
<p>${site.category}</p>
</div>

`;

grid.appendChild(card);

});


section.appendChild(grid);

container.appendChild(section);

});

}



/* Search + Filter */

function filterSites(){

let search=searchBox.value.toLowerCase();

let category=categoryFilter.value;

let filtered=allSites.filter(site=>{

let matchSearch=site.name.toLowerCase().includes(search);

let matchCategory=(category==="all"||site.category===category);

return matchSearch && matchCategory;

});

displaySites(filtered);

}

searchBox.addEventListener("input",filterSites);

categoryFilter.addEventListener("change",filterSites);



/* Dark Mode */

darkModeToggle.onclick=()=>{

document.body.classList.toggle("dark");

};
