/* Shared deterministic business logic; usable in browsers and Node tests. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.SmartDukaanCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const quantityScale = { kg: 1000, g: 1, mg: .001, quintal: 100000, L: 1000, ml: 1, piece: 1 };
  const dimensions = { kg: 'weight', g: 'weight', mg: 'weight', quintal: 'weight', L: 'volume', ml: 'volume' };
  function positive(value, name) { const n=Number(value); if (!Number.isFinite(n) || n <= 0) throw new Error(`${name} must be a finite number greater than zero.`); return n; }
  function calculateQuantityFromPrice(amount, product) {
    const paise=Math.round(positive(amount,'Amount')*100), pricePaise=Math.round(positive(product.price,'Product price')*100), base=positive(product.baseQuantity,'Base quantity');
    if(!Number.isSafeInteger(paise)||!Number.isSafeInteger(pricePaise)) throw new Error('Amount is too large.');
    return paise/pricePaise*base;
  }
  function calculatePriceFromQuantity(quantity, product, inputUnit=product.unit) {
    const amount=positive(quantity,'Quantity'),base=positive(product.baseQuantity,'Base quantity'),price=positive(product.price,'Product price');
    const inputFactor=quantityScale[inputUnit],baseFactor=quantityScale[product.unit];
    if(!inputFactor||!baseFactor||dimensions[inputUnit]!==dimensions[product.unit]) throw new Error('Choose a quantity unit compatible with the product.');
    return Math.round((amount*inputFactor/(base*baseFactor)*price+Number.EPSILON)*100)/100;
  }
  function convertUnits(value, from, to) {
    const n=Number(value),factors={kg:1000,g:1,mg:.001,quintal:100000,L:1000,ml:1};
    if(!Number.isFinite(n)||n<0) throw new Error('Value must be a finite non-negative number.');
    if(!factors[from]||!factors[to]||!dimensions[from]||dimensions[from]!==dimensions[to]) throw new Error('Units must belong to the same supported dimension.');
    return n*factors[from]/factors[to];
  }
  return {calculateQuantityFromPrice,calculatePriceFromQuantity,convertUnits,quantityScale,dimensions};
});
