var resultsArea = $("#results");
var displayArea = $("#display");
var books = {};

$("#submit").on("click", function () {//This is a click event
  var searchText = $("input").val();
  performSearch(searchText);
});

/////////////////////////////////////BEGINNING/////////////////////
// WORK NEEDED (SEE TODO)
// DONE Create a GET request to URL with search text from the input box.
// DONE Add search results from above to the DOM: Use addResultToDOM and pass
// in your search results.
function performSearch(searchText) { //this function passed in searchtext which is defined on line 6 as an input that holds value aka input is read
  var URL = googleBookAPI_URL(searchText); //made a var to callthe googlebook function and passed in the value input parameter as an argument
  $.get(`https://onepiece-ac6x.onrender.com/api/onepiece:${searchText}`, function(data){
    console.log(data);
    addResultToDOM(data);//Passed data into the function because its definition runs through the book titles, passed in data because thats the argument for the webpage objects
    return data
})
}
////////////////COMPLETED//////////////////////////

// DO NOT MODIFY
function googleBookAPI_URL(searchText) {
  return `https://onepiece-ac6x.onrender.com/api/onepiece:${searchText}`;
}

// DO NOT MODIFY
function addResultToDOM(searchResults) {
  var items = searchResults.items;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var newBook = createBookFrom(item);

    books[newBook.id] = newBook;

    console.log(resultsArea.append(newBook.html));
  }

  // REQUIRED TO SUCCEED: Look at what gets logged out. Make sure you read
  // what properties are being stored.
  console.log(books); //These properties can ber followed in the web console, they are all in array and object form. 
  //Their paths to represent specific titles are already defined on line 75 by createBookFrom(item)
}
//////////////////////COMPLETE//////////////////////////////

// WORK NEEDED (SEE TODO)
resultsArea.on("click", function (event) {
  var isResultElement = event.target.getAttribute("class") === "result";//this makes a click event for the #results section where the book results are displayed

  if (isResultElement) {
    displayArea.empty();

    var bookId = event.target.id;
    var book = books[bookId];

    // DONE: Add bookHTML to the display area
    var bookHTML = htmlToDisplay(book);
    console.log(bookHTML);
    $('#display').append(bookHTML); //We append to bookHTML because this var is representing the function that displays the searches
  }
});
///////////////////////////COMPLETE//////////////////////////////

// // WORK NEEDED (SEE TODO)
// function htmlToDisplay(book) {
//   // DONE: Add image from book. //The src tag is using jquery to lock unto the image so utilize book.image for the location
//   return `
//     <h2>${book.title}</h2>
//     <img src=${book.image}/> 
//     <h3><span class="description">${book.description}<span></h3>
//   `;
// }
// /////////////////////////COMPLETE/////////////////////

// // DO NOT MODIFY
// function createBookFrom(item) {
//   return {
//     id: item.id,
//     title: item.volumeInfo.title,
//     description: item.volumeInfo.description,
//     image: item.volumeInfo.imageLinks.thumbnail,
//     html: `<span id="${item.id}" class="result">${item.volumeInfo.title}</span>`,
//   };
// }















//'use strict';
//const cors = require('cors');

// fetch('https://onepiece.onrender.com/data')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));


//   $.ajax({
//     url: "https://onepiece.onrender.com/data",
//     type: "GET",
//     dataType: "json",
//     success: function(data) {
//       // Process the response data here
//       console.log(data);
//     },
//     error: function(xhr, status, error) {
//       // Handle any errors here
//       console.error(error);
//     }
//   });

// let inputStr;

// $("#submit").on("click", getStr);
// function getStr(){
//   $(document).ready(function(){
//     inputStr = $("#searchInput").val();
//     console.log(inputStr);
//     getPirate()
//   });
// }

// function getPirate(){
//   $.get("https://onepiece-ac6x.onrender.com/api/onepiece/" + inputStr, (data) =>{
//     console.log(data);
//     console.table(data);

//     let stringData = JSON.stringify(data);
//     let results =JSON.parse(stringData);

//   $.each(results, function(i){
//     $(document).ready(function(){
//       $("<div/>", {
//         id: "piratename",
//         class: "pirateclass",
//         text: results[i]['name']
//       }).appendTo("body");
//     })
//   })
//   })
// }


//fetch api || axios

// $("#submit").on("click", function () {//This is a click event
//   var searchText = $("input").val();
//   pirateSearch(search);
// });

// ///The onepiece function is defned as returning us that url. this the link
// function onepieceDb(search){
//   return `https://onepiece-ac6x.onrender.com/api/onepiece:${search}`;
// }

// //This function got a variabnle set to the one piece function to manupulate
// function pirateSearch(search){
//   var URL = onepieceDb(search);
//   $.get(`https://onepiece-ac6x.onrender.com/api/onepiece:${search}`, function(data){
//     console.log(data);
//     return data
//   })
// }