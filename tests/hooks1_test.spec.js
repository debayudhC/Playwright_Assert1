const {test,expect} = require('@playwright/test');

test.beforeEach(async({page} ) =>{
   console.log ('Inside beforeEach block');
})

test.afterAll(async({page}) =>{
    console.log ('Inside afterAll block');
 })

 test('Test block1',async({page})=>{
    console.log("Inside test block 1")
 })

 test('Test block2',async({page})=>{
    console.log("Inside test block 2")
 })
