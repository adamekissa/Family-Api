import app from "../app.js"
import request from "supertest"
import { getAllUsers, getUserByEmail, getUserById } from "../models/users.js"
import { getAllWeights, getWeightsByChildId } from "../models/weights.js";


test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/weights")
    expect(200)
  });
    const  allWeights = getAllWeights();
    test("Get all Weights { success: true, payload: array }", function () {
   //await request(app)
    const y = getAllWeights();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: allWeights
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });

  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/weights/:child_id")
    expect(200)
  });
    const  weightsByChildId = getWeightsByChildId();
    test("Get weigts by Child Id { success: true, payload: array }", function () {
   //await request(app)
    const y = getWeightsByChildId();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: weightsByChildId
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });