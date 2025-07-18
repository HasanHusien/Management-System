// // clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

function dat() {
  let datenow = new Date();
  let y = datenow.getFullYear();
  let m = datenow.getMonth() + 1;
  let d = datenow.getDate();
  let h = datenow.getHours();
  let mn = datenow.getMinutes();

  ff = `${y}/${m}/${d}/${h}:${mn}`;
  ads.value = ff;
}

//get totale
function gettotale() {
  if (price.value != "") {
    let result = +price.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "crimson";
  }
}
//get create prodact
let dataprodact;
if (localStorage.prodct != null) {
  dataprodact = JSON.parse(localStorage.prodct);
} else {
  dataprodact = [];
}
// submit or (create)
submit.onclick = function () {
  dat();

  let opjprodact = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ff,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 50 &&
    title.value.length <= 30 &&
    category.value.length <= 30 &&
    price.value.length <= 6 &&
    taxes.value.length <= 6 &&
    // ads.value.length <= 20 &&
    discount.value.length <= 5
  ) {
    if (mood === "create") {
      if (opjprodact.count > 1) {
        for (let i = 0; i < opjprodact.count; i++) {
          dataprodact.unshift(opjprodact);
        }
      } else {
        dataprodact.unshift(opjprodact);
      }
    } else {
      dataprodact[tmp] = opjprodact;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    cleardata();
  }

  //   //save localstorage
  localStorage.setItem("prodct", JSON.stringify(dataprodact));

  showdata();
};

// clear inputs
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  title.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// //read data in table
function showdata() {
  gettotale();
  let table = "";
  for (let i = 0; i < dataprodact.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataprodact[i].title}</td>
        <td>${dataprodact[i].price}</td>
        <td>${dataprodact[i].taxes}</td>
        <td>${dataprodact[i].discount}</td>
        <td>${dataprodact[i].category}</td>
        <td>${dataprodact[i].ads}</td>
        <td>${dataprodact[i].total}</td>
        <td><button  id="up" style="background:#08006b" onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndeleteall = document.getElementById("deleteall");
  if (dataprodact.length >= 10) {
    btndeleteall.innerHTML = `
        <button onclick="deleteall()">delete all (${dataprodact.length})</button>`;
  } else {
    btndeleteall.innerHTML = "";
  }
  //   gettotale();
}
showdata();

// //delete item
function deletedata(i) {
  console.log(i);
  dataprodact.splice(i, 1);
  localStorage.prodct = JSON.stringify(dataprodact);
  showdata();
}

//delete all
function deleteall() {
  let x = prompt("write password to delete products");
  if (x === "15") {
    localStorage.clear();
    dataprodact.splice(0);
  }
  showdata();
}

//update
function update(i) {
  title.value = dataprodact[i].title;
  price.value = dataprodact[i].price;
  taxes.value = dataprodact[i].taxes;
  ads.value = dataprodact[i].ads;
  discount.value = dataprodact[i].discount;
  gettotale();
  count.style.display = "none";
  category.value = dataprodact[i].category;
  submit.innerHTML = "update";
  mood = "updata";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  dat();
}

//search
let searchname = "title";

function getsearchneme(id) {
  let searchby = document.getElementById("search");
  if (id === "searchtitle") {
    searchname = "title";
  } else {
    searchname = "ctegory";
  }
  searchby.placeholder = "search by " + searchname;
  searchby.focus();
  searchby.value = "";
  showdata();
}

function searchdata(value) {
  let table = "";
  for (let i = 0; i < dataprodact.length; i++) {
    if (searchname === "title") {
      if (dataprodact[i].title.includes(value)) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${dataprodact[i].title}</td>
        <td>${dataprodact[i].price}</td>
        <td>${dataprodact[i].taxes}</td>
        <td>${dataprodact[i].discount}</td>
        <td>${dataprodact[i].category}</td>
        <td>${dataprodact[i].ads}</td>
        <td>${dataprodact[i].total}</td>
        <td><button style="background:#08006b" onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    } else {
      if (dataprodact[i].category.includes(value)) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${dataprodact[i].title}</td>
        <td>${dataprodact[i].price}</td>
        <td>${dataprodact[i].taxes}</td>
        <td>${dataprodact[i].discount}</td>
        <td>${dataprodact[i].category}</td>
        <td>${dataprodact[i].ads}</td>
        <td>${dataprodact[i].total}</td>
        <td><button style="background:#08006b" onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
