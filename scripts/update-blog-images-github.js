#!/usr/bin/env node

/**
 * Script to update blog post frontmatter with GitHub-hosted image URLs
 *
 * This script updates all blog posts to reference images hosted in the
 * content repository on GitHub, avoiding duplication in the main app.
 *
 * Usage: node scripts/update-blog-images-github.js
 */

const fs = require('fs');
const path = require('path');

// Configuration - Update this with your repository details
const GITHUB_USERNAME = 'GonzaSab';
const GITHUB_REPO = 'aipaths-academy-content';
const GITHUB_BRANCH = 'main'; // or 'master' depending on your default branch

// Base URL for GitHub raw content
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// Local path configuration
const BLOGS_DIR = path.join(__dirname, '../blogs');
const IMAGE_PATH_PREFIX = '/public/images/blogs';

// ANSI color codes for pretty console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: null, body: content };
  }

  const frontmatter = match[1];
  const body = content.slice(match[0].length);

  return { frontmatter, body };
}

/**
 * Update frontmatter with GitHub-hosted image URL
 */
function updateFrontmatter(frontmatter, blogFolder, imageName = 'hero.jpg') {
  const lines = frontmatter.split('\n');

  // Construct the GitHub raw URL for the image
  const githubImageUrl = `${GITHUB_RAW_BASE}${IMAGE_PATH_PREFIX}/${blogFolder}/${imageName}`;

  // Check if coverImage already exists
  const coverImageIndex = lines.findIndex(line => line.trim().startsWith('coverImage:'));

  if (coverImageIndex !== -1) {
    // Update existing coverImage
    lines[coverImageIndex] = `coverImage: "${githubImageUrl}"`;
    log(`  ✓ Updated coverImage to GitHub URL`, 'yellow');
  } else {
    // Add coverImage after description
    const descIndex = lines.findIndex(line => line.trim().startsWith('description:'));
    if (descIndex !== -1) {
      lines.splice(descIndex + 1, 0, `coverImage: "${githubImageUrl}"`);
      log(`  ✓ Added coverImage with GitHub URL`, 'green');
    } else {
      // Add at the end if no description found
      lines.push(`coverImage: "${githubImageUrl}"`);
      log(`  ✓ Added coverImage at end`, 'green');
    }
  }

  return lines.join('\n');
}

/**
 * Process a single blog post file
 */
function processBlogPost(blogFolder, filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  if (!frontmatter) {
    log(`  ⚠ No frontmatter found, skipping`, 'red');
    return false;
  }

  // Check if image exists locally (will be pushed to GitHub)
  const localImagePath = path.join(__dirname, `../public/images/blogs/${blogFolder}/hero.jpg`);
  const localImagePathPng = path.join(__dirname, `../public/images/blogs/${blogFolder}/hero.png`);

  let imageExists = fs.existsSync(localImagePath);
  let imageName = 'hero.jpg';

  if (!imageExists && fs.existsSync(localImagePathPng)) {
    imageExists = true;
    imageName = 'hero.png';
  }

  if (!imageExists) {
    log(`  ℹ️  Image will be at: public/images/blogs/${blogFolder}/${imageName}`, 'cyan');
    log(`    Place image there before pushing to GitHub`, 'cyan');
  } else {
    log(`  ✓ Image found locally, ready for GitHub`, 'green');
  }

  // Update frontmatter with GitHub URL
  const updatedFrontmatter = updateFrontmatter(frontmatter, blogFolder, imageName);
  const updatedContent = `---\n${updatedFrontmatter}\n---${body}`;

  // Write back to file
  fs.writeFileSync(filePath, updatedContent, 'utf8');

  // Show the GitHub URL that will be used
  const githubUrl = `${GITHUB_RAW_BASE}${IMAGE_PATH_PREFIX}/${blogFolder}/${imageName}`;
  log(`  🔗 GitHub URL: ${githubUrl}`, 'cyan');

  return true;
}

/**
 * Main function
 */
function main() {
  log('\n📸 Blog Image GitHub URL Updater\n', 'blue');
  log(`Repository: ${GITHUB_USERNAME}/${GITHUB_REPO}`, 'cyan');
  log(`Branch: ${GITHUB_BRANCH}`, 'cyan');
  log('Scanning blog posts...\n', 'blue');

  // Get all blog folders
  const blogFolders = fs.readdirSync(BLOGS_DIR)
    .filter(item => {
      const fullPath = path.join(BLOGS_DIR, item);
      return fs.statSync(fullPath).isDirectory();
    })
    .sort();

  let processed = 0;
  let failed = 0;

  blogFolders.forEach(blogFolder => {
    log(`Processing: ${blogFolder}`, 'blue');

    // Get all markdown files in the folder
    const files = fs.readdirSync(path.join(BLOGS_DIR, blogFolder))
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    if (files.length === 0) {
      log(`  ⚠ No markdown files found`, 'yellow');
      failed++;
      return;
    }

    files.forEach(file => {
      const filePath = path.join(BLOGS_DIR, blogFolder, file);
      log(`  📄 ${file}`);

      if (processBlogPost(blogFolder, filePath)) {
        processed++;
      } else {
        failed++;
      }
    });

    console.log('');
  });

  // Summary
  log('─'.repeat(50), 'blue');
  log(`\n✨ Summary:`, 'blue');
  log(`  Processed: ${processed} files`, 'green');
  if (failed > 0) {
    log(`  Issues: ${failed} files`, 'yellow');
  }
  log('');
  log('Next steps:', 'blue');
  log('  1. Add hero images to public/images/blogs/[blog-folder]/', 'reset');
  log('  2. Commit and push to GitHub:', 'reset');
  log(`     cd src/content`, 'cyan');
  log(`     git add .`, 'cyan');
  log(`     git commit -m "feat: add blog hero images"`, 'cyan');
  log(`     git push`, 'cyan');
  log('  3. Update submodule in main repo:', 'reset');
  log(`     cd ../..`, 'cyan');
  log(`     git add src/content`, 'cyan');
  log(`     git commit -m "chore: update content submodule"`, 'cyan');
  log('  4. Images will be live at GitHub URLs!', 'reset');
  log('');
  log(`Example URL:`, 'blue');
  log(`${GITHUB_RAW_BASE}${IMAGE_PATH_PREFIX}/001_cursor-2-0-updates/hero.jpg`, 'cyan');
  log('');
}

// Run the script
main();