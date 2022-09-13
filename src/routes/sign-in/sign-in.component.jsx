import SignUp from "../../components/sign-up/sign-up.component";

import Button from '../../components/button/button.component';



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
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <Button buttonType='google' type='submit' onClick={logGoogleUser}>
                Sign with Google
            </Button>

            <SignUp />

        </div>
    )
};

export default SignIn;