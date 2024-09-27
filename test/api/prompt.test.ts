import { assert, test } from 'vitest';
import { POST } from "api/prompt";

async function getPromptTest(jwt: string, query: string) {
  const request = new Request(
    "http://localhost:5173/prompt?jwt=" + encodeURIComponent(jwt) + "&query=" + encodeURIComponent(query)
  );

  // Await the POST function to resolve the promise
  const response = await POST(request);

  // Log status and any response content for debugging
  console.log('Response status:', response.status);
  const textData = await response.text(); // Fetching text if JSON is not returned
  console.log('Response body:', textData);

  // Check if the response is OK (HTTP status code 200-299)
  assert.isTrue(response.ok, 'Response should be OK');

  // If the response is OK, extract the JSON body from the response
  const returnedJSON = JSON.parse(textData);
  
  // Perform your assertions based on what the response body should contain
//   assert.isTrue(returnedJSON.token.length > 0, 'JWT token is returned');
}

test('GET Login Successful Responses', async () => {
  await getPromptTest("alana", "Close-Plates9-Wooden");
});