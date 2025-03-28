const itemsContainer = document.getElementById('itemsContainer');

async function fetchBrickLinkData() {
  try {
    const response = await fetch('/api/bricklink');
    if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

    const data = await response.json();
    displayItems(data.data); // 'data' содержит массив инвентаря
  } catch (error) {
    console.error('Ошибка при получении данных из BrickLink:', error);
  }
}

function displayItems(items) {
  itemsContainer.innerHTML = '';
  items.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
      <h3>${item.item.name}</h3>
      <p>Цвет: ${item.color.name}</p>
      <p>Количество: ${item.quantity}</p>
      <p>Цена: $${item.price}</p>
    `;
    itemsContainer.appendChild(itemDiv);
  });
}

fetchBrickLinkData();

