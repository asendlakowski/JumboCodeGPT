import { useLocation } from "wouter";
import { useState } from 'react';

export default function Loginpage() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [, setLocation] = useLocation();

    /**
     * Validates login
     * @author Alana Sendlakowski
     */
    const attemptLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log('Login Successful', data);
            // setLocation('/cheatchat', { token: data.token });
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('username', username);
            setLocation(`/chat`); 
          } else {
            setErrorMessage('Invalid username or password');
          }
        } catch (error) {
          console.error('Error during login', error);
        }
      };


  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-sky-500/50 ">
        <h1 className="text-2xl mx-8">JumboCodeGPT (Alana's Version)</h1>
        <form className="bg-white p-6 rounded-lg shadow-md w-80 m-8" onSubmit={attemptLogin}>
            {/* <h2 className="text-xl mb-2" >Login</h2> */}
            <h3 className="text-lg">Username: </h3>
            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"></input>
            <h3>Password: </h3>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"></input>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button type="submit" className="mt-4 py-2 px-5 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500">Login</button>

        </form>
      </div>
    </>
  );
}
