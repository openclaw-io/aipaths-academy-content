# Content Creation Workflow for AIPaths Academy

Welcome! This guide will help you create and edit documentation for AIPaths Academy using Obsidian.

## Quick Start

1. **Open this folder in Obsidian**
2. **Create a new markdown file** with the naming convention below
3. **Add frontmatter** (the metadata at the top)
4. **Write your content** in markdown
5. **Commit and push** to GitHub
6. **Your doc goes live in ~10 seconds!** ⚡

---

## File Naming Convention

All documentation files must follow this format:

```
{name}.{locale}.md
```

### Examples

```
getting-started.en.md     ← English version
getting-started.es.md     ← Spanish version

tutorial-basics.en.md     ← English tutorial
tutorial-basics.es.md     ← Spanish tutorial
```

### Important Rules

- ✅ Always include `.en` or `.es` before the file extension
- ✅ Use `.md` for all normal content (recommended)
- ✅ Use `.mdx` only if you need React components
- ❌ Don't use filenames without locale (e.g., `doc.md` is ambiguous)

---

## Frontmatter (Metadata)

Every markdown file must start with frontmatter:

```yaml
---
title: "Your Document Title"
description: "A brief description of what this doc covers"
category: "category-name"
order: 1
published: true
lastUpdated: "2025-01-05"
author: "Your Name"
tags: ["tutorial", "beginner", "claude"]
---

# Your Document Title

Your content starts here...
```

### Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | Yes | Document title | `"Getting Started with Claude"` |
| `description` | Yes | Brief description | `"Learn the basics of Claude API"` |
| `category` | Yes | Folder name (auto-detected) | `"claude"` |
| `order` | No | Display order in sidebar | `1` |
| `published` | No | Show on website? (default: true) | `true` or `false` |
| `lastUpdated` | No | Last update date | `"2025-01-05"` |
| `author` | No | Author name | `"Jane Doe"` |
| `tags` | No | Search tags | `["tutorial", "beginner"]` |

---

## Categories

Categories are automatically created based on folder names:

```
docs/
├── claude/          ← Category: claude (blue badge)
├── agents/          ← Category: agents (purple badge)
├── mcp/             ← Category: mcp (green badge)
├── tutorials/       ← Category: tutorials (orange badge)
└── your-folder/     ← Category: your-folder (gray badge)
```

**To create a new category:**
1. Create a new folder in `docs/`
2. Add your `.en.md` and `.es.md` files inside
3. Done! The category appears automatically

---

## Content Creation Workflow

### Step 1: Create English Version

Create a new file following the naming convention:

```bash
docs/claude/my-new-guide.en.md
```

Add frontmatter and content:

```markdown
---
title: "My New Guide"
description: "Learn something awesome"
category: "claude"
order: 5
published: true
tags: ["tutorial", "beginner"]
---

# My New Guide

## Introduction

Start with an introduction...

## First Section

Your content here...

## Conclusion

Wrap up your guide...
```

### Step 2: Translate to Spanish

**Recommended workflow:**

1. **Copy the English file:**
   ```bash
   cp docs/claude/my-new-guide.en.md docs/claude/my-new-guide.es.md
   ```

2. **AI-assisted translation:**
   - Open both files in Obsidian side-by-side
   - Ask Claude/ChatGPT: *"Translate this to Spanish, keep technical terms in English"*
   - Paste the translation into `.es.md`

3. **Review and customize:**
   - Read through the Spanish version
   - Adjust cultural references
   - Fix any awkward translations
   - Keep technical terms consistent

4. **Update frontmatter:**
   - Make sure title and description are translated
   - Keep category, order, and tags the same

### Step 3: Commit and Push

```bash
# Add your files
git add docs/claude/my-new-guide.*.md

# Commit with clear message
git commit -m "docs: Add new guide about X"

# Push to GitHub
git push
```

### Step 4: Verify Live

Visit your documentation:
- English: `https://aipaths-academy.com/en/docs/claude/my-new-guide`
- Spanish: `https://aipaths-academy.com/es/docs/claude/my-new-guide`

---

## Markdown vs MDX

### Use `.md` (Plain Markdown) - RECOMMENDED

Use for 95% of your content:
- ✅ Standard documentation
- ✅ Tutorials
- ✅ Guides
- ✅ Blog posts
- ✅ Renders perfectly in Obsidian

**Example:**

```markdown
---
title: "Basic Tutorial"
description: "A simple guide"
category: "tutorials"
---

# Basic Tutorial

This is plain markdown. Works great in Obsidian!

## Code Example

```python
def hello():
    print("Hello, world!")
