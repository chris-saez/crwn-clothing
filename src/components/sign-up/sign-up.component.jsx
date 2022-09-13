import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { createAuthUserFromEmailAndPassword,
         createUserDocumentFromAuth, 
        } from '../../utils/firebase/firebase.utils';

import { updateProfile } from "firebase/auth";

import './sign-up.styles.scss';

import Button from '../button/button.component';

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

            if(!(password === confirmPassword)) {
                alert('Passwords do not match!');
                return;
            }

            try {
            const { user } = await createAuthUserFromEmailAndPassword(email, password);
            updateProfile(user, {
                displayName: displayName
            });
   
            const userDocRef = await createUserDocumentFromAuth(user);
            resetFormField();
            } catch(error) {
                if(error.code == 'auth/email-already-in-use'){
                    alert('Email has already been taken')
                } else {
                    alert('Error in account creation');
                    console.log(error);
                }
            }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput  
                        label='Display Name'
                        inputOptions={{
                            required: true,
                            type:'text',
                            onChange:handleChange,
                            name:'displayName', 
                            value:displayName
                        }}
                />
                  
                <FormInput  
                        label='Email'
                        inputOptions={{
                            required: true,
                            type:'email',
                            onChange:handleChange,
                            name:'email', 
                            value:email
                        }}
                />
                
                <FormInput  
                        label='Password'
                        inputOptions={{
                            required: true,
                            type:'password',
                            onChange:handleChange,
                            name:'password', 
                            value:password
                        }}
                />

                <FormInput  
                        label='Confirm Password'
                        inputOptions={{
                            required: true,
                            type:'password',
                            onChange:handleChange,
                            name:'confirmPassword', 
                            value:confirmPassword
                        }}
                />

                <Button buttonType='inverted' type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp;