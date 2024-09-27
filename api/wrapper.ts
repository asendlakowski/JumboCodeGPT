export async function GET() {
    try {
      const response = await fetch("https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/", {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // Extract the body content as text
      const textData = await response.text();
  
     return new Response(textData, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    } catch (error) {
      console.error('Error fetching Hello, World!', error);
      throw error;
    }
}
  

// export async function GET() {
//     try {
//       const response = await fetch("https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/", {
//         method: 'GET',
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       const data = await response.text();
//       return data; // This should return "Hello, World!"
//     //   const data = await response.text();
//     //   console.log(response)
//     //   return data; // Returns "Hello, World!" as a string
//     } catch (error) {
//       console.error('Error fetching Hello, World!', error);
//       throw error; // Propagate the error to the caller
//     }
//   }