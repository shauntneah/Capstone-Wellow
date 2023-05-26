// filter buttons
$(document).ready(function () {
    $('.filter-button-group button').click(function () {
        $('.filter-button-group button').removeClass('active');
        $(this).addClass('active');
        sessionStorage.clear(); // Clear session storage
    });
});


let getProductList = {};// Empty Object - Global Scope

//@@ local development API
const addAPI= 'http://localhost:8080/product/add';
const displayAPI = 'http://localhost:8080/product/all';

//@@ Deployment Azure API
const addAPI= 'https://wellow.azurewebsites.net/product/add';
const displayAPI = 'https://wellow.azurewebsites.net/product/all';


let productController = [];






function displayProduct()
{


fetch(displayAPI)
    .then(response => response.json())// implied return
    .then(function(data) {
                   console.log("2. receive data")
                   console.log(data);
                   data.forEach(function (product, index) {


                       const itemObj = {
                           productID: product.productID,
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

                let buttons = document.querySelectorAll('.filter-button-group button');

                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].addEventListener('click', function () {
                                renderProductPage(productController, this.value,document.querySelector("#search").value);
                            });

                        }
                  console.log(productController);
                 renderProductPage(productController, "All");


               })
               .catch(function(error) {
                   console.log(error);
               });


}
let filteredProducts = [];
//(3)  Display all products when user launch the product.html page
function renderProductPage(prod, category, searchInput) {

 // Filter products based on search input
    if (searchInput) {
        filteredProducts = prod.filter(product => {
            return (
                product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                product.keywords.toLowerCase().includes(searchInput.toLowerCase())
            );
        });
    }
    else {
        filteredProducts = prod;
    }
let details = "";
let count = 0;
// Get selected filter from session storage
    const selectedFilter = sessionStorage.getItem('selectedFilter');
    if (selectedFilter === 'Singapore') {
            // Remove active class from all buttons except the Singapore button
            $('.filter-button-group button').not('button[value="Singapore"]').removeClass('active');

            // Add active class to the Singapore button
            $('button[value="Singapore"]').addClass('active');
          }
         else if (selectedFilter === 'Flower') {
            // Remove active class from all buttons except the Singapore button
            $('.filter-button-group button').not('button[value="Flower"]').removeClass('active');

            // Add active class to the Singapore button
            $('button[value="Flower"]').addClass('active');
          }

        // Use selected filter if available, otherwise use category
        const filter = selectedFilter || category;

         // If "All" button is clicked, display all products
            if (filter === 'All') {
for (let i = 0; i < filteredProducts.length; i++) {
            count++;
            // Build the product card HTML using the filteredProducts array
            details += `<div class="row justify-content-center mb-3 mobile-card">
            <div class="col-md-12 col-xl-10">
                <div class="card shadow-0 border rounded-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                <div class="bg-image hover-zoom ripple rounded ripple-surface mobile-image">
                                    <img src="${filteredProducts[i].image1}" class="w-75"/>
                                    <a href="#!">
                                        <div class="hover-overlay">
                                            <div class="mask"
                                                style="background-color: rgba(253, 253, 253, 0.15);"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-xl-6">
                                <h5>${filteredProducts[i].name}</h5>

                                <div class="mt-1 mb-0 text-muted small">
                                    <span>${filteredProducts[i].keywords.split(',')[0]?.trim()}</span>
                                    <span class="text-primary"> • </span>
                                    <span>${filteredProducts[i].keywords.split(',')[1]?.trim()}</span>
                                    <span class="text-primary"> • </span>
                                    <span>${filteredProducts[i].keywords.split(',')[2]?.trim()}<br /></span>
                                </div>

                                <p class="mb-2 mb-md-2">
                                ${filteredProducts[i].summary}

                                </p>
                                <button class="btn btn-primary btn-sm mb-5 mb-md-3" type="button" data-bs-toggle="modal" data-bs-target="#productModal" onClick="displayDetails(${i})" >Details</button>

                            </div>
                            <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                <div class="d-flex flex-row align-items-center">
                                    <h4 class="mb-1 me-1">$${filteredProducts[i].price_value}</h4>

                                </div>

                                <div class="d-flex flex-column mt-4">
                                    <h6 class="text">Quantity: (${filteredProducts[i].price_unit})</h6>
                                    <input class="" type="number" id="stepper" name="stepper" value="1"
                                        min="1" max="100" step="1">
                                    <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                                        Add to shopping cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        }

        document.querySelector("#products").innerHTML = details;
        document.querySelector(".productCount").innerHTML = `${count} items found`;
        } else {
                // Display products based on category and search input
                for (let i = 0; i < filteredProducts.length; i++) {
                    let product = filteredProducts[i];
                    if (product.category === filter || product.keywords.includes(filter)) {
                        count++;
                        details += `<div class="row justify-content-center mb-3 mobile-card">
                        <div class="col-md-12 col-xl-10">
                            <div class="card shadow-0 border rounded-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                            <div class="bg-image hover-zoom ripple rounded ripple-surface mobile-image">
                                                <img src="${filteredProducts[i].image1}" class="w-75"/>
                                                <a href="#!">
                                                    <div class="hover-overlay">
                                                        <div class="mask"
                                                            style="background-color: rgba(253, 253, 253, 0.15);"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-6 col-xl-6">
                                            <h5>${filteredProducts[i].name}</h5>

                                            <div class="mt-1 mb-0 text-muted small">
                                                <span>${filteredProducts[i].keywords.split(',')[0]?.trim()}</span>
                                                <span class="text-primary"> • </span>
                                                <span>${filteredProducts[i].keywords.split(',')[1]?.trim()}</span>
                                                <span class="text-primary"> • </span>
                                                <span>${filteredProducts[i].keywords.split(',')[2]?.trim()}<br /></span>
                                            </div>

                                            <p class="mb-2 mb-md-2">
                                            ${filteredProducts[i].summary}

                                            </p>
                                            <button class="btn btn-primary btn-sm mb-5 mb-md-3" type="button" data-bs-toggle="modal" data-bs-target="#productModal" onClick="displayDetails(${i})" >Details</button>

                                        </div>
                                        <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                            <div class="d-flex flex-row align-items-center">
                                                <h4 class="mb-1 me-1">$${filteredProducts[i].price_value}</h4>

                                            </div>

                                            <div class="d-flex flex-column mt-4">
                                                <h6 class="text">Quantity: (${filteredProducts[i].price_unit})</h6>
                                                <input class="" type="number" id="stepper" name="stepper" value="1"
                                                    min="1" max="100" step="1">
                                                <button class="btn btn-outline-primary btn-sm mt-2" type="button">
                                                    Add to shopping cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    }
                }

                document.querySelector("#products").innerHTML = details;
                document.querySelector(".productCount").innerHTML = `${count} items found`;

            }


} //End of renderProductPage function




