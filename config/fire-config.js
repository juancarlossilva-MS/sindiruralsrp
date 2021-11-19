import firebase from 'firebase';



  const firebaseConfig = {
    apiKey: "AIzaSyDPx6fGmbOJFWeTxJHM2KQRegtbsXOOO3A",
      authDomain: "sindiruralsrp.firebaseapp.com",
      databaseURL: "https://sindiruralsrp-default-rtdb.firebaseio.com",
      projectId: "sindiruralsrp",
      storageBucket: "sindiruralsrp.appspot.com",
      messagingSenderId: "130462633564",
      appId: "1:130462633564:web:ca0ba6459240f179262099"
  };

  try {
    const app = firebase.initializeApp(firebaseConfig);
	const analytics = firebase.analytics();
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  


const fire = firebase;
export default  fire;


export async function askForPermissionToReceiveNotifications(uid){
  try {
    
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log(uid)
    console.log(token)
    fire.database().ref("tokens/"+token).set({user:uid})
    return token;

  } catch (error) {
    console.error(error);
  }
}