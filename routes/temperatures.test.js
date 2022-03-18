import app from "../app.js"
import request from "supertest"
import { getAllTemperatures, getTemperaturesByChildId } from "../models/temperatures.js"


test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/temperatures")
    expect(200)
  });
    const  allTemp = getAllTemperatures();
    test("Get all Temperatures { success: true, payload: array }", function () {
   //await request(app)
    const y = getAllTemperatures();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: allTemp
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });

  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/temperatures/:child_id")
    expect(200)
  });
    const  tempByChildId = getTemperaturesByChildId();
    test("Get Temperatures By Child { success: true, payload: array }", function () {
   //await request(app)
    const y = getTemperaturesByChildId();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: tempByChildId
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });