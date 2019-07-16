"use strict";
// alert("Hello! I am an alert box!!");

// array to be populated with the API response
let quotes;

//asynchronous function that gets data from the API and populates the quotes array
const makeRequest = async () => {
    // const responseJSON = await fetch('https://my-json-server.typicode.com/morsewall/random-quotes-vanillajs-rest-api/quotes');
    const responseJSON = await fetch('https://api.kanye.rest/');
    quotes = await responseJSON.json();
    console.log(quotes);
}

//function to access random quote from array and inject it together with author on HTML
function injectQuote() {
  //access random quote from quote array
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  console.log(randomQuote);
  //inject random quote on HTML
  //  document.getElementById('text').innerHTML = randomQuote.quoteText;
   document.getElementById('text').innerHTML = randomQuote.quote;
  let quoteTextElem = randomQuote.quote;
  //inject author on HTML
  document.getElementById('author').innerHTML = "- " + randomQuote.quoteAuthor;
  let quoteAuthorElem = " - " + randomQuote.quoteAuthor;
  //truncating quote text in case full tweet gets to be over 280 characters
  let contentQuote = quoteTextElem + quoteAuthorElem;
  if (contentQuote.length > 280) {
    let charCountAuthor = quoteAuthorElem.length;
    const extraStylingChar = "..." + '"';
    let extraCharCount = extraStylingChar.length;
    let subString = quoteTextElem.substring(0, 280 - extraCharCount - charCountAuthor) + extraStylingChar + quoteAuthorElem;
    //generate url available for Twitter intent and inject url on HTML
    document.getElementById('tweet-quote').href = "https://twitter.com/intent/tweet?text=" + subString;
  } else {
    //generate url available for Twitter intent and inject url on HTML
    document.getElementById('tweet-quote').href = "https://twitter.com/intent/tweet?text=" + contentQuote;
  } 
};

// inject a quote on screen when app loads (but only after the array was populated with the API response)
makeRequest().then(result => injectQuote());

//inject a quote on screen when "Get New Quote" button is clicked
document.getElementById('new-quote').addEventListener('click', function() {injectQuote();});

