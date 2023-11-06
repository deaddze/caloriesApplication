import { setStorage , getStorage, removeStorage } from "./localStorage.js";
const addBtn = document.getElementById('addBtn')
const sortBtn = document.getElementById('sortBtn')
const btn = document.getElementById('btn');
const clearBtn = document.getElementById('clearBtn')
const filter = document.getElementById('filter');
const goalItem = document.getElementById('goalItem');
let products = getStorage('products')|| [];
let goal = getStorage('goal') || 2000;
goalItem.textContent = goal;


function renderProducts(filteredProducts) {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  const productsToRender = filteredProducts || products;
  productsToRender.forEach((product, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${product.name}: ${product.calories} ккал`;
      const btn = document.createElement('button');
      btn.id = 'removeBtn';
      btn.textContent = 'Удалить';
      li.appendChild(btn)
      list.appendChild(li);
      btn.addEventListener('click', () => removeProduct(index))
  });

  const totalCalories = products.reduce((acc, product) => acc + product.calories, 0);
  document.getElementById('total-calories').innerText = totalCalories;

  const progressBar = document.getElementById('progress');
  const progressPercentage = Math.min(totalCalories / goal * 100, 100);
  progressBar.setAttribute('width', `${progressPercentage}%`);

  if (totalCalories > goal) {
      document.getElementById('warning').innerText = 'Превышен дневной лимит калорий!';
      document.getElementById('progress').style.fill = '#c42533';
  } else {
      document.getElementById('warning').innerText = '';
      document.getElementById('progress').style.fill = '#76c7c0';
  }
}

function addProduct() {
    const name = document.getElementById('product-name').value;
    const calories = Number(document.getElementById('calories').value);

    if (name && calories > 0) {
        products.push({ name, calories });
        setStorage('products', products)
        // localStorage.setItem('products', JSON.stringify(products));

        document.getElementById('product-name').value = '';
        document.getElementById('calories').value = '';

        renderProducts();
    }
}

function removeProduct(index) {
    products.splice(index, 1);
    setStorage('products', products)
    renderProducts();
}

function clearData() {
    products = [];
    removeStorage('products')
    renderProducts();
}

function setGoal() {
    goal = Number(document.getElementById('goal').value) || 2000;
    setStorage('goal', goal)
    goalItem.textContent = goal;
    renderProducts();
}

function filterProducts() {
    const filter = document.getElementById('filter').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(filter));
    renderProducts(filteredProducts);
}

function sortProducts() {
    products.sort((a, b) => b.calories - a.calories);
    renderProducts();
}

clearBtn.addEventListener('click', clearData)
filter.addEventListener('input', filterProducts)
sortBtn.addEventListener('click', sortProducts)
addBtn.addEventListener('click', addProduct)
btn.addEventListener('click', setGoal)
document.getElementById('goal').value = goal;
renderProducts();