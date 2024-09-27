// import { useLocation } from "wouter";
import { Link, useLocation } from "wouter";
import { useRef, useEffect, useState } from 'react';

export default function Chatpage() {
    const [, setLocation] = useLocation();
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [query, setQuery] = useState('');
    const [responses, setResponses] = useState<[string, string][]>([])
    const [prompts, setPromts] = useState<[string, string][]>([])

    const responsesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        const storedUsername = sessionStorage.getItem('username');
        if (storedToken) {
            setToken(storedToken);
        } else {
                setLocation('/');
        }
        if (storedUsername) {
            setUsername(storedUsername);
            getHistory(storedUsername);
        }
        
        console.log("STORED TOKEN ", storedToken)
    }, []);

    const getHistory = async (username) => {
        console.log("USERNAME ", username)
        const response = await fetch(`/api/history?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();
        for (const old_prompt of responseData) {
            setPromts((prevPrompts) => [...prevPrompts, [old_prompt.query, old_prompt.query_timestamp]]);
            setResponses((prevResponses) => [...prevResponses, [old_prompt.response, old_prompt.response_timestamp]]);
        }
        console.log("HISTORY DATA ", responseData);
    };

    const sendQuery = async () => {
        const curr_query = query
        setQuery("")  
        console.log("TOKEN ", token)
        console.log("QUERY ", curr_query)
        const query_timestamp = getCurrentTime();
        // if (prompts.length == 0) {
        // prompts = [[curr_query, query_timestamp]]
        // } else {
        
        const newPrompts = [...prompts, [curr_query, query_timestamp]];
        // }
        console.log("PROMPTS ", prompts)
        const response = await fetch('/api/prompt', {
            method: "POST",
            body: JSON.stringify({
                token: token,
                prompts: newPrompts.map(subArray => subArray[0]),
                responses: responses.map(subArray => subArray[0])
                
            })
        });
        // console.log("RESPONSE ", response)
        const responseData = await response.json();
        const response_timestamp = getCurrentTime();
        // console.log("RESPONSE DATA: ", responseData);

        // Access the content in the response data
        const content = responseData.message?.content;
        console.log("Content: ", content);
        setPromts([...prompts, [curr_query, query_timestamp]]);
        setResponses((prevResponses) => [...prevResponses, [responseData.message?.content, response_timestamp]]);

        const store_response = await fetch('/api/storePrompt', {
            method: "POST",
            body: JSON.stringify({
                username: username,
                query: curr_query,
                response: responseData.message?.content,
                query_timestamp: query_timestamp,
                response_timestamp: response_timestamp
            })
        });

        console.log("STORE RESPONSE " + store_response);
        // const user_query = document.getElementById('query');
        // if (user_query) {
        //     user_query.value = ""
        // }
        

    }

    const getCurrentTime = () => {
        const date = new Date(); // Always generate a new Date object to get the current time
        const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
        const curr_time = hours + ':' + date.getMinutes() + ":" + date.getSeconds() + 
            " " + (date.getHours() >= 12 ? "PM" : "AM");
        return curr_time;
    };

    useEffect(() => {
        // Scroll to bottom whenever responses are updated
        if (responsesEndRef.current) {
            responsesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [responses]);

    return (
        <>
          <div className="flex flex-col justify-center items-center h-screen bg-sky-500/50 ">
            <div className="flex flex-col p-6 w-full max-w-lg h-[90vh] bg-white rounded-lg border border-gray-300">
                <h1 className="text-2xl mx-8 mb-4">JumboCodeGPT (Alana's Version)</h1>
                <div id="responses" className="overflow-auto ">
                {responses.map(([response, time], index) => (
                    <div key={index}>
                        <div key={`prompt${index}`} id="prompt">
                            <div className="block ml-2 mb-1 border rounded p-3">{prompts[index][0]}</div>
                            <h1 className="text-xs mb-2 text-gray-700">{prompts[index][1]}</h1>
                        </div>
                        <div key={`response${index}`} id="response">
                            <div className="block ml-2 mb-1 border rounded p-3 bg-gray-100">{response}</div>
                            <h1 className="text-xs mb-2 text-gray-700">{time}</h1>
                        </div>
                    </div>
                ))}
                    <div ref={responsesEndRef} /> {/* Scroll target */}
                </div>

                <input type="text" id="query" onChange={(e) => setQuery(e.target.value)} placeholder="Ask me something..."  value={query} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"></input>
                <button type="submit" className=" mt-4 py-2 px-5 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500" onClick={sendQuery}>Ask</button>
            </div>
          </div>
        </>
      );
}
