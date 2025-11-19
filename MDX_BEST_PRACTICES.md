# MDX Best Practices for AIPaths Academy

This document outlines common MDX pitfalls and how to avoid them when writing documentation.

## Understanding MDX

MDX is a superset of Markdown that allows you to use JSX (React components) in your markdown files. While powerful, this means certain syntax patterns are interpreted as JavaScript/JSX rather than plain text.

## Common Issues and Solutions

### 1. Curly Braces `{}` in Text

**Problem:** Curly braces are used for JavaScript expressions in MDX.

```markdown
❌ WRONG:
Use {variable_name} as a placeholder

✅ CORRECT:
Use `{variable_name}` as a placeholder
```

**Solution:** Wrap curly braces in backticks to treat them as code, or use a different notation like `[variable_name]`.

### 2. Angle Brackets `<>` in Headings and Text

**Problem:** Angle brackets outside of code blocks are treated as HTML/JSX tags.

```markdown
❌ WRONG:
### Problem: "Merge conflict in <filename>"

✅ CORRECT:
### Problem: "Merge conflict in `<filename>`"
```

**Solution:** Wrap angle brackets in backticks or use HTML entities (`&lt;` and `&gt;`).

### 3. Nested Code Blocks

**Problem:** When you need to show a code block inside another code block, the inner closing fence closes the outer one.

````markdown
❌ WRONG:
```markdown
Example template:

```javascript
{code_here}
```

This text is now outside the code block!
```

✅ CORRECT:
````markdown
Example template:

```javascript
{code_here}
```

This text stays inside the code block!
````
````

**Solution:** Use more backticks (4 instead of 3) for the outer code fence when nesting.

### 4. Less-Than and Greater-Than in Comparisons

**Problem:** Comparison operators in text can be mistaken for JSX tags.

```markdown
❌ WRONG:
Check if value < 10 or value > 100

✅ CORRECT:
Check if value &lt; 10 or value &gt; 100

OR

Check if `value < 10` or `value > 100`
```

**Solution:** Use HTML entities or wrap in backticks.

### 5. Unescaped JSX-like Syntax

**Problem:** Any syntax that looks like HTML/JSX will be parsed as such.

```markdown
❌ WRONG:
<CustomComponent prop="value">

✅ CORRECT:
`<CustomComponent prop="value">`

OR

&lt;CustomComponent prop="value"&gt;
```

## Quick Reference

| Character/Pattern | When It's a Problem | Solution |
|------------------|---------------------|----------|
| `{variable}` | Outside code blocks | Use backticks: `` `{variable}` `` |
| `<text>` | Anywhere outside code blocks | Use backticks: `` `<text>` `` or `&lt;text&gt;` |
| Nested ` ``` ` | Inside code blocks | Use more backticks: ` ```` ` for outer fence |
| `<`, `>` | In regular text/headings | Use `&lt;`, `&gt;` or backticks |

## Critical Frontmatter Rules

### 1. Frontmatter Delimiters

**Problem:** Missing or incorrect `---` delimiters cause MDX parsing failures.

```yaml
❌ WRONG - No closing delimiter:
---
title: "My Title"
tags:
  - tag1
  - tag2

# Content starts here

✅ CORRECT:
---
title: "My Title"
tags:
  - tag1
  - tag2
---

# Content starts here
```

**Rules:**
- Must have opening `---` on line 1
- Must have closing `---` after all frontmatter fields
- **NO blank lines** between last field and closing `---`
- Must have blank line after closing `---` before content

### 2. No Custom Heading Anchors

**Problem:** The `{#anchor-id}` syntax is NOT supported by our MDX parser.

```markdown
❌ WRONG:
## Why Niche Selection Matters {#why-niche-selection-matters}

✅ CORRECT:
## Why Niche Selection Matters
```

**Why:** Curly braces in headings are interpreted as JSX expressions, causing rendering errors.

## Code Block Requirements

### 1. All Code Blocks MUST Have Language

**Problem:** Empty code fences (` ``` `) without language cause MDX errors.

```markdown
❌ WRONG:
```
Your content here
```

✅ CORRECT:
```text
Your content here
```
```

**Common languages:**
- `text` - Plain text, ASCII art, diagrams
- `typescript`, `javascript` - Code examples
- `bash` - Shell commands
- `json`, `yaml` - Config files
- `markdown` - Markdown examples

### 2. Closing Fences Must Be Plain

**Problem:** Closing fences with language specifications break code blocks.

```markdown
❌ WRONG:
```text
Content here
```text

✅ CORRECT:
```text
Content here
```
```

**Rule:** Opening fence gets language (` ```text `), closing fence is always plain (` ``` `).

## Testing Your MDX

Before committing, always:

1. **Validate frontmatter**: Check for closing `---` and no extra blank lines
2. **Check code blocks**: Ensure all have languages, closing fences are plain
3. **Remove custom anchors**: No `{#anchor-id}` syntax in headings
4. **Run validation script**: `node scripts/validate-content.js`
5. **Preview locally**: Run `npm run dev` and check the page renders without errors
6. **Check console**: Look for MDX compilation errors in browser console
7. **Test both locales**: If you have Spanish and English versions, test both

## Common Error Messages

### "X is not defined"
- **Cause**: Variable in curly braces `{X}` is being treated as JavaScript
- **Fix**: Escape with backticks or put inside code block

### "Expected a closing tag for `<X>`"
- **Cause**: Angle brackets are being parsed as JSX tag
- **Fix**: Escape with backticks or HTML entities

### "Unexpected token" or "Cannot parse"
- **Cause**: Syntax conflict with JSX parser
- **Fix**: Review special characters and escape as needed

### "React Error #419" or "Server Components render error"
- **Cause**: MDX compilation failure due to:
  - Missing closing `---` in frontmatter
  - Blank line before closing `---`
  - Custom heading anchors `{#id}`
  - Code blocks without language
  - Malformed closing code fences
- **Fix**: Run through the checklist below

## Pre-Publish Checklist

Before publishing ANY new content, verify:

### Frontmatter ✓
- [ ] Opening `---` on line 1
- [ ] Closing `---` present after all fields
- [ ] NO blank line between last field and closing `---`
- [ ] Blank line after closing `---` before content
- [ ] All required fields present (content_id, locale, title, description, author, dates, coverImage, tags)

### Code Blocks ✓
- [ ] All code blocks have language specified (```text, ```typescript, etc.)
- [ ] Closing fences are plain ``` (no language)
- [ ] No nested code blocks without 4 backticks

### Headings ✓
- [ ] NO custom anchor IDs like `{#anchor-id}`
- [ ] Single H1 only (document title)
- [ ] Proper heading hierarchy (H2, H3, etc.)

### Special Characters ✓
- [ ] `<` and `>` escaped or in backticks when not HTML
- [ ] Curly braces `{}` in backticks when not JSX
- [ ] Comparison operators escaped: `&lt;` `&gt;`

### Validation ✓
- [ ] Run `node scripts/validate-content.js` - no errors
- [ ] Run `node scripts/validate-translations.js` - passes
- [ ] Local preview works: `npm run dev`
- [ ] Check browser console for errors
- [ ] Test both EN and ES versions if bilingual

## See Also

- [MDX Official Documentation](https://mdxjs.com/)
- [MDX Syntax Reference](https://mdxjs.com/docs/what-is-mdx/)
- Main project: `docs/MD_MDX_LOCALE_GUIDE.md` for locale-specific guidelines
