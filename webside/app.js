var resultsArea = $("#results");
var displayArea = $("#display");
var pirates = {};

// $("#submit").on("click", function () {//This is a click event
//   var piratesText = $("input").val();
//   performpirates(piratesText);
// });


//Fist line up akk your global variables matching unto your html

//let inputStr;

$("#submit").on("click", getStr);
function getStr(){
  $(document).ready(function(){
    inputStr = $("#piratesInput").val();
    console.log(inputStr);
    getPirate()
  });
}


function getPirate(){
  $.get("http://onepiece-ac6x.onrender.com/api/onepiece/" + inputStr, (data) =>{
    console.log(data);
    console.table(data);

    let stringData = JSON.stringify(data);
    let results =JSON.parse(stringData);

  $.each(results, function(i){
    $(document).ready(function(){
      $("<div/>", {
        id: "piratename",
        class: "pirateclass",
        text: results[i]['name']
      }).appendTo("body");
    })
  })
  })

  function createpiratesFrom(pirate) {
    return {
    name: pirate.data,
    type: pirate.data,
    age: pirate.data
  }
};





/////////////////////////////////////BEGINNING/////////////////////
// WORK NEEDED (SEE TODO)
// DONE Create a GET request to URL with pirates text from the input box.
// DONE Add pirates results from above to the DOM: Use addResultToDOM and pass
// in your pirates results.
// function performpirates(piratesText) { //this function passed in piratestext which is defined on line 6 as an input that holds value aka input is read
//   var URL = googlepiratesAPI_URL(piratesText); //made a var to callthe googlepirates function and passed in the value input parameter as an argument
//   $.get(`https://onepiece-ac6x.onrender.com/api/onepiece:${piratesText}`, function(data){
//     console.log(data);
//     addResultToDOM(data);//Passed data into the function because its definition runs through the pirates titles, passed in data because thats the argument for the webpage objects
//     return data
// })
// }
////////////////COMPLETED//////////////////////////
// DO NOT MODIFY
// function googlepiratesAPI_URL(piratesText) {
//   return `https://onepiece-ac6x.onrender.com/api/onepiece:${piratesText}`;
// }

// // DO NOT MODIFY
function printToPage(piratesResults) {
  var items = piratesResults.items;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var newpirates = createpiratesFrom(item);

    pirates[newpirates.id] = newpirates;

    console.log(resultsArea.append(newpirates.html));
  }
  console.log(pirates);
 };
 //These properties can ber followed in the web console, they are all in array and object form. 
  //Their paths to represent specific titles are already defined by createpiratesFrom(item)
//////////////////////COMPLETE//////////////////////////////

// WORK NEEDED (SEE TODO)
resultsArea.on("click", function (event) {
  var isResultElement = event.target.getAttribute("class") === "result";//this makes a click event for the #results section where the pirates results are displayed

  if (isResultElement) {
    displayArea.empty();

    var piratesId = event.target.id;
    var pirates = pirates[piratesId];

    // DONE: Add piratesHTML to the display area
    var piratesHTML = htmlToDisplay(pirates);
    console.log(piratesHTML);
    $('#display').append(piratesHTML); //We append to piratesHTML because this var is representing the function that displays the pirateses
  }
});
///////////////////////////COMPLETE//////////////////////////////

// // WORK NEEDED (SEE TODO)
// function htmlToDisplay(pirates) {
//   // DONE: Add image from pirates. //The src tag is using jquery to lock unto the image so utilize pirates.image for the location
//   return `
//     <h2>${pirates.title}</h2>
//     <img src=${pirates.image}/> 
//     <h3><span class="description">${pirates.description}<span></h3>
//   `;
// }
// /////////////////////////COMPLETE/////////////////////

// // DO NOT MODIFY
function createpiratesFrom(pirate) {
  return {
    name: pirate.data
    devilfruit: pirate.data
    age: pirate.data
  };
}















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
//fetch api || axios

// $("#submit").on("click", function () {//This is a click event
//   var piratesText = $("input").val();
//   piratepirates(pirates);
// });

///The onepiece function is defned as returning us that url. this the link
function onepieceDb(pirates){
  return `https://onepiece-ac6x.onrender.com/api/onepiece:${pirates}`;
}

// //This function got a variabnle set to the one piece function to manupulate
// function piratepirates(pirates){
//   var URL = onepieceDb(pirates);
//   $.get(`https://onepiece-ac6x.onrender.com/api/onepiece:${pirates}`, function(data){
//     console.log(data);
//     return data
//   })
//})