```
```

### Use `.mdx` (MDX with React) - ONLY WHEN NEEDED

Use only when you need interactive components:
- 🎨 Interactive demos
- 🧩 Custom React components
- 📊 Data visualizations
- 🎬 Special layouts

**Example:**

```mdx
---
title: "Interactive Demo"
description: "Try it yourself"
category: "claude"
---

# Interactive Demo

Here's a live demo:

<StreamingDemo />

Try interacting with it!
```

**Note:** `.mdx` files don't render components in Obsidian, but you can still edit the markdown parts.

---

## Translation Best Practices

### ✅ Do

- **Translate manually** with AI assistance (don't auto-translate)
- **Keep technical terms** in English (API, token, prompt, etc.)
- **Customize examples** for each language's audience
- **Review translations** before publishing
- **Keep both versions in sync** when updating

### ❌ Don't

- Don't rely only on AI translation (review everything!)
- Don't translate code examples (keep them the same)
- Don't forget to update the Spanish version when changing English
- Don't translate proper nouns (Claude, AIPaths Academy, etc.)

### Translation Tips

**Technical terms to keep in English:**
- API, SDK, CLI, token, prompt, embedding, fine-tuning
- Model names: Claude Sonnet, GPT-4, etc.
- Programming concepts: function, class, variable, etc.

**Things to translate:**
- Explanations and descriptions
- Headings and section titles
- Error messages and warnings
- User-facing text

**Example:**

```markdown
# EN: Authentication with API Keys
# ES: Autenticación con API Keys

# EN: You need to generate an API token
# ES: Necesitas generar un token de API
```

---

## Obsidian Tips

### Linked Notes

Obsidian's `[[wiki-links]]` won't work on the website. Use markdown links instead:

```markdown
❌ See [[getting-started]] for more info
✅ See [Getting Started](getting-started) for more info
```

### Images

Place images in a `docs/images/` folder and reference them:

```markdown
![Alt text](../images/my-image.png)
```

### Preview Mode

- **Edit Mode**: See markdown syntax
- **Preview Mode**: See rendered content (without React components)
- Both work great for `.md` files!

### Frontmatter Editing

Obsidian recognizes YAML frontmatter. You can:
- Edit it directly in the file
- Use Obsidian plugins for frontmatter UI

---

## Publishing Checklist

Before pushing to GitHub, check:

- [ ] Both `.en.md` and `.es.md` files exist
- [ ] Frontmatter is complete (title, description, category)
- [ ] `published: true` (or remove this field)
- [ ] Content is proofread
- [ ] Code examples work
- [ ] Links are correct
- [ ] Images load properly
- [ ] Spanish translation is reviewed
- [ ] Committed with clear message

---

## Troubleshooting

### My doc doesn't appear on the website

**Check:**
1. Filename has `.en` or `.es` before `.md`
2. Frontmatter has `published: true` (or doesn't have `published: false`)
3. File is in a category folder (e.g., `docs/claude/`)
4. Committed and pushed to GitHub
5. Wait ~10 seconds for deployment

### Obsidian doesn't render my content

**For `.md` files:**
- Should render perfectly in Obsidian
- If not, check your markdown syntax

**For `.mdx` files:**
- React components won't render in Obsidian (expected behavior)
- Edit the markdown parts, ignore the `<Component />` tags

### Wrong language shows on website

**Check:**
1. Filename: `doc.en.md` not `doc.eng.md`
2. URL matches locale: `/en/docs/...` for English
3. Frontmatter doesn't have conflicting `locale` field

### Search doesn't find my doc

**Check:**
1. Doc is published (`published: true`)
2. Wait a few minutes for search index to rebuild
3. Try searching for exact title
4. Check if tags are correct

---

## Need Help?

- **Technical documentation:** See `docs/MD_MDX_LOCALE_GUIDE.md` in the main project
- **Contribution guidelines:** See `docs/templates/CONTRIBUTING.md` in the main project
- **Questions:** Open an issue on GitHub

---

## Quick Reference

### File Naming
```
{name}.{locale}.md     ← Standard content
{name}.{locale}.mdx    ← With React components
```

### Frontmatter Template
```yaml
---
title: "Document Title"
description: "Brief description"
category: "folder-name"
order: 1
published: true
tags: ["tag1", "tag2"]
---
```

### Workflow
1. Write `.en.md` in Obsidian
2. AI-translate → `.es.md`
3. Review and customize
4. Commit and push
5. Live in ~10 seconds!

---

**Happy documenting!** 🚀
