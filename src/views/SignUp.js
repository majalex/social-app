import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';


const SignUp = (props) => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [signUpMessage, setSignUpMessage] = useState('');

    const [signUpDone, setSignUpDone] = useState(false);



    const validate = () => {
        let validationErrors = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false,
        };

        // user name

        if (formData.username.trim().length < 4) {
            validationErrors.username = true;
            setErrors(prevErrors => {
                return { ...prevErrors, username: "Username should have at least 4 characters" };
            });
        } else if (!/^[^\s]*$/.test(formData.username.trim())) {
            validationErrors.username = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: "Username should'n have empty characters",
                };
            });
        } else {
            validationErrors.username = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: "",
                };
            });
        }

        // E-mail

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "There is no valid email adress",
                };
            });
        } else {
            validationErrors.email = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "",
                };
            });
        }

        // Password

        if (formData.password.trim().length < 6) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password should have at least 6 characters",
                };
            });
        } else if (!/^[^\s]*$/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password should'n have empty characters",
                };
            });
        } else if (!/[!@#$%^&*()_+\-=[\]{};';"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password must contain one of charts ! # @ $ %",
                };
            });
        } else {
            validationErrors.password = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "",
                };
            });
        }

        // Confirm password

        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    confirmPassword: "Passwords should be the same",
                };
            });
        } else {
            validationErrors.password = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    confirmPassword: "",
                };
            });
        }

        return (
            !validationErrors.username &&
            !validationErrors.email &&
            !validationErrors.password &&
            !validationErrors.confirmPassword
        );
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return
        }

        axios
            .post("https://akademia108.pl/api/social-app/user/signup", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
            .then((res) => {
                console.log(res.data);

                let resData = res.data;

                if (resData.signedup) {
                    setSignUpMessage("Account created")
                    setSignUpDone(true)
                } else {
                    if (res.data.message.username) {
                        setSignUpMessage(resData.message.username[0])
                    } else if (resData.message.email) {
                        setSignUpMessage(resData.message.email[0])
                    }
                };
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="signUp">

            {props.user && <Navigate to="/" />}
            <form onSubmit={handleSubmit}>
                {signUpMessage && <h2>{signUpMessage}</h2>}
                <input
                    type="text"
                    name="username"
                    placeholder="User name"
                    onChange={handleInputChange} />

                {errors.username && <p>{errors.username}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={handleInputChange} />

                {errors.email && <p>{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange} />

                {errors.password && <p>{errors.password}</p>}

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder=" Confirm password"
                    onChange={handleInputChange} />

                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

                <button className='btn' disabled={signUpDone}>Sign Up</button>

                {signUpDone &&
                    (<div>
                        <Link to='/login' className='btn'>Go to login</Link>
                    </div>
                    )}

            </form>
        </div>
    );

};

export default SignUp;