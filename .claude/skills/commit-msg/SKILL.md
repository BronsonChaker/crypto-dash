---
name: commit-msg
description: Generate a conventional commit message from staged changes and commit them. Use when the user says "write a commit message", "generate a commit", "commit my changes", or runs /commit-msg.
---

# commit-msg

Generate a commit message from staged changes and commit with it.

## Steps

1. **Check for staged changes.** Run:

   ```
   git diff --staged
   ```

   If the output is empty, stop and tell the user there's nothing staged — ask them to `git add` their changes first. Do not proceed to generate a message or commit.

2. **Read the staged diff** (the output from step 1) to understand what changed and why.

3. **Generate a commit message** in this exact format:

   ```
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   ```

   Rules:
   - `type` must be one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`.
   - `scope` is a short identifier for the area touched (e.g. a component, page, or module name) — omit the `(scope)` parens entirely if nothing sensible fits.
   - `subject` is under 60 characters, imperative mood, no trailing period.
   - Body bullets are optional but encouraged — include them when there's more than one logical change or a non-obvious reason behind it. Keep bullets concise; it's fine to have just a "what" bullet with no separate "why" bullet if the reason is self-evident.
   - **Never** include a `Co-Authored-By` trailer or any other trailer.

4. **Commit** using that exact message. Use a heredoc so multi-line messages are preserved correctly, e.g.:

   ```bash
   git commit -m "$(cat <<'EOF'
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   EOF
   )"
   ```

5. Report the resulting commit message and confirm the commit succeeded (e.g. show `git log -1 --oneline`).
