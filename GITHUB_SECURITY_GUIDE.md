# 🔒 Ultimate GitHub Security & Privacy Protection Guide

A comprehensive, beginner-friendly guide to securing your source code, keeping private data safe, and ensuring secret API keys or passwords are **NEVER** accidentally leaked to public GitHub repositories.

---

## 🚨 Critical Rule: What You Must NEVER Upload to GitHub

When creating a public GitHub repository, anyone on the internet (including automated security scanning bots) can view your files. **Never commit or upload the following items:**

| Category | Sensitive Files / Items | Risk Level |
| :--- | :--- | :--- |
| **API Keys** | OpenAI (`sk-...`), Groq (`gsk_...`), Anthropic (`sk-ant-...`), AWS Access Keys (`AKIA...`) | 🔴 **CRITICAL** (Account hijack / high bills) |
| **Environment Files** | `.env`, `.env.local`, `.env.production` | 🔴 **CRITICAL** (Exposes database & auth secrets) |
| **Database Connection Strings** | `postgresql://user:pass@host/db`, `mongodb+srv://...` | 🔴 **CRITICAL** (Data leak / database destruction) |
| **Authentication & SSH Keys** | `id_rsa`, `id_ed25519`, JWT secret keys, private SSL certificates (`*.pem`, `*.key`) | 🔴 **CRITICAL** (Server compromise) |
| **Local Database Files** | `*.db`, `*.sqlite`, `*.sqlite3`, `data.json` containing real user data | 🟠 **HIGH** (User privacy violation) |
| **Credentials & Passwords** | `passwords.txt`, hardcoded DB passwords, SMTP email credentials | 🔴 **CRITICAL** (Identity theft) |

---

## 🛡️ Step-by-Step Guide to Securing Your Project Before Pushing to GitHub

Follow these 4 simple steps every time you prepare to publish a project to GitHub:

### Step 1: Create a `.gitignore` File

A `.gitignore` file tells Git which files and folders to leave on your computer and **ignore** when uploading to GitHub.

Make sure your root directory has a `.gitignore` containing:

```gitignore
# 1. Environment Secrets & API Keys
.env
.env.*
!.env.example

# 2. Dependencies (Too large for Git)
node_modules/
venv/
.venv/

# 3. Local Databases
*.db
*.sqlite
*.sqlite3

# 4. Build Artifacts
dist/
build/
.vite/

# 5. OS & Log Files
.DS_Store
Thumbs.db
*.log
```

---

### Step 2: Use a `.env.example` Template File

Instead of putting your real API keys in code, use environment variables:

1. Store real keys in `.env` (which is ignored by Git):
   ```env
   GROQ_API_KEY=gsk_your_real_key_here
   DATABASE_URL=postgresql://user:secret@localhost:5432/mydb
   ```
2. Create a public `.env.example` file (which is uploaded to GitHub) with blank placeholders:
   ```env
   # Copy this file to .env and fill in your keys
   GROQ_API_KEY=your_groq_api_key_here
   DATABASE_URL=your_database_url_here
   ```

---

### Step 3: Verify What Files Git Will Upload

Before running `git commit`, check exactly what files Git is tracking by running:

```bash
git status
```

* **Green/Untracked files:** Inspect the list. If you see `.env`, `node_modules/`, or `*.db`, **STOP!** Make sure your `.gitignore` is saved.
* To check if a specific file is ignored:
  ```bash
  git check-ignore -v .env
  ```
  *(If `.gitignore` is working, it will print the line rule ignoring `.env`)*

---

### Step 4: Run Safety Checks Before Pushing

Run this command to preview all files staged for commit:

```bash
git diff --cached --name-only
```

If no sensitive files appear in the list, it is safe to commit and push:

```bash
git add .
git commit -m "Safe initial commit: No secrets attached"
git push -u origin main
```

---

## 🆘 What To Do If You Accidentally Pushed a Secret to GitHub

If an API key or password was committed to GitHub:

> [!CAUTION]
> **Simply deleting the file and making a new commit DOES NOT remove it from Git history!** Public GitHub history keeps past commits visible.

### Immediate Emergency Steps:

1. **REVOKE / ROTATE THE KEY IMMEDIATELY:**
   * Go to the service provider (OpenAI, Groq, AWS, Supabase, Stripe) and click **Revoke / Delete Key**.
   * Generate a new key. *Once revoked, the leaked key becomes useless to hackers.*

2. **Remove the File from Git Tracking:**
   ```bash
   git rm --cached .env
   git commit -m "Remove .env file from repository"
   git push origin main
   ```

3. **Purge the Secret from Git Commit History:**
   Use [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) or `git-filter-repo`:
   ```bash
   pip install git-filter-repo
   git filter-repo --invert-paths --path .env
   git push origin main --force
   ```

---

## ✅ Security Checklist Before Pushing

- [x] `.env` is listed in `.gitignore`
- [x] `.env.example` exists with dummy placeholders
- [x] `node_modules/` and `venv/` are listed in `.gitignore`
- [x] `*.db` and local databases are listed in `.gitignore`
- [x] Ran `git status` to verify no secret files are tracked
- [x] No API keys are hardcoded inside Javascript/Python source code
