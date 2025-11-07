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

## Testing Your MDX

Before committing, always:

1. **Preview locally**: Run `npm run dev` and check the page renders without errors
2. **Check console**: Look for MDX compilation errors in browser console
3. **Test both locales**: If you have Spanish and English versions, test both

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

## See Also

- [MDX Official Documentation](https://mdxjs.com/)
- [MDX Syntax Reference](https://mdxjs.com/docs/what-is-mdx/)
- Main project: `docs/MD_MDX_LOCALE_GUIDE.md` for locale-specific guidelines
