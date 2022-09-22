import { useState, useContext } from "react";

import Button from '../button/button.component';

import FormInput from "../form-input/form-input.component";

import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserFromEmailAndPassword,
   } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormField = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password } = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormField);
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserFromEmailAndPassword(email, password);
            resetFormField();
        }   catch(error) {
            if(error.code == 'auth/user-not-found'){
                alert('User not found')
            } else if (error.code == 'auth/wrong-password') {
                alert('Incorrect password. Try again.');
            }
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
        console.log(name, value);
    }

    return(
        <div className='sign-in-form-container'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <FormInput  
                    label='Email'
                    inputOptions={{
                        required: true,
                        type:'email',
                        onChange: handleChange,
                        name:'email', 
                        value: email
                    }}
                />

                <FormInput  
                    label='Password'
                    inputOptions={{
                        required: true,
                        type:'password',
                        onChange: handleChange,
                        name:'password', 
                        value:password
                    }}
                />
                
                <div className='sign-in-button-container'>
                    <Button type='submit' onClick={handleSubmit}>
                        Sign in
                    </Button>

                    <Button buttonType='google' type='submit' onClick={logGoogleUser}>
                        Sign in with Google
                    </Button>
                </div>
            </div>
    )
}

export default SignInForm;