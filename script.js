const fruitForm = document.querySelector('#inputSection form')
// Select the form element within the input section <<id>> <<tag>>
const fruitList = document.querySelector('#fruitSection ul')

const nutritionSection = document.querySelector('#nutritionSection p') 
// Select the paragraph element within the nutrition section to display nutritional information about the fruits

const fruitImageSection = document.querySelector('#fruitSection img') 

let cal = 0

// console.log(fruitForm)
// Log the form element to the console for debugging purposes

// fruitForm.addEventListener('submit', (e) =>  { console.log(e)})
// Add an event listener to the form that listens for the 'submit' event and logs the event object to the console for debugging purposes

fruitForm.addEventListener('submit', extractFruit)

function extractFruit(e) {
    e.preventDefault() // Prevent the default form submission behavior to avoid page reload
    //console.log(e.target.fruitInput.value) // Log the value of the input field with the name 'fruit' to the console
    fetchFruit(e.target.fruitInput.value) // Call the addFruitToList function with the value of the input field as an argument to add the fruit to the list
    fetchFruitImage(e.target.fruitInput.value) // Call the fetchFruitImage function with the value of the input field as an argument to fetch and display an image of the fruit
    e.target.fruitInput.value = '' // Clear the input field after logging the value
}


function addFruitToList(fruit) {
    if (!fruit.name){
        //alert('Fruit not found. Please try again.') // Display an alert message if the fruit name is not found in the API response
        return // Exit the function early if the fruit name is not found to prevent further execution of the code
    }
    else {
        const li = document.createElement('li') // Create a new list item element in ul tag
        li.textContent = fruit.name // Set the text content of the list item to the fruit name passed as an argument
        li.value = fruit.nutritions.calories // Set the value of the list item to the calories of the fruit for later use when removing the fruit from the list
        li.addEventListener('click', removeFruit)
        fruitList.appendChild(li) // Append the newly created list item to the fruit list in the DOM
        cal = cal + fruit.nutritions.calories // Add the calories of the fruit to the total calorie count. From API get the proper name of nutritions and calories
        nutritionSection.textContent = cal // Update the text content of the nutrition section to display the total calorie count
    }
}   
//function fetchFruit(fruit) {
    //fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`) // Returns Promise Make a GET request to the specified API endpoint with the fruit name as a parameter
       //  .then((resp) => resp.json()) // Convert the response to JSON format and return a new Promise that resolves with the parsed JSON data
        // .then(processResponse)
         //   .then(data => addFruitToList(data)) // Call the addFruitToList function with the parsed JSON data to add the fruit to the list in the DOM
         //   .catch((e) => console.log(e)) // Log any errors that occur during the fetch operation to the console for debugging purposes
        // Convert the response to JSON format
//}

async function fetchFruit(fruit){
    try {
    const resp = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`) // Make a GET request to the specified API endpoint with the fruit name as a parameter and wait for the response
    if (resp.ok) {
        const data = await resp.json() // Convert the response to JSON format and store it in the data variable
        addFruitToList(data) // Call the addFruitToList function with the parsed JSON data to add the fruit to the list in the DOM
    } else {
        throw `Error: http status code = ${resp.status}` // Throw an error with the HTTP status code if the response is not successful
    }

    } catch (e) {
        console.log(e) // Log any errors that occur during the fetch operation to the console for debugging purposes
    }
}

async function fetchFruitImage(fruit){
    try{
        if (!fruit){
            return;
        }
        else {
            const fetchimg = await fetch(`https://pixabay.com/api/?key=54809912-4efdb76d138c16e65e597f66c&q=${fruit}+fruit&image_type=photo&pretty=true`) // Make a GET request to the Pixabay API with the fruit name as a query parameter and wait for the response
            // https://pixabay.com/api/?key=54809912-4efdb76d138c16e65e597f66c&q=yellow+flowers&image_type=photo
            if (fetchimg.ok) {
                const data = await fetchimg.json() // Convert the response to JSON format and store it in the data variable
                addImage(data) // Call the addImage function with the parsed JSON data to display the fruit image in the DOM
            } else {
                throw `Error: http status code = ${fetchimg.status}` // Throw an error with the HTTP status code if the response is not successful
            }
        }
    }
    catch (e) {
        console.log(e) // Log any errors that occur during the fetch operation to the console for debugging purposes
    }
}

function addImage(data) {
    fruitImageSection.src = data.hits[Math.floor(Math.random() * 10)].webformatURL // Set the source of the image to the URL of the first image result from the API response
    fruitImageSection.hidden = false // Unhide the image element to display the fruit image in the DOM
}
function processResponse(resp) {
    if (resp.ok) {
        return resp.json()
    }else {
        throw `Error: http status code = ${resp.status}`
    }
}


function removeFruit(e) {
    e.target.remove()// Remove the clicked list item from the DOM when it is clicked
    cal = cal - e.target.value // Subtract the calories of the removed fruit from the total calorie count using the value property of the list item
    nutritionSection.textContent = cal
}


//Read about Async Promise and Await in JavaScript t/
// To understand how to handle asynchronous operations like fetching data from an API



