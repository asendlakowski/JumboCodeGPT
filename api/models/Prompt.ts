import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
    username: String, // Use the token or userID to track prompts
    query: String,
    response: String,
    query_timestamp: String,
    response_timestamp: String
});

// Export the model using ES Module syntax
const Prompt = mongoose.model('Prompt', promptSchema);
export default Prompt;