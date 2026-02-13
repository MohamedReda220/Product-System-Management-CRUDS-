let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

let mood='creat';
let spear;

// نخلي dataPro متغير عام عشان showData تشوفه
let dataPro;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

// get total
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.style.background = 'red';
    }
}

// create product
submit.onclick = function(){
   
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    // dataPro.push(newPro);
    localStorage.setItem("product", JSON.stringify(dataPro));
if(mood==='creat'){

if(newPro.count>1){

 for(let x=0;x<newPro.count;x++){

        dataPro.push(newPro)
    }
}else{
dataPro.push(newPro)
}

}else{

  dataPro[ spear ]=newPro

count.style.display='block'
submit.innerHTML='Creat'
}


   total.innerHTML='0'

    clearInputs();
    showData();
}

// clear inputs
function clearInputs(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}

// read
function showData(){
    let table = "";

    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
    
    let btnDelete = document.getElementById("btnDelete");

    if(dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
        btnDelete.innerHTML = "";
    }
}

showData();


// delete

function deleteData(i){

dataPro.splice(i,1)
localStorage.product=JSON.stringify(dataPro)
showData()

}


function deleteAll(){

    localStorage.clear();
    dataPro.splice(0)
    showData()
 
}




// update
function updateData(i){

    title.value=dataPro[i].title
    price.value=dataPro[i].price
    taxes.value=dataPro[i].taxes
    ads.value=dataPro[i].ads
    discount.value=dataPro[i].discount
    category.value=dataPro[i].category

count.style.display='none'

submit.innerHTML='Update'
scroll({
    top:0,
    behavior:"smooth"
})

mood='update'
 
spear=i;
    getTotal()

}


// search

let searchMood='title'

let search=document.getElementById('Search')

function getSearchMood(id){

if(id=="SearchTitel"){
searchMood='title'
search.placeholder='search By Titel'

}else{
searchMood='category'
search.placeholder='search By Category'
}
search.focus()
search.value=''
showData()
}

function searchData(value){
      let table = "";

if(searchMood=='title'){

    for(let i=0;i<dataPro.length;i++){

        if(dataPro[i].title.includes(value.toLowerCase())){




             table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;




        }


    }
}else{


 for(let i=0;i<dataPro.length;i++){

        if(dataPro[i].category.includes(value.toLowerCase())){




             table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;



}

 
}

}

document.getElementById('tbody').innerHTML = table;
}
