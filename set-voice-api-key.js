// Script to use a custom API key for voice functionality
const yourApiKey = 'YOUR_VOICE_API_KEY_HERE'; // Replace this with your actual API key

// Set the API key for this process using the new variable name
process.env.VOICE_OPENAI_API_KEY = yourApiKey;
 
console.log("Using VOICE_OPENAI_API_KEY:", yourApiKey);
console.log("You can use this script with 'node -r ./set-voice-api-key.js your-main-script.js'");
console.log("This will load your custom API key before running your main script"); 