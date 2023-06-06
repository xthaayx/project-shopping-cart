const itemLista = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');
const buttonEmpty = document.querySelector('.empty-cart');

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

buttonEmpty.addEventListener('click', () => {
  cartItem.innerHTML = '';
  saveCartItems(cartItem.innerHTML);
});

function cartItemClickListener(event) {
  event.target.remove(); // 3-
  saveCartItems(cartItem.innerHTML);
}

const saveItem = () => {
  cartItem.innerHTML = getSavedCartItems();
  const liCartItem = document.querySelectorAll('.cart__item');
  liCartItem.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function createCartItemElement({ title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addProduct = async (event) => {
  const idSku = getSkuFromProductItem(event.target.parentNode);
  const itemId = await fetchItem(idSku);
  cartItem.appendChild(createCartItemElement(itemId));
  saveCartItems(cartItem.innerHTML);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addProduct);
  section.appendChild(button);
  return section;
}

const createProducts = async () => {
  const fetch = await fetchProducts('computador');
    fetch.results.forEach((resultado) => {
    const product = { 
      sku: resultado.id,
      name: resultado.title,
      image: resultado.thumbnail,
    };
    
    itemLista.appendChild(createProductItemElement(product));
  });
};

window.onload = () => { 
  createProducts();
  saveItem();
};
