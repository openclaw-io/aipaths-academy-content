/**
 * Claude Streaming Response Example
 *
 * Demonstrates how to stream Claude's responses in real-time,
 * perfect for building interactive chat interfaces or CLI tools.
 *
 * Prerequisites:
 * - npm install @anthropic-ai/sdk dotenv
 * - npm install --save-dev @types/node typescript
 * - Set ANTHROPIC_API_KEY in your .env file
 *
 * Usage:
 * npx tsx streaming-response.ts
 * or
 * tsc streaming-response.ts && node streaming-response.js
 */

import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Stream a response from Claude with real-time output
 * @param userMessage - The message to send to Claude
 * @param onChunk - Callback function called for each text chunk
 * @returns Promise that resolves when streaming is complete
 */
async function streamChat(
  userMessage: string,
  onChunk?: (text: string) => void
): Promise<string> {
  let fullResponse = '';

  try {
    // Create a streaming message request
    const stream = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: userMessage }],
      stream: true, // Enable streaming
    });

    // Process each event in the stream
    for await (const event of stream) {
      // Check the event type
      if (event.type === 'content_block_delta') {
        // Extract the text chunk
        const chunk = event.delta.text || '';
        fullResponse += chunk;

        // Call the callback if provided
        if (onChunk) {
          onChunk(chunk);
        } else {
          // Default: write directly to stdout
          process.stdout.write(chunk);
        }
      }

      // Handle other event types
      if (event.type === 'message_start') {
        console.log('🤖 Claude is thinking...\n');
      }

      if (event.type === 'message_stop') {
        console.log('\n\n✓ Response complete');
      }
    }

    return fullResponse;

  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error('\n❌ API Error:', error.message);
      throw error;
    } else {
      console.error('\n❌ Unexpected error:', error);
      throw error;
    }
  }
}

/**
 * Stream with custom handling (e.g., for UI updates)
 */
async function streamWithCustomHandler(userMessage: string): Promise<void> {
  const chunks: string[] = [];

  await streamChat(userMessage, (chunk) => {
    chunks.push(chunk);

    // Custom handling: could update a UI, save to database, etc.
    process.stdout.write(chunk);

    // Example: Log every 10th chunk
    if (chunks.length % 10 === 0) {
      console.log(`\n[Received ${chunks.length} chunks so far...]`);
    }
  });

  console.log(`\n\nTotal chunks received: ${chunks.length}`);
}

/**
 * Stream to a string buffer (useful for testing or processing)
 */
async function streamToString(userMessage: string): Promise<string> {
  let buffer = '';

  await streamChat(userMessage, (chunk) => {
    buffer += chunk;
    // Silent mode - no stdout
  });

  return buffer;
}

// Example usage
async function main() {
  console.log('='.repeat(50));
  console.log('Claude Streaming Response Examples');
  console.log('='.repeat(50) + '\n');

  // Example 1: Basic streaming to stdout
  console.log('📝 Example 1: Basic Streaming\n');
  console.log('Question: Explain async/await in JavaScript\n');
  await streamChat('Explain async/await in JavaScript in 2-3 paragraphs');

  console.log('\n\n' + '='.repeat(50) + '\n');

  // Example 2: Streaming with custom handler
  console.log('📝 Example 2: Custom Handler\n');
  console.log('Question: Write a short story\n');
  await streamWithCustomHandler('Write a very short story about a robot learning to code');

  console.log('\n\n' + '='.repeat(50) + '\n');

  // Example 3: Stream to buffer (silent)
  console.log('📝 Example 3: Stream to Buffer (Silent)\n');
  console.log('Processing response silently...');
  const result = await streamToString('List 5 programming best practices');
  console.log('\n✓ Response captured!');
  console.log(`Length: ${result.length} characters`);
  console.log('\nFirst 100 characters:');
  console.log(result.substring(0, 100) + '...');
}

// Handle errors and run
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

/**
 * Benefits of Streaming:
 *
 * 1. Real-time feedback - Users see responses as they're generated
 * 2. Better UX - Perceived faster response times
 * 3. Interruptible - Can cancel mid-stream if needed
 * 4. Memory efficient - Process chunks incrementally
 *
 * Use Cases:
 * - Chat applications
 * - CLI tools
 * - Live transcription
 * - Progressive content generation
 */
