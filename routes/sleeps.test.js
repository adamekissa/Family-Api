import app from "../app.js"
import request from "supertest"
import { getAllSleeps, getSleepsByChildID } from "../models/sleeps.js"


test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/sleeps")
    expect(200)
  });
    const  allsleeps = getAllSleeps();
    test("Get all Sleeps { success: true, payload: array }", function () {
   //await request(app)
    const y = getAllSleeps();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: allsleeps
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });
  
  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/sleeps/:child_id")
    expect(200)
  });
    const  sleepsByChildId = getSleepsByChildID();
    test("Get all sleeps by Child { success: true, payload: array }", function () {
   //await request(app)
    const y = getSleepsByChildID();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: sleepsByChildId
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });