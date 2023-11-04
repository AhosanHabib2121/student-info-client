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
  const [loading, setLoading] = useState(true);

  // create account
    const createAccount = (email, password) => {
      setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // account login
    const accountLogin = (email, password) => {
      setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update profile
    const profileUpdate = (name, photo_url) => {
      setLoading(true);
        return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo_url,
        });
    };
    
    // logOut
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    // onAuthStateChanged
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        const userEmail = currentUser?.email || user?.email;
        const loggedUser = {email: userEmail};

        if (currentUser) {
          axios
            .post("https://student-info-server-bay.vercel.app/api/createToken/jwt", loggedUser, {
              withCredentials: true,
            })
            .then(() => {
              setLoading(false);
            });
        }
        else {
          axios
            .post("https://student-info-server-bay.vercel.app/api/logOut", loggedUser, {
              withCredentials: true,
            })
            .then(() => {
              setLoading(false);
             
            });
        }
      });
      return () => {
        unSubscribe();
      };
    }, []);

  const useInfo = {
    user,
    createAccount,
    profileUpdate,
    accountLogin,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={useInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
