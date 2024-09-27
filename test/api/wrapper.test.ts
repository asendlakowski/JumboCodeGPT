import { expect, test } from 'vitest'
import { GET } from "api/wrapper";

test('GET Hello World', async () => {
    const response = await GET();
    
    // Extract the body as text from the Response object
    const responseText = await response.text();
    
    // Compare the extracted text with "Hello, World!"
    expect(responseText).toBe("Hello, World!");
  });

// test('GET Hello World', async () => {
//   const response = await GET();
//   expect(response).toBe("Hello, World!")
// })