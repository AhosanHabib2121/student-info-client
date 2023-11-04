import {createContext, useEffect, useState} from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebaseConfig/Firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);

  // create account
  const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // account login
  const accountLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update profile
    const profileUpdate = (name, photo_url) => {
        return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo_url,
        });
    };
    
    // logOut
    const logOut = () => {
        return signOut(auth);
    }


    // onAuthStateChanged
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }

            if (currentUser) {
                axios.post("http://localhost:5000/api/createToken/jwt",
                    loggedUser,
                    {
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
                    console.log(res.data);
                  });
            } else {
                axios
                  .post("http://localhost:5000/api/logOut", loggedUser, {
                    withCredentials: true,
                  })
                  .then((res) => {
                    console.log(res.data);
                  });
            }
            
        });
        return () => {
            unSubscribe()
        }
    },[])

  const useInfo = {
    user,
    createAccount,
    profileUpdate,
    accountLogin,
    logOut,
  };

  return (
    <AuthContext.Provider value={useInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
