import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: 'AIzaSyA5y_Nbcuj5jTTvSTAVF_miX1M2pGuLO9c',
  authDomain: 'meuapp-39405.firebaseapp.com',
  databaseURL: 'https://meuapp-39405-default-rtdb.firebaseio.com',
  projectId: 'meuapp-39405',
  storageBucket: 'meuapp-39405.appspot.com',
  messagingSenderId: '583908910634',
  appId: '1:583908910634:web:25f7143b0c355d13d30553',
  measurementId: 'G-5B8KWJ051K',
};

if(!firebase.apps.length){
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
}


export default firebase;