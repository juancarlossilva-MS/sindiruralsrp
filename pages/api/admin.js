console.log("estamosaki");

var admin = require("firebase-admin");

var serviceAccount = require("config/serviceAccountKey.json");

if (admin.apps.length === 0) {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sindiruralsrp-default-rtdb.firebaseio.com"
  });
}

export default getAllUsers = async (req, res) => {
  var allUsers = [];
  return admin.auth().listUsers()
      .then(function (listUsersResult) {
          listUsersResult.users.forEach(function (userRecord) {
              // For each user
              var userData = userRecord.toJSON();
              allUsers.push(userData);
          });
          res.status(200).send(JSON.stringify(allUsers));
      })
      .catch(function (error) {
          console.log("Error listing users:", error);
          res.status(500).send(error);
      });
}