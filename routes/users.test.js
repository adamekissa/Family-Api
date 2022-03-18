import app from "../app.js"
import request from "supertest"
import { getAllUsers, getUserByEmail, getUserById } from "../models/users.js"
import { getUsersByFamilyId } from "../models/families.js";


test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/users")
    expect(200)
  });
    const  allUsers = getAllUsers();
    test("Get all users { success: true, payload: array }", function () {
   //await request(app)
    const y = getAllUsers();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: allUsers
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });

  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/users/:user_id")
    expect(200)
  });
    const  userById = getUserById();
    test("Get user by ID { success: true, payload: array }", function () {
   //await request(app)
    const y = getUserById();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: userById
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });


  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/users/email/:user_email")
    expect(200)
  });
    const  userByEmail = getUserByEmail();
    test("Get user by Email { success: true, payload: array }", function () {
   //await request(app)
    const y = getUserByEmail();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: userByEmail
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });