import React,{useState, useRef, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [login, {isLoading}]= useLoginMutation();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus()
    },[]);

    useEffect(() => {
        setErrMsg('')
    },[username, password]);

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const userData = await login({username, password}).unwrap();
            dispatch(setCredentials({...userData, username}));
            setUsername('');
            setPassword('');
            navigate('/welcome');
        } catch (err) {
            if(!err?.response === 400){
                setErrMsg('No server response');
            } else if(err.response?.status === 401){
                setErrMsg('Unauthorised');
            } else{
                setErrMsg('Login failed');
            }
            errRef.current.focus();
        }
    };

    const handleUsernameInput = (e) =>setUsername( e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    const content = isLoading ? <h1>Loading...</h1> :
    (
        <section >
            <p ref={errRef}>{errMsg}</p>
            <h1 className='my-5 text-center'>Employee Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor='username'>Username:</label><br/>
                <input 
                    type='text'
                    id='username'
                    ref={userRef}
                    value={username}
                    onChange={handleUsernameInput}
                    autoComplete='off'
                    required
                /><br/><br/>

                <label htmlFor='password'>password:</label><br/>
                <input 
                    type='password'
                    id='password'
                    ref={userRef}
                    value={password}
                    onChange={handlePasswordInput}
                    autoComplete='off'
                    required
                /><br/><br/>
                <button
                    className='p-2 bg-blue-400 rounded-lg'
                >
                    SignIn
                </button>
            </form>
        </section>
    )

  return content;
}

export default Login
