"use strict"; //help browser to run in struct to eliminate some js silent errors by changing them to throw errors


$(document).on('click', '.pagination li', function () {
    $('.pagination li').removeClass('active');
    $(this).addClass('active');
  });

// admin product CRUD
const pageSize = 5;
let curPage = 1;

let deleteId = -1;
let updateId = -1;

let sortCol;
let sortAsc = false;
//let getAdminProductList = {};// Empty Object - Global Scope

//development APIs
const addAPI= 'http://localhost:8080/product/add';
const displayAPI = 'http://localhost:8080/product/all';
let productController = [];

function displayAdminProduct()
{


fetch(displayAPI)
    .then(response => response.json())// implied return
    .then(function(data) {
                   console.log("2. receive data")
                   console.log(data);
                   data.forEach(function (product, index) {


                       const itemObj = {
                           id: product.id,
                           category: product.category,
                           keywords: product.keywords,
                           name: product.name,
                           image1: product.image1,
                           img_credit_1: product.img_credit_1,
                           image2: product.image2,
                           img_credit_2: product.img_credit_2,
                           stock_count: product.stock_count,
                           price_unit: product.price_unit,
                           price_value: product.price_value,
                           summary: product.summary,
                           description: product.description

                      };
                       productController.push(itemObj);

                 });


                  console.log(productController);
                 renderAdminProductPage(productController);


               })
               .catch(function(error) {
                   console.log(error);
               });


}
document.addEventListener('DOMContentLoaded', init, false); // wait for the page to be loaded before calling init
//(3)  Display all products when user launch the product.html page
function renderAdminProductPage(prod, page) {

  curPage = page || curPage;

     let admindetails = "";
     let startIdx = (curPage - 1) * pageSize;
     let endIdx = startIdx + pageSize;
     let totalItems = productController.length;

     for (let i = startIdx; i < endIdx && i < totalItems; i++) {
         admindetails += `<tr>
             <td>

             </td>
             <td>${productController[i].name}</td>
             <td><img src="${productController[i].image1}" class="w-50"/></td>
             <td>${productController[i].stock_count}</td>
             <td>${productController[i].price_unit}</td>
             <td>$${productController[i].price_value}</td>
             <td>${productController[i].summary}</td>
             <td class="d-none">${productController[i].description}</td>
             <td>

                 <a href="#deleteProductModal" class="delete" data-toggle="modal" data-product-id=${productController[i].id}><i
                         class="material-icons" data-toggle="tooltip" title="Delete" onclick="getProductId(${productController[i].id})">&#xE872;</i></a>
             </td>
         </tr>`;
         console.log(productController[i].id);
     }

     document.querySelector("#productRow").innerHTML = admindetails;

     // Update pagination information
     let totalPages = Math.ceil(totalItems / pageSize);
     let startItem = Math.min((curPage - 1) * pageSize + 1, totalItems);
     let endItem = Math.min(startItem + pageSize - 1, totalItems);
     document.querySelector("#startIdx").textContent = startItem;
     document.querySelector("#endIdx").textContent = endItem;
     document.querySelector("#totalItems").textContent = totalItems;

     // Disable previous/next buttons if necessary
     document.querySelector("#prevButton").classList.toggle("disabled", curPage === 1);
     document.querySelector("#nextButton").classList.toggle("disabled", curPage === totalPages);

     // Update pagination links
     let pageLinks = "";
     for (let i = 1; i <= totalPages; i++) {
         pageLinks += `<li class="page-item ${curPage === i ? 'active' : ''}"><a href="#" class="page-link" onclick="renderAdminProductPage(productController, ${i})">${i}</a></li>`;
     }
     document.querySelector(".pagination").innerHTML = pageLinks;
           // listen for sort clicks
   document.querySelectorAll('#sortProduct thead tr th').forEach(t => {
     t.addEventListener('click', sort, false);
  });

} // end renderProductPage

