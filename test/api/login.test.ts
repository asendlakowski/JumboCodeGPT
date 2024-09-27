import { assert, test } from 'vitest';
import { POST } from "api/login";

async function getLoginTest(username: string, password: string) {
  const request = new Request(
    "http://localhost:5173/login?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password)
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
  assert.isTrue(returnedJSON.token.length > 0, 'JWT token is returned');
}

test('GET Login Successful Responses', async () => {
  await getLoginTest("alana", "Close-Plates9-Wooden");
});

// 200
// Response body: {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYW5hIiwiZXhwaXJlcyI6MTcyNjcxMjQ5MiwiaWF0IjoxNzI2NzA4ODkyfQ.lWLIkgypKKmK9sLDUn9sE9oj11ghreYunLSiH84Wc9c"}


// // import { assert, test } from 'vitest'
// // import { POST } from "api/login";

// // async function getLoginTest(username, password) {
// //   const request = new Request("http://localhost:5173/login?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
// //   const response = POST(request);
// //   assert.isTrue(response.ok);
// //   const returnedJSON = await response.json();
// //   assert.deepEqual(returnedJSON, {username, length: username.length}, 'matches original');
// //   assert.deepEqual(returnedJSON, {password, length: password.length}, 'matches original');
// // }

// // test('GET Login Successful Responses', async () => {
// //     getLoginTest("Test", "1234");
// // });

// import { assert, test } from 'vitest';
// import { POST } from "api/login";

// async function getLoginTest(username: string, password: string) {
//   const request = new Request(
//     "http://localhost:3000/login?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password)
//   );

//   // Await the POST function to resolve the promise
//   const response = await POST(request);

//   // Check if the response is OK (HTTP status code 200-299)
//   assert.isTrue(response.ok, 'Response should be OK');

//   // Extract the JSON body from the response
//   const returnedJSON = await response.json();

//   // Perform your assertions based on what the response body should contain
//   // Assuming the returned JSON has the format { username: ..., token: ... } (replace with your expected structure)
//   assert.deepEqual(returnedJSON.username, username, 'Username matches');
//   assert.isTrue(returnedJSON.token.length > 0, 'JWT token is returned');
// }

// test('GET Login Successful Responses', async () => {
//   await getLoginTest("Test", "1234");
// });

// // test('GET User Missing Name Param Error', async () => {
// //   const request = new Request("http://localhost:5173/users?name=");
// //   const response = await GET(request);
// //   assert.strictEqual(400, response.status);
// //   const returnedJSON = await response.json();
// //   assert.deepEqual(returnedJSON, {error: "No name provided"}, 'matches original');
// // });
