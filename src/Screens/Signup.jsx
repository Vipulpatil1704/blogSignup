import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../Components/css/Signup.css'
export default function Signup() {
    let navigate=useNavigate();
    const [file,setFile]=useState();
    const [isEmailValid,setIsEmailValid]=useState(true);
    const [EmailExist,setEmailExist]=useState(false);
    const [userNameExist,setUserNameExist]=useState(false);
    const [isUsernameValid,setIsUsernameValid]=useState(true);
    const [isPasswordValid,setIsPasswordValid]=useState(true);
    const [credentials, setCredentials] = useState({ email: '', username: '', password: '', profileName: ''});
    function handleChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const formData=new FormData();
        formData.append('email',credentials.email);
        formData.append('username',credentials.username);
        formData.append('password',credentials.password);
        formData.append('profileName',credentials.profileName);
        formData.append('profilePicture',file);
        const response=await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            body:formData
        })
        if(response.status!==201){
            const data=await response.json();
            if(data.key=='email'){
                setEmailExist(true);
            }
            if(data.key=='username'){
                setUserNameExist(true);
            }
            !data.key &&  data.errors.forEach((item)=>{
                if(item.path==='email'){
                    setIsEmailValid(false);
                }
                if(item.path==='username'){
                    setIsUsernameValid(false);
                }
                if(item.path==='password'){
                    setIsPasswordValid(false);
                }
            })
        }
        if(response.status==201){
            const data=await response.json();
            localStorage.setItem('token',data.token);
            navigate("/post");

        }
    }
    return (
        <div>
            <form enctype="multipart/form-data" className='w-full sm:w-1/2 m-auto' onSubmit={handleSubmit}>
                <div>
                    {/* By Default text will take 4xl side on mobile screen and on md screen it will gets change to 5xl and on lg 6xl */}
                    <div className='text-4xl text-4xl md:text-5xl lg:text-6xl font-bold my-9 text-center'>Signup</div>
                    <div className='m-4 sm:m-auto'>
                        <div className='w-full'>
                            <label className='text-lg font-medium required' htmlFor='email'>Email Address</label>
                            <br />
                            <input className='border-2 border-gray-400 w-full text-lg' type='email' required id='email' name='email' value={credentials.email} onChange={handleChange} />
                            {
                                isEmailValid ? null :<span className='invalid'>INVALID EMAIL</span>
                            }
                            {
                                EmailExist ? <span className='invalid'>Email already exists</span>:null
                            }
                        </div>
                        <div className='my-2'>
                            <label className='text-lg font-medium required' htmlFor='username required'>Username</label>
                            <br />
                            <input className='border-2 border-gray-400 w-full text-lg' type='text' required id='username' name='username' value={credentials.username} onChange={handleChange} />
                            {
                                isUsernameValid ? null :<span className='invalid'>INVALID USERNAME</span>
                            }
                               {
                                userNameExist ? <span className='invalid'>UserName already exists</span>:null
                            }
                        </div>
                        <div className='my-2'>
                            <label className='text-lg font-medium required' htmlFor='password'>Password</label>
                            <br />
                            <input className='border-2 border-gray-400 w-full text-lg' type='password' required id='password' name='password' value={credentials.password} onChange={handleChange} />
                            {
                                isPasswordValid ? null : <span className='invalid'>INVALID PASSWORD</span>
                            }
                        </div>
                        <div className='my-2'>
                            <label className='text-lg font-medium' htmlFor='name'>Name</label>
                            <br />
                            <input className='border-2 border-gray-400 w-full text-lg' type='text' id='name' name='profileName' value={credentials.profileName} onChange={handleChange} />
                        </div>
                        <div className='my-2'>
                            <label className='text-lg font-medium' htmlFor='profilePicture'>Profile Picture</label>
                            <br />
                            <input className='w-full' type='file' id='profilePicture' name='file' onChange={(e)=>setFile(e.target.files[0])} />
                        </div>
                        <div className='my-2'>
                            <label className='text-lg font-medium terms' htmlFor='terms'>Terms and conditions<br /><span className='font-light'><a href=''>Read More</a></span></label>
                            <input required className='mx-4' type='checkbox' id='terms' name='terms' />
                        </div>
                        <div className='my-2'>
                            <button className='border-2 border-indigo-400 w-full h-12 ' type='submit' required>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
