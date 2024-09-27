export async function POST(request: Request) {
    try {
        const requestBody = await request.json();
        const { username, password } = requestBody;
  
      // Send POST request to the /login endpoint
      const response = await fetch("https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      // Handle response status
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // Extract the JWT from the response body
      const jsonData = await response.json();
  
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