import app from "../app.js"
import request from "supertest"
import { getAllNappies, getNappiesByChildId} from "../models/nappies.js"


test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/nappies")
    expect(200)
  });
    const  allNappies = getAllNappies();
    test("Get all Nappies { success: true, payload: array }", function () {
   //await request(app)
    const y = getAllNappies();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: allNappies
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });


  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/nappies/:child_id")
    expect(200)
  });
    const  nappiesByChild = getNappiesByChildId();
    test("Get Nappies by Child { success: true, payload: array }", function () {
   //await request(app)
    const y = getNappiesByChildId();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: nappiesByChild
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });