// Script to use a custom API key for this project
const yourApiKey = 'YOUR_ACTUAL_API_KEY_HERE'; // Replace this with your actual API key

// Set the API key for this process
process.env.OPENAI_API_KEY = yourApiKey;
 
console.log("Using API key:", yourApiKey);
console.log("You can use this script with 'node -r ./set-api-key.js your-main-script.js'");
console.log("This will load your custom API key before running your main script"); 