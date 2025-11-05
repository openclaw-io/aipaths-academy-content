# Contributing to AIPaths Academy Content

Thank you for your interest in contributing! This guide will help you create high-quality content that helps others learn AI development.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Content Types](#content-types)
- [Writing Guidelines](#writing-guidelines)
- [Code Examples](#code-examples)
- [Submission Process](#submission-process)

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top of this repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/aipaths-academy-content.git
cd aipaths-academy-content
```

### 3. Create a Branch

```bash
git checkout -b feature/your-content-name
```

## 📝 Content Types

### Documentation

Location: `/docs/{category}/`

Categories:
- `claude/` - Claude AI guides
- `agents/` - AI Agents tutorials
- `mcp/` - Model Context Protocol docs

**Frontmatter Template:**
```yaml
---
title: "Your Doc Title"
description: "Brief description under 160 characters"
category: "claude"
order: 10
published: true
lastUpdated: "2025-01-05"
author: "Your Name"
tags: ["claude", "tutorial", "beginner"]
---
```

### Blog Posts

Location: `/blog/{locale}/`

Locales: `en/` (English), `es/` (Spanish)

**Frontmatter Template:**
```yaml
---
title: "Your Post Title"
description: "Compelling description 150-160 chars"
author: "Your Name"
publishedAt: "2025-01-05"
category: "tutorial"
tags: ["ai", "claude", "tutorial"]
published: true
featured: false
locale: "en"
---
```

### Code Examples

Location: `/docs/{category}/examples/`

**Requirements:**
- Must be tested and working
- Include comments explaining key parts
- Follow language best practices
- Include usage instructions

## ✍️ Writing Guidelines

### Language & Tone

- **Clear & Concise**: Avoid jargon unless necessary
- **Friendly**: Welcoming to beginners
- **Practical**: Focus on real-world applications
- **Professional**: No slang or overly casual language

### Structure

1. **Introduction** (2-3 paragraphs)
   - Hook the reader
   - Explain what they'll learn
   - Set expectations

2. **Prerequisites** (if applicable)
   - Required knowledge
   - Tools/accounts needed
   - Estimated time

3. **Main Content** (3-5 sections)
   - Logical progression
   - Clear headings
   - Step-by-step instructions
   - Code examples with explanations

4. **Conclusion**
   - Recap key points
   - Next steps
   - Related resources

### Formatting

- Use **Markdown** (or MDX for advanced features)
- H1 for title (one per document)
- H2 for major sections
- H3 for subsections
- Code blocks with language specified:
  ````markdown
  ```typescript
  const example = "code here";
  ```
  ````
- Callouts for important notes:
  ```markdown
  > **Note**: Important information here
  ```

### Bilingual Content

When providing both EN and ES:
- Keep structure identical
- Translate idioms appropriately
- Maintain technical term consistency
- Don't just use machine translation - review carefully

## 💻 Code Examples

### File Naming

```
docs/claude/examples/
├── basic-chat.js              # Simple, descriptive names
├── streaming-response.py       # Include key functionality
└── mcp-server-setup.ts        # Kebab-case
```

### Code Style

**JavaScript/TypeScript:**
```typescript
/**
 * Brief description of what this does
 * @param {string} input - Description
 * @returns {Promise<string>} - Description
 */
async function exampleFunction(input: string): Promise<string> {
  // Clear, descriptive variable names
  const result = await someOperation(input);

  // Comments for complex logic
  if (result.length > 100) {
    return result.slice(0, 100);
  }

  return result;
}

// Usage example
const output = await exampleFunction("test input");
console.log(output);
```

**Include:**
- ✅ Comments explaining WHY, not just WHAT
- ✅ Error handling
- ✅ Usage examples
- ✅ Expected output (as comments)
- ✅ Dependencies listed at top

**Avoid:**
- ❌ Hardcoded secrets/API keys
- ❌ Uncommented complex logic
- ❌ Non-working or untested code
- ❌ Overly complex examples

## 🔄 Submission Process

### 1. Test Your Content

- Check all code examples run correctly
- Verify links work
- Proofread for typos
- Test on both EN and ES if bilingual

### 2. Commit Your Changes

```bash
git add .
git commit -m "docs: Add guide on [topic]"
```

Commit message format:
- `docs: ...` for documentation
- `blog: ...` for blog posts
- `examples: ...` for code samples
- `fix: ...` for corrections

### 3. Push to Your Fork

```bash
git push origin feature/your-content-name
```

### 4. Create Pull Request

1. Go to the original repository
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template:
   - **Title**: Clear, descriptive
   - **Description**: What you added/changed and why
   - **Type**: Documentation, Blog, Example, Fix
   - **Testing**: How you tested it

### 5. Review Process

- Maintainers will review within 3-5 days
- Address any feedback
- Once approved, content will be merged
- Your contribution will go live automatically!

## ❓ Questions?

- **General Questions**: [Open a Discussion](https://github.com/GonzaSab/aipaths-academy-content/discussions)
- **Bug Reports**: [Open an Issue](https://github.com/GonzaSab/aipaths-academy-content/issues)
- **Suggestions**: [Open an Issue](https://github.com/GonzaSab/aipaths-academy-content/issues)

## 🏆 Recognition

Contributors are credited in:
- The content itself (author field)
- Our contributors list
- Changelog

Thank you for helping make AI education accessible to everyone! 🙏
