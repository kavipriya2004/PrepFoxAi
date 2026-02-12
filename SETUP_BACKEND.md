# Backend & Database Setup Guide

Follow these steps to get your backend running:

## Step 1: Install PostgreSQL

If you don't have PostgreSQL installed:
1. Download from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for the `postgres` user

## Step 2: Create Database

Open PowerShell and run:

```powershell
# Connect to PostgreSQL (you'll be prompted for password)
psql -U postgres

# In the PostgreSQL prompt, create the database:
CREATE DATABASE prepfox_ai;

# Exit
\q
```

## Step 3: Run Database Schema

```powershell
# Navigate to project root
cd f:\LTH_AI

# Run the schema file
psql -U postgres -d prepfox_ai -f database/schema.sql
```

## Step 4: Configure Backend .env

The `.env` file already exists at `f:\LTH_AI\backend\.env`

Update the password if needed:
```env
DB_PASSWORD=your_postgres_password
```

## Step 5: Start Backend Server

Open a NEW terminal (keep frontend running in the other):

```powershell
cd f:\LTH_AI\backend
npm run dev
```

You should see:
```
Server running on port 5000
Database connected successfully
```

## Step 6: Test Onboarding

1. Go to http://localhost:3000/onboarding
2. Fill out all steps
3. Click Submit
4. Should redirect to /home on success!

---

## Troubleshooting

**"psql: command not found"**
- PostgreSQL not installed or not in PATH
- Install PostgreSQL first

**"Database connection error"**
- Check PostgreSQL is running
- Verify password in `.env` file
- Make sure database `prepfox_ai` exists

**"Backend not responding"**
- Make sure backend server is running on port 5000
- Check console for errors

**"Port 5000 already in use"**
- Stop any other service using port 5000
- Or change PORT in backend `.env` file
