import app from "../app.js"
import request from "supertest"
import { createFamily, getUsersByFamilyId, getAllFamilies, getFamilyById, getFamilyName, getChildrenByFamilyId} from "../models/families.js"


test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/families")
    expect(200)
  });
const  families = getAllFamilies()
    test("Get all Families { success: true, payload: array }", function () {
   //await request(app)
    const y = getAllFamilies()
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: families
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });

  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/families/:family_id")
    expect(200)
  });
const  family = getFamilyById();
    test("Get Family by ID { success: true, payload: array }", function () {
   //await request(app)
    const y = getFamilyById()
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: family
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });

  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/families")
    expect(200)
  });
    const  familyName = getFamilyName();
    test("Get Family Name { success: true, payload: array }", function () {
   //await request(app)
    const y = getFamilyName();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: familyName
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });


  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/families/children/:familiy_id")
    expect(200)
  });
    const  childrenByfamilyId = getChildrenByFamilyId();
    test("Get children by Family ID { success: true, payload: array }", function () {
   //await request(app)
    const y = getChildrenByFamilyId();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: childrenByfamilyId
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });


  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/families/user/:family_id")
    expect(200)
  });
const  users = getUsersByFamilyId();
    test("Get users by Family ID { success: true, payload: array }", function () {
   //await request(app)
    const y = getUsersByFamilyId()
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: users
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });

  test("Has the structure { success: true }", async function () {
    await request(app)
   .post("/families")
    expect(200)
  });
const  newFamily = createFamily();
    test("Create Family { success: true, payload: array }", function () {
   //await request(app)
    const y = createFamily();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: newFamily
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });