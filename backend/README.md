# PrepFox Backend API

Backend server for PrepFox AI Learning to Hiring Platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create PostgreSQL database:
```sql
CREATE DATABASE prepfox_ai;
```

3. Run database schema:
```bash
psql -U postgres -d prepfox_ai -f ../database/schema.sql
```

4. Configure environment variables:
- Copy `.env.example` to `.env`
- Update database credentials

5. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Onboarding
- `POST /api/onboarding/register` - Register new user
- `GET /api/onboarding/check-email/:email` - Check if email exists

### Health Check
- `GET /api/health` - Server health status