//home cards onclick
function navigateToProducts(searchTerm) {
    // Save selected filter in session storage
    sessionStorage.setItem('selectedFilter', searchTerm);
    //window.location.href = `product.html`;
    window.location.href = '/product';

}



//   search bar
document.querySelector("#search").addEventListener("keyup", function () {
    //console.log(document.querySelector("#search").value);
    renderProductPage(productController, document.querySelector('.filter-button-group button.active').value, this.value);
});




function displayDetails(index) {
    //When user clicks on any "More" button, the details of the selected product will be displayed

    document.querySelector('#displayProduct').innerHTML = `
        <div class="modal-content rounded-4 shadow">
          <div class="modal-body p-5">
            <h2 class="fw-bold mb-2">${filteredProducts[index].name}</h2>

                <img src="${filteredProducts[index].image1}" class="bi text-body-secondary flex-shrink-0" width="50%" height="50%">
                <div>
                  <div class="mt-1 mb-0 text-muted small">
                      <span>${filteredProducts[index].keywords.split(',')[0]?.trim()}</span>
                      <span class="text-primary"> • </span>
                      <span>${filteredProducts[index].keywords.split(',')[1]?.trim()}</span>
                      <span class="text-primary"> • </span>
                      <span>${filteredProducts[index].keywords.split(',')[2]?.trim()}<br /></span>
                  </div>
                  <h5 class="mb-0">Product Description:</h5>
                 
                  ${filteredProducts[index].description}
                </div>
              
            
                <div class="modal-footer">
                  <a class="btn btn-primary" data-bs-dismiss="modal">Close</a>
              </div>
          </div>
        </div>`;


}






