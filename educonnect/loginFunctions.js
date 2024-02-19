import {auth} from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


 

async function register(email,password){
await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    const result = {
        user: user,
        success: true
    
    };
    return result;
    // ...
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === "auth/email-already-in-use"){
      alert("Email already in use");}
    const result = {
        success: false,
        error: error
    };
    console.log(errorCode);
    return result;
    // ..
  });
};

export { register}