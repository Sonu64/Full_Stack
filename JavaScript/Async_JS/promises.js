/**
 * A Promise is an object that represents the eventual completion (or failure) of an 
 * Asynchronous Operation. It helps handle asynchronous tasks more efficiently than callbacks, 
 * avoiding callback hell.
 * 
 * 
 * 
 * 
 * Promise States
A Promise can be in one of three states:
_________________________________________________________________________
Pending – The initial state, before the operation completes.
Fulfilled – The operation completed successfully.
Rejected – The operation failed.
Once a Promise is either fulfilled or rejected, it cannot change state.
_________________________________________________________________________
 */

const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    // Section for Async code, stimulating it with setTimeOut()
    let userData = {};
    let success = false;
    setTimeout(() => {
      // maybe we get the values by fetching from Database
      userData["id"] = 3423;
      userData["username"] = "Sourakanti Mandal";
      userData["email"] = "sample@gmail.com";
      userData["appointments"] = [2134, 567, 4234];
      console.log("Fetched User Data Successfully !");
      success = true;

      if (success) {
        resolve(userData);
      } else {
        reject("Error fetching user data !");
      }
    }, 4000);
  });
};

fetchUserData()
  .then((resolveReturnValue) => {
    console.log(resolveReturnValue);
  })
  .catch((rejectReturnValue) => {
    console.log(rejectReturnValue);
  });
