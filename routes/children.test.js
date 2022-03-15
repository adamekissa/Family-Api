import app from "../app.js"
import request from "supertest"
import { getAllChildren, getChildById, createChild } from "../models/children.js";


test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/children")
  
    expect(200)
  });

const  children = getChildById()

  test("Get all children { success: true, payload: array }", function () {
    
   //await request(app)
    const y = getAllChildren()
    const actual = { success: true, 
        payload: y }
    
    const expected = { success: true, 
        payload: children }
  
  
   //console.log(expected)
   
   expect(actual).toEqual(expected);
  });
  

  test("Get Children by child ID { success: true }", async function () {
    await request(app)
   .get("/children/:child_id")
  
    expect(200)
  });

const  child = getChildById()

  test("Has the structure { success: true, payload: array }", function () {
    
   //await request(app)
    const y = getChildById()
    const actual = { success: true, 
        payload: y }
    
    const expected = { success: true, 
        payload: child }
  
  
   //console.log(expected)
   
   expect(actual).toEqual(expected);
  });