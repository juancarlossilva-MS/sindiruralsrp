var admin = require("firebase-admin");

var serviceAccount = require("config/serviceAccountKey.json");

if (admin.apps.length === 0) {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sindiruralsrp-default-rtdb.firebaseio.com"
  });
}

export default admin;