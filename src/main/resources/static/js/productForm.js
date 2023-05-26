//Global variable - to store the image object
let storeImage = ""


//When user clicks on 'Save Item':
//1) store all the inputs into variables
//2) do validation
//3) calls a function from the productController.js to access the API to add items to the database


//Add an 'onsubmit' event listener for productform to add a product
addProductForm.addEventListener('submit', (event) => {


  // Prevent default action of the Form submission
  event.preventDefault();

       console.log(document.getElementById("pImg").value);
      //1) store all the input values in variables
      const pName = document.getElementById("pName").value;
      const pSum = document.getElementById("pSum").value;
      const pCat = document.getElementById("pCat").value;
      const pImg = document.getElementById("pImg").value.replace("C:\\fakepath\\", "");
      const pImgCred = "";
      const pPrice = document.getElementById("pPrice").value;
      const pStk = document.getElementById("pStk").value;
      const pUnit = document.getElementById("pUnit").value;
      const pKey = document.getElementById("pKey").value;
      const pDesc = document.getElementById("pDesc").value;
      const pImg2 = "";
      const pImgCred2 = "";

    //console log to check if the values are stored in the variables

    console.log(pName);
    console.log(pSum);
    console.log(pCat);
    console.log(pImg);
    console.log(pImgCred);
    console.log(pPrice);
    console.log(pStk);
    console.log(pUnit);
    console.log(pKey);
    console.log(pDesc);


  //Browser security will not be able to track/store the actual path of where you choose your image
  // C:/Users/Desktop/t-shirt_new.jpg
  //C:\fakepath\t-shirt_new.jpg
  //console.log(document.querySelector('#newItemImageFile').value + '\n' + "Hello world");





  /* 2)
      The following fields should be validated. If the validation fails, an alert message should be displayed on the invalid feedback div and the form should not be submitted.:
              - Product Name: Only letters
              - Product Price: Only numbers and minimum 10
              - Product Stock: Only numbers and range between 1 and 100
              - Product Unit: Only letters
              - Product Keywords: Only letters and have at least three keywords split by comma
              - Product Description: Only letters and character should be limited to 100
              - Product Summary: Only letters and character should be limited to 30
              - Product Image: Only jpg or png image file
              - Product Image Credit: A valid URL
  */

  const nameRegex = /^[a-zA-Z\s'’()0-9]{0,45}$/;
  const priceRegex = /^(?=.*\d)(?:\d{1,10})(?:\.\d{1,2})?$/;
  const stockRegex = /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/;
  const unitRegex = /^[a-zA-Z\s]*$/;
  const keywordsRegex = /^([a-zA-Z\s]+,\s*){1,}[a-zA-Z\s]+$/;
  const descriptionRegex = /^.{1,800}$/;
  const summaryRegex = /^[a-zA-Z0-9\s.,!?'"()&-]{0,100}$/;
  const imageRegex = /(.*?)\.(jpg|png)$/i;
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;




    let isValid = true;

    if (!nameRegex.test(pName)) {
      isValid = false;
      //alert("invalid name");
    // Display an error message
    document.getElementById("invalid-name").classList.remove("invalid-feedback");
    document.getElementById("invalid-name").innerHTML = "Product name should contain only letters";
    document.getElementById("invalid-name").classList.add("text-danger");
    document.getElementById("invalid-name").classList.add("is-invalid");    }
    else {
        // Field is validated, remove error message
        document.getElementById("invalid-name").innerHTML = "";
        document.getElementById("invalid-name").classList.remove("is-invalid");
        console.log("valid name");
    }


    if (!priceRegex.test(pPrice) || pPrice < 10) {
      isValid = false;
      //alert("invalid price");
       document.getElementById("invalid-price").classList.remove("invalid-feedback");
       document.getElementById("invalid-price").innerHTML = "Product price should contain only numbers and be minimum 10";
       document.getElementById("invalid-price").classList.add("text-danger");
       document.getElementById("invalid-price").classList.add("is-invalid");
    } else {
        // Field is validated, remove error message
        document.getElementById("invalid-price").innerHTML = "";
        document.getElementById("invalid-price").classList.remove("is-invalid");
        console.log("valid price");
    }

    if (!stockRegex.test(pStk)) {
      isValid = false;
      //alert("invalid stock");
      document.getElementById("invalid-stock").classList.remove("invalid-feedback");
      document.getElementById("invalid-stock").innerHTML = "Product stock should contain only numbers and be between 1 and 200";
      document.getElementById("invalid-stock").classList.add("text-danger");
      document.getElementById("invalid-stock").classList.add("is-invalid");
    } else {
        // Field is validated, remove error message
        document.getElementById("invalid-stock").innerHTML = "";
        document.getElementById("invalid-stock").classList.remove("is-invalid");
        console.log("valid stock");
    }


    /*if (!unitRegex.test(pUnit)) {
      isValid = false;
      document.getElementById("invalid-unit").innerHTML = "Product unit should contain only letters";
    }*/

    if (!keywordsRegex.test(pKey)) {
      isValid = false;
      //alert("invalid keywords");
      document.getElementById("invalid-keywords").classList.remove("invalid-feedback");
      document.getElementById("invalid-keywords").innerHTML = "Product keywords should contain at least three words separated by comma";
      document.getElementById("invalid-keywords").classList.add("text-danger");
      document.getElementById("invalid-keywords").classList.add("is-invalid");
    } else {
        // Field is validated, remove error message
        document.getElementById("invalid-keywords").innerHTML = "";
        document.getElementById("invalid-keywords").classList.remove("is-invalid");
        //console.log("valid keywords");
    }

    if (!descriptionRegex.test(pDesc)) {
      isValid = false;
      //alert("invalid description");
      document.getElementById("invalid-description").classList.remove("invalid-feedback");
      document.getElementById("invalid-description").innerHTML = "Product description should contain only letters and have maximum length of 800";
      document.getElementById("invalid-description").classList.add("text-danger");
      document.getElementById("invalid-description").classList.add("is-invalid");
    } else {
        // Field is validated, remove error message
        document.getElementById("invalid-description").innerHTML = "";
        document.getElementById("invalid-description").classList.remove("is-invalid");
        //console.log("valid description");
    }

    if (!summaryRegex.test(pSum)) {
      isValid = false;
      //alert("invalid summary");
      document.getElementById("invalid-summary").classList.remove("invalid-feedback");
      document.getElementById("invalid-summary").innerHTML = "Product summary should contain only letters and have maximum length of 100";
      document.getElementById("invalid-summary").classList.add("text-danger");
      document.getElementById("invalid-summary").classList.add("is-invalid");
    } else {
        // Field is validated, remove error message
        document.getElementById("invalid-summary").innerHTML = "";
        document.getElementById("invalid-summary").classList.remove("is-invalid");
        //console.log("valid summary");
    }

    if (!imageRegex.test(pImg)) {
      isValid = false;
      //alert("invalid image");
      document.getElementById("invalid-image").classList.remove("invalid-feedback");
      document.getElementById("invalid-image").innerHTML = "Product image should be in jpg or png format";
      document.getElementById("invalid-image").classList.add("text-danger");
      document.getElementById("invalid-image").classList.add("is-invalid");
    } else {
        // Field is validated, remove error message
        document.getElementById("invalid-image").innerHTML = "";
        document.getElementById("invalid-image").classList.remove("is-invalid");
        //console.log("valid image");
    }



        console.log(pImg);

    if (isValid) {

      // Submit the form
      // 3)  calls a function from the admin_productController.js to access the API to add items to the database
        addProduct(pName, pSum, pCat, pImg, pImgCred, pPrice, pStk, pUnit, pKey, pDesc, storeImage, pImg2, pImgCred2); //arguments
    } else {
      // Display error message
        alert("Please fill in all the fields correctly");
    }


});

          // select file input
          const input = document.querySelector('#pImg');
          // add event listener
          input.addEventListener('change', () => {
            storeImage = input.files[0]; //array of files for us to access
          });


updateProductForm.addEventListener("submit", function(event) {
 // Prevent default action of the Form submission
  event.preventDefault();

       //console.log(document.getElementById("pImg").value);
      //1) store all the input values in variables
      const pName = document.getElementById("editPName").value;
      const pSum = document.getElementById("editPSum").value;
      const pCat = document.getElementById("editPCat").value;
      const pImg = document.getElementById("editPImg").value.replace("C:\\fakepath\\", "");
      const pImgCred = "";
      const pPrice = document.getElementById("editPPrice").value;
      const pStk = document.getElementById("editPStk").value;
      const pUnit = document.getElementById("editPUnit").value;
      const pKey = document.getElementById("editPKey").value;
      const pDesc = document.getElementById("editPDesc").value;
      const pImg2 = "";
      const pImgCred2 = "";


    //console log to check if the values are stored in the variables

    console.log(pName);
    console.log(pSum);
    console.log(pCat);
    console.log(pImg);
    console.log(pPrice);
    console.log(pStk);
    console.log(pUnit);
    console.log(pKey);
    console.log(pDesc);


  //Browser security will not be able to track/store the actual path of where you choose your image
  // C:/Users/Desktop/t-shirt_new.jpg
  //C:\fakepath\t-shirt_new.jpg
  //console.log(document.querySelector('#newItemImageFile').value + '\n' + "Hello world");





  /* 2)
      The following fields should be validated. If the validation fails, an alert message should be displayed on the invalid feedback div and the form should not be submitted.:
              - Product Name: Only letters
              - Product Price: Only numbers and minimum 10
              - Product Stock: Only numbers and range between 1 and 100
              - Product Unit: Only letters
              - Product Keywords: Only letters and have at least three keywords split by comma
              - Product Description: Only letters and character should be limited to 100
              - Product Summary: Only letters and character should be limited to 30
              - Product Image: Only jpg or png image file
              - Product Image Credit: A valid URL
  */

  const nameRegex = /^[a-zA-Z\s'’()0-9]{0,45}$/;
  const priceRegex = /^(?=.*\d)(?:\d{1,10})(?:\.\d{1,2})?$/;
  const stockRegex = /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/;
  const unitRegex = /^[a-zA-Z\s]*$/;
  const keywordsRegex = /^([a-zA-Z\s]+,\s*){1,}[a-zA-Z\s]+$/;
  const descriptionRegex = /^.{0,800}$/;
  const summaryRegex = /^[a-zA-Z0-9\s.,!?'"()&-]{0,100}$/;
  const imageRegex = /(.*?)\.(jpg|png)$/i;
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;




    let isValid = true;

    if (!nameRegex.test(pName)) {
        isValid = false;
        document.getElementById("editInvalid-name").classList.remove("invalid-feedback");
        document.getElementById("editInvalid-name").innerHTML = "Product name should contain only letters";
        document.getElementById("editInvalid-name").classList.add("text-danger");
        document.getElementById("editInvalid-name").classList.add("is-invalid");
    } else {
        document.getElementById("editInvalid-name").innerHTML = "";
        document.getElementById("editInvalid-name").classList.remove("is-invalid");
        console.log("valid name");
    }

    if (!priceRegex.test(pPrice) || pPrice < 10) {
        isValid = false;
        document.getElementById("editInvalid-price").classList.remove("invalid-feedback");
        document.getElementById("editInvalid-price").innerHTML = "Product price should contain only numbers and be minimum 10";
        document.getElementById("editInvalid-price").classList.add("text-danger");
        document.getElementById("editInvalid-price").classList.add("is-invalid");
    } else {
        document.getElementById("editInvalid-price").innerHTML = "";
        document.getElementById("editInvalid-price").classList.remove("is-invalid");
        console.log("valid price");
    }

    if (!stockRegex.test(pStk)) {
        isValid = false;
        document.getElementById("editInvalid-stock").classList.remove("invalid-feedback");
        document.getElementById("editInvalid-stock").innerHTML = "Product stock should contain only numbers and be between 1 and 200";
        document.getElementById("editInvalid-stock").classList.add("text-danger");
        document.getElementById("editInvalid-stock").classList.add("is-invalid");
    } else {
        document.getElementById("editInvalid-stock").innerHTML = "";
        document.getElementById("editInvalid-stock").classList.remove("is-invalid");
        console.log("valid stock");
    }

    if (!keywordsRegex.test(pKey)) {
        isValid = false;
        document.getElementById("editInvalid-keywords").classList.remove("invalid-feedback");
        document.getElementById("editInvalid-keywords").innerHTML = "Product keywords should contain at least three words separated by comma";
        document.getElementById("editInvalid-keywords").classList.add("text-danger");
        document.getElementById("editInvalid-keywords").classList.add("is-invalid");
    } else {
        document.getElementById("editInvalid-keywords").innerHTML = "";
        document.getElementById("editInvalid-keywords").classList.remove("is-invalid");
    }

    if (!descriptionRegex.test(pDesc)) {
        isValid = false;
        document.getElementById("editInvalid-description").classList.remove("invalid-feedback");
        document.getElementById("editInvalid-description").innerHTML = "Product description should have a maximum character length of 800";
        document.getElementById("editInvalid-description").classList.add("text-danger");
        document.getElementById("editInvalid-description").classList.add("is-invalid");
    } else {
        document.getElementById("editInvalid-description").innerHTML = "";
        document.getElementById("editInvalid-description").classList.remove("is-invalid");
    }

    if (!summaryRegex.test(pSum)) {
        isValid = false;
        document.getElementById("editInvalid-summary").classList.remove("invalid-feedback");
        document.getElementById("editInvalid-summary").innerHTML = "Product summary have a maximum character length of 100";
        document.getElementById("editInvalid-summary").classList.add("text-danger");
        document.getElementById("editInvalid-summary").classList.add("is-invalid");
    } else {
        document.getElementById("editInvalid-summary").innerHTML = "";
        document.getElementById("editInvalid-summary").classList.remove("is-invalid");
    }

    if (pImg) {
      if (!imageRegex.test(pImg)) {
        isValid = false;
        document.getElementById("editInvalid-image").classList.remove("invalid-feedback");
        document.getElementById("editInvalid-image").innerHTML = "Product image should be in jpg or png format";
        document.getElementById("editInvalid-image").classList.add("text-danger");
        document.getElementById("editInvalid-image").classList.add("is-invalid");
      } else {
        document.getElementById("editInvalid-image").innerHTML = "";
        document.getElementById("editInvalid-image").classList.remove("is-invalid");
      }
    }





        console.log(pImg);

    if (isValid) {

      // Submit the form
      // 3)  calls a function from the admin_productController.js to access the API to add items to the database
        updateProduct(pName, pSum, pCat, pImg, pImgCred, pPrice, pStk, pUnit, pKey, pDesc, storeImage, pImg2, pImgCred2); //arguments
    } else {
      // Display error message
        alert("Please fill in all the fields correctly");
    }


});
