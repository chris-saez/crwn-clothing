import SignUp from "../../components/sign-up/sign-up.component";
import { auth,
         signInWithGooglePopup, 
         createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign in</h1>
            <button onClick={logGoogleUser}>
                Sign with Google Popup
            </button>
            <SignUp />

        </div>
    )
};

export default SignIn;