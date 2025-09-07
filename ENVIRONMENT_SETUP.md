# Environment Variables Setup

## Required Environment Variables

To use Civic Auth, you need to create a `.env.local` file in the root directory with the following variable:

```bash
# Civic Auth Configuration
NEXT_PUBLIC_CIVIC_CLIENT_ID=
```

## How to Set Up

1. **Create `.env.local` file** in the root directory:

   ```bash
   touch .env.local
   ```

2. **Add the environment variable**:

   ```bash
   echo "NEXT_PUBLIC_CIVIC_CLIENT_ID=" >> .env.local
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

## Environment Variable Details

- **Variable Name**: `NEXT_PUBLIC_CIVIC_CLIENT_ID`
- **Type**: String
- **Required**: Yes
- **Description**: Your Civic Auth client ID for authentication
- **Current Value**: `e21eb711-8a2b-493c-aaee-d5db5561a5a7`

## Security Notes

- The `.env.local` file is automatically ignored by git
- Never commit your actual client ID to version control
- Use different client IDs for development and production environments

## Files Updated

The following files now use the environment variable:

- `next.config.mjs` - Civic Auth plugin configuration
- `app/layout.tsx` - CivicAuthProvider configuration
