// - `/prompt` (POST): If the user is authenticated and provides a correctly
// formatted OpenAI prompt, the endpoint sends the prompt to OpenAI and returns
// the response it receives from OpenAI. 

// Example Frontend Fetch:
// fetch("https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/prompt", {
//    method: "POST",
//    headers: {
//        Authorization: "Bearer <JWT>" // Add your JWT here!
//    },
//    body: JSON.stringify({
//        model: "gpt-4o",
//        messages: [{ role: "user", content: "What is 1+1?" }]
//    })
// }).then(res => res.json()).then(res => console.log(res))

export async function POST(request: Request) {
    try {
      // Get the query parameters from the request URL
        const requestBody = await request.json();
        const { token, prompts, responses } = requestBody;
        console.log("PROMPTS HERE ", prompts)
        const messages = [{role: "system", content: "You are a helpful assistant but you end every response by talking about an episode in the television show Glee! You are a Gleek!"}]
        for (let i = 0; i < responses.length; i++) {
          messages.push({role: "user", content: prompts[i]})
          console.log("PROMPT ", i, " ", prompts[i])
          messages.push({role: "assistant", content: responses[i]})
          console.log("RESPONSES ", i, " ", responses[i])
        }
        messages.push({role: "user", content: prompts[prompts.length - 1]})
  
      // Send POST request to the /login endpoint
      const response = await fetch("https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/prompt", {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + token // Add your JWT here!
        },
        body: JSON.stringify({
            model: "gpt-4o",
            // messages: [{role: "system", content: "You are a helpful assistant but you say every answer in pig latin"}, { role: "user", content: query }]
            // messages: [{role: "system", content: "You are a helpful assistant but you give every answer in the form of a movie or song quote"}, { role: "user", content: query }]
            messages: messages
            // messages: [{role: "system", content: "You are a not a helpful assistant and you always give the opposite answer. For example, if you were asked what country paris is in you would say USA"}, { role: "user", content: query }]
        })
      });
  
      // Handle response status
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // Extract the JWT from the response body
      const jsonData = await response.json();
      console.log("JSON DATA ", JSON.stringify(jsonData))
  
      return new Response(JSON.stringify(jsonData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error logging in:', error);
  
      return new Response('Login failed', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  }



