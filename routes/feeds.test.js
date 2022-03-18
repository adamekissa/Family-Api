import app from "../app.js"
import request from "supertest"
import { createSolid, createFeed, getAllFeeds, getFeedsByChildId, getLastFeedById, getSolidsByChildId} from "../models/feeds.js"


test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/feeds")
    expect(200)
  });
const  feeds = getAllFeeds();
    test("Get all Feeds { success: true, payload: array }", function () {
   //await request(app)
    const y = getAllFeeds();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: feeds
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });

  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/feeds/:child_id")
    expect(200)
  });
    const  feedsByChild = getFeedsByChildId()
    test("Get Feeds by Child ID { success: true, payload: array }", function () {
   //await request(app)
    const y = getFeedsByChildId();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: feedsByChild
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });

  test("Has the structure { success: true }", async function () {
    await request(app)
   .get("/feeds/solids/:child_id")
    expect(200)
  });
    const  solidByChildId = getSolidsByChildId();
    test("Get Solids by Child ID { success: true, payload: array }", function () {
   //await request(app)
    const y = getSolidsByChildId();
    const actual = { success: true, 
                     payload: y
                    }
    const expected = { success: true, 
                      payload: solidByChildId
                     }
   //console.log(expected)
    expect(actual).toEqual(expected);
  });
