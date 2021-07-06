import { withIronSession } from "next-iron-session";

var admin = require("firebase-admin");

var serviceAccount = require("config/serviceAccountKey.json");

if (admin.apps.length === 0) {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sindiruralsrp-default-rtdb.firebaseio.com"
  });
}


export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
    

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
	if (req.method === "DELETE") {
      
        req.session.set("user", null);
        await req.session.save();
        return res.status(201).send("");
    }

    return res.status(404).send("");
  },
  {
    cookieName: "MYSITECOOKIE22",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);