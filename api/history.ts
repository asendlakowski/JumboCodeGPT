import Prompt from './models/Prompt.js'
import mongoose from 'mongoose';

const mongodb_uri = "mongodb+srv://alanasendlakowski:RbmJ32lt3jo2nRiD@chatcluster.bquak.mongodb.net/?retryWrites=true&w=majority&appName=ChatCluster"

mongoose.connect(mongodb_uri)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get('username'); // Extract the username from query string

  if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
      });
  }

  try {
      // Query database for the user's prompts
      const prompts = await Prompt.find({ username }).sort({ timestamp: -1 }).exec();

      return new Response(JSON.stringify(prompts), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
      console.error('Error retrieving prompts:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  }
}