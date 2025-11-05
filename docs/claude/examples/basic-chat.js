/**
 * Basic Claude Chat Example
 *
 * This example demonstrates the simplest way to interact with Claude.
 * Perfect for getting started or building simple Q&A applications.
 *
 * Prerequisites:
 * - npm install @anthropic-ai/sdk dotenv
 * - Set ANTHROPIC_API_KEY in your .env file
 *
 * Usage:
 * node basic-chat.js
 */

import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

// Initialize the Claude client
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Send a message to Claude and get a response
 * @param {string} userMessage - The message to send to Claude
 * @returns {Promise<string>} Claude's response
 */
async function chat(userMessage) {
  try {
    // Create a message request
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',  // Latest Sonnet model
      max_tokens: 1024,                     // Maximum response length
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ],
    });

    // Extract the text from the response
    const responseText = response.content[0].text;

    // Log token usage for monitoring
    console.log(`\nTokens used - Input: ${response.usage.input_tokens}, Output: ${response.usage.output_tokens}`);

    return responseText;

  } catch (error) {
    // Handle different types of errors
    if (error instanceof Anthropic.APIError) {
      console.error('API Error:', error.message);
      console.error('Status:', error.status);
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
}

// Example usage
async function main() {
  console.log('Claude Basic Chat Example\n');

  // Example 1: Simple question
  console.log('Question: What is TypeScript?');
  const answer1 = await chat('What is TypeScript in one paragraph?');
  console.log('Claude:', answer1);

  console.log('\n---\n');

  // Example 2: Creative task
  console.log('Question: Write a haiku about coding');
  const answer2 = await chat('Write a haiku about coding');
  console.log('Claude:', answer2);

  console.log('\n---\n');

  // Example 3: Code explanation
  console.log('Question: Explain this code snippet');
  const codeSnippet = `
const users = ['Alice', 'Bob', 'Charlie'];
const greeting = users.map(name => \`Hello, \${name}!\`);
  `;
  const answer3 = await chat(`Explain what this JavaScript code does:\n${codeSnippet}`);
  console.log('Claude:', answer3);
}

// Run the examples
main().catch(console.error);

/**
 * Expected Output:
 *
 * Claude: TypeScript is a statically-typed superset of JavaScript...
 * Tokens used - Input: 15, Output: 87
 *
 * ---
 *
 * Claude: Code comes alive
 *         Bugs turn to solutions fast
 *         Coffee helps debug
 * Tokens used - Input: 12, Output: 24
 *
 * ---
 *
 * Claude: This code creates an array of three names...
 * Tokens used - Input: 42, Output: 156
 */
