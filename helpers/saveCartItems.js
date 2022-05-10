const saveCartItems = (valueCart) => {
  // seu código aqui
  localStorage.setItem('cartItems', valueCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
