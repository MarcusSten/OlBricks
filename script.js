/**

 * IMPORTANT:

 * To integrate with the BrickLink API, you will need:

 * - OAuth Consumer Key

 * - OAuth Consumer Secret

 * - OAuth Token

 * - OAuth Token Secret

 *

 * Refer to BrickLink API documentation: https://www.bricklink.com/v2/api

 *

 * Below is a placeholder using mock data.

 */



const itemsContainer = document.getElementById('itemsContainer');



// Mock data for demonstration

const mockData = [

  { name: 'Brick 2 x 4', color: 'Red', partNumber: '3001' },

  { name: 'Plate 1 x 2', color: 'Blue', partNumber: '3023' },

  { name: 'Minifigure Torso', color: 'Green', partNumber: '973' },

];



// Function to display items

function displayItems(data) {

  itemsContainer.innerHTML = '';

  data.forEach((item) => {

    const itemDiv = document.createElement('div');

    itemDiv.classList.add('item');

    itemDiv.innerHTML = `

      <h3>${item.name}</h3>

      <p>Color: ${item.color}</p>

      <p>Part Number: ${item.partNumber}</p>

    `;

    itemsContainer.appendChild(itemDiv);

  });

}



// Simulated request to BrickLink API (placeholder)

function fetchBrickLinkData() {

  // Real API call pseudocode:

  /*

  fetch('https://api.bricklink.com/api/store/v1/items', {

    method: 'GET',

    headers: {

      'Authorization': 'OAuth ...',

      'Content-Type': 'application/json'

    }

  })

    .then(response => response.json())

    .then(data => {

      displayItems(data);

    })

    .catch(err => console.error(err));

  */

  // Using mock data for now

  displayItems(mockData);

}



// Load data on page load

fetchBrickLinkData();
