
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { InputBox } from '../components/InputBox';

export function Signup() {
    return (
        <div className='bg-slate-600 h-screen flex justify-center'>
            <div className='flex justify-center items-center'>
                <div className='bg-white rounded-md text-center p-10'>
                    <Heading label={"Signup"} />
                    <Subheading label={"Create an account"} />
                    <InputBox label={"Enter your username"} placeholder={"dev@123"} type={"text"} />
                    <InputBox label={"Enter your first name"} placeholder={"Jack"} type={"text"} />
                    <InputBox label={"Enter your last name"} placeholder={"Smith"} type={"text"} />
                    <InputBox label={"Enter your password"} placeholder={"Dev@123"} type={"password"} />
                </div>
            </div>
        </div>
    )
}