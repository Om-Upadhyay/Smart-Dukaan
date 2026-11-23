const test=require('node:test');
const assert=require('node:assert/strict');
const core=require('../calc-core.js');
test('price to quantity computes ml for a partial litre purchase',()=>{const oil={price:140,baseQuantity:1,unit:'L'};assert.equal(core.calculateQuantityFromPrice(65,oil)*1000,464.2857142857143);});
test('quantity to price computes grams against kilogram rate',()=>{assert.equal(core.calculatePriceFromQuantity(750,{price:60,baseQuantity:1,unit:'kg'},'g'),45);assert.equal(core.calculatePriceFromQuantity(500,{price:60,baseQuantity:1,unit:'kg'},'g'),30);});
test('rounds fractional paise to integer minor units',()=>{assert.equal(core.calculateQuantityFromPrice(.105,{price:1,baseQuantity:100,unit:'g'}),11);});
test('rejects zero, negative, non-finite inputs and invalid rates',()=>{assert.throws(()=>core.calculateQuantityFromPrice(10,{price:0,baseQuantity:1,unit:'kg'}));assert.throws(()=>core.calculateQuantityFromPrice(-1,{price:10,baseQuantity:1,unit:'kg'}));assert.throws(()=>core.calculatePriceFromQuantity(Infinity,{price:10,baseQuantity:1,unit:'kg'}));assert.throws(()=>core.calculatePriceFromQuantity(1,{price:10,baseQuantity:0,unit:'kg'}));});
test('converts compatible units and rejects incompatible dimensions',()=>{assert.equal(core.convertUnits(2.5,'kg','g'),2500);assert.equal(core.convertUnits(2,'L','ml'),2000);assert.throws(()=>core.convertUnits(2,'kg','L'));});
