
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { FormError } from '../components/FormError';
import { FormWarning } from '../components/FormWarning';

export function Signin() {
    // const navigate = useNavigate();
    const [formError, setFormError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
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
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: formData.username,
                password: formData.password
            })

            setFormError("");
            localStorage.setItem("token", response.data.token);
            setFormData({
                username: "",
                password: ""
            })
            console.log(response.data);
            // navigate("/dashboard");
        } catch(e) {
            setFormError(e.response.data.message);
        }
    }

    return (
        <div className='bg-sky-900 h-screen flex justify-center'>
            <div className='flex justify-center items-center'>
                <div className='bg-white hover:shadow-lg hover:shadow-black duration-150 rounded-md text-center p-10'>
                    <Heading label={"Signin"} />
                    <Subheading label={"Signin to your account"} />
                    <InputBox label={"Enter your username"} name={"username"} placeholder={"dev@123"} type={"text"} onChange={handleChange} />
                    <InputBox label={"Enter your password"} name={"password"} placeholder={"Dev@123"} type={"password"} onChange={handleChange} />
                    <FormError label={formError} />
                    <Button label={"Signin"} onClick={handleSubmit}/>
                    <FormWarning label={"Don't have an account?"} text={"Signup"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}