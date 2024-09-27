import Prompt from './models/Prompt.js'
import mongoose from 'mongoose';

const mongodb_uri = "mongodb+srv://alanasendlakowski:RbmJ32lt3jo2nRiD@chatcluster.bquak.mongodb.net/?retryWrites=true&w=majority&appName=ChatCluster"

mongoose.connect(mongodb_uri)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

export async function POST(request: Request) {
    const requestBody = await request.json();
    const { username, query, response, query_timestamp, response_timestamp } = requestBody;

    // Save prompt and response in the database
    const newPrompt = new Prompt({
        username: username,
        query: query,
        response: response,
        query_timestamp: query_timestamp,
        response_timestamp: response_timestamp
    });

    await newPrompt.save();

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
}