// function to load the edit product modal
function loadEditProductModal(id) {
    updateId = id;
    console.log(updateId);


    // Assuming the product details are stored in an array called productController
    // and the index of the product to be updated is stored in the variable updateId

    document.getElementById("editPName").value = productController[updateId-1].name;
    document.getElementById("editPSum").value = productController[updateId-1].summary;
    document.getElementById("editPCat").value = productController[updateId-1].category;
    document.getElementById("editPImg").value = ""; // Assuming the image field is not directly populated, you may need to handle this separately
    document.getElementById("editPPrice").value = productController[updateId-1].price_value;
    document.getElementById("editPStk").value = productController[updateId-1].stock_count;
    document.getElementById("editPUnit").value = productController[updateId-1].price_unit;
    document.getElementById("editPKey").value = productController[updateId-1].keywords;
    document.getElementById("editPDesc").value = productController[updateId-1].description;

    }

// function to get the product id and pass it to the global variable deleteId
function getProductId(id) {
    console.log(id);
    deleteId = id;

  }

// delete product API
 function removeProduct() {
  console.log(deleteId);
const deleteAPI = `http://localhost:8080/product/` + deleteId;

  fetch(deleteAPI, {
    method: 'DELETE',
  })
    .then(function(response) {
      console.log(response.status); // Will show you the status - 200 ok, 500, 404 etc.
      if (response.ok) {
        alert("Product deleted successfully!");
        location.reload(); // Reload the page
      } else {
        alert("Failed to delete the product. Please try again.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Product deleted successfully!");
    });
 }


document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);

function previousPage() {
    if(curPage > 1) curPage--;
    renderAdminProductPage(productController);
  }
  
  function nextPage() {
    if((curPage * pageSize) < adminInfo.length) curPage++;
    renderAdminProductPage(productController);
  }
// sort the data by the selected column
function sort(e) {


    let thisSort = e.target.dataset.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  productController.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? -1 : 1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? 1 : -1;
    return 0;
  });
  renderAdminProductPage(productController);
  }




function addProduct(name, summary, category, image1, img_credit_1, price_value, stock_count, price_unit, keywords, description, storeImage, image2, img_credit_2) {
console.log(storeImage);
const formData = new FormData();
   formData.append('name', name);
    formData.append('summary', summary);
    formData.append('category', category);
    formData.append('image1', image1);
    formData.append('img_credit_1', img_credit_1);
    formData.append('price_value', price_value);
    formData.append('stock_count', stock_count);
    formData.append('price_unit', price_unit);
    formData.append('keywords', keywords);
    formData.append('description', description);
    formData.append('imagefile', storeImage);
    formData.append('image2', image2);
    formData.append('img_credit_2', img_credit_2);

 fetch(addAPI, {
        method: 'POST',
        body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status - 200 ok, 500, 404 etc.
            if (response.ok) {
                alert("Successfully Added Product!")
                location.reload(); // Reload the page
            }
            /*else {
               alert("Something went wrong. Please try again")
            }*/
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error adding item to Product list")
        });


}
//         updateProduct(pName, pSum, pCat, pImg, pImgCred, pPrice, pStk, pUnit, pKey, pDesc, storeImage, pImg2, pImgCred2); //arguments

function updateProduct(name, summary, category, image1, img_credit_1, price_value, stock_count, price_unit, keywords, description, storeImage, image2, img_credit_2) {
    console.log(storeImage);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('summary', summary);
    formData.append('category', category);
if (image1) {
    formData.append('image1', image1);
  }
    formData.append('img_credit_1', img_credit_1);
    formData.append('price_value', price_value);
    formData.append('stock_count', stock_count);
    formData.append('price_unit', price_unit);
    formData.append('keywords', keywords);
    formData.append('description', description);
    formData.append('imagefile', storeImage);
    formData.append('image2', image2);
    formData.append('img_credit_2', img_credit_2);
const editAPI = `http://localhost:8080/product/` + updateId;
    fetch(editAPI, {
            method: 'PUT',
            body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status - 200 ok, 500, 404, etc.
            if (response.ok) {
                alert("Successfully Updated Product!");
                location.reload(); // Reload the page
            } else {
                alert("Something went wrong. Please try again");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error updating item in Product list");
        });
}









