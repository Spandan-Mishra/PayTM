
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormWarning } from '../components/FormWarning';
import { Error } from '../components/Error';

export function Signup() {
    const navigate = useNavigate();
    const [formError, setFormError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
         setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password
            })

            setFormError("");
            localStorage.setItem("token", response.data.token);
            setFormData({
                username: "",
                firstName: "",
                lastName: "",
                password: ""
            })
            navigate("/dashboard");
        } catch(e) {
            setFormError(e.response.data.message);
        }
    }

    return (
        <div className='bg-sky-900 h-screen flex justify-center'>
            <div className='flex justify-center items-center'>
                <div className='bg-white hover:shadow-lg hover:shadow-black duration-150 rounded-md text-center p-10'>
                    <Heading label={"Signup"} />
                    <Subheading label={"Create an account"} />
                    <InputBox label={"Enter your username"} name={"username"} placeholder={"dev@123"} type={"text"} onChange={handleChange} size={"sm"} />
                    <InputBox label={"Enter your first name"} name={"firstName"} placeholder={"Jack"} type={"text"} onChange={handleChange} size={"sm"} />
                    <InputBox label={"Enter your last name"} name={"lastName"} placeholder={"Smith"} type={"text"} onChange={handleChange} size={"sm"} />
                    <InputBox label={"Enter your password"} name={"password"} placeholder={"Dev@123"} type={"password"} onChange={handleChange} size={"sm"} />
                    <Error label={formError} size="sm" />
                    <Button label={"Signup"} onClick={handleSubmit} variant="primary" />
                    <FormWarning label={"Already have an account?"} text={"Signin"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}