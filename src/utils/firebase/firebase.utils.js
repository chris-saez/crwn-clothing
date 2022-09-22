import { initializeApp } from 'firebase/app';
import { getAuth, 
         signInWithPopup, 
         GoogleAuthProvider,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged
        } from 'firebase/auth';
        import {
            getFirestore,
            doc,
            getDoc,
            setDoc
        } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCWgrmxviQJIlHBwR6NUAkGMx3ESpDaCeA",
    authDomain: "crwn-clothing-db-4a198.firebaseapp.com",
    projectId: "crwn-clothing-db-4a198",
    storageBucket: "crwn-clothing-db-4a198.appspot.com",
    messagingSenderId: "750128111993",
    appId: "1:750128111993:web:9cd98bcd431c7732b04fa8",
    measurementId: "G-P5W1J2SR7Q"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log('error creating the user', error);
        }
    }

    return userDocRef;
}

export const createAuthUserFromEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserFromEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutAuthUser = async () => {
    return await signOut(auth);
}

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);