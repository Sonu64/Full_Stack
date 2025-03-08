/**
 * Callback Hell (Nested Callbacks)
   When multiple Asynchronous functions depend on each other, callbacks can get deeply nested, 
   leading to callback hell.
 */

function getUserData(callback) {
  setTimeout(() => {
    console.log("Got User Data");
    callback();
  }, 1000);
}

function getUserComments(callback) {
  setTimeout(() => {
    console.log("Got User Comments");
    callback();
  }, 1000);
}

function getComment(callback, commentID) {
  setTimeout(() => {
    console.log(`Fetched comment with ID ${commentID} successfully !`);
    callback();
  }, 1000);
}

getUserData(() => {
  getUserComments(() => {
    getComment(() => {
      console.log("All steps complete");
    }, 546355);
  });
});
