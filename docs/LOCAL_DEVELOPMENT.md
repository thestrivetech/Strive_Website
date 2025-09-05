# Local Development Setup Guide

This guide explains how to run the Strive Website project locally on your development machine.

## Quick Start

### Windows
```bash
npm install
npm run dev:windows
```
Then open http://localhost:5173 in your browser.

### Mac/Linux
```bash
npm install
npm run dev:local
```
Then open http://localhost:5173 in your browser.

## Architecture

The project uses a dual-server setup for local development:

1. **Vite Dev Server** (Port 5173)
   - Serves the React frontend
   - Provides hot module replacement (HMR)
   - Proxies API calls to Express server

2. **Express Server** (Port 5000)
   - Handles API endpoints
   - Manages authentication
   - Connects to database

## Port Configuration

| Environment | Vite Port | Express Port | Access URL |
|-------------|-----------|--------------|------------|
| Local Dev   | 5173      | 5000         | http://localhost:5173 |
| Replit      | N/A       | 5000         | https://[repl-name].repl.co |
| Production  | N/A       | 5000         | Production URL |

## Environment Detection

The system automatically detects whether it's running locally or on Replit by checking:
- `REPL_ID` environment variable
- `REPLIT_DB_URL` environment variable

Configuration is managed in `/config/environment.ts`.

## Available Scripts

### Development
- `npm run dev:windows` - Start dev server on Windows
- `npm run dev:local` - Start dev server on Mac/Linux
- `npm run dev` - Original script (for Unix-like systems)

### Building
- `npm run build` - Build for production
- `npm start` - Run production build

### Testing
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## API Proxy

In local development, Vite automatically proxies all `/api/*` requests to the Express server:
- Frontend request: `http://localhost:5173/api/users`
- Proxied to: `http://localhost:5000/api/users`

This allows the frontend and backend to run on separate ports while avoiding CORS issues.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database connection
DATABASE_URL=your_database_url_here

# Optional: Override default ports
PORT=5000
```

## Troubleshooting

### Issue: "Cannot connect to server"
**Solution**: Make sure the Express server is running. Check the console for any error messages.

### Issue: "Port already in use"
**Solution**: 
1. Kill the process using the port:
   - Windows: `netstat -ano | findstr :5173` then `taskkill /F /PID [PID]`
   - Mac/Linux: `lsof -i :5173` then `kill -9 [PID]`
2. Or use different ports by setting PORT environment variable

### Issue: "Module not found" errors
**Solution**: Run `npm install` to ensure all dependencies are installed.

### Issue: API calls returning 404
**Solution**: Make sure you're accessing the app through `http://localhost:5173` (not port 5000).

### Issue: Changes not reflecting
**Solution**: 
1. Clear browser cache
2. Restart the dev server
3. Check that HMR is enabled in Vite

## Development Tips

1. **Use the Vite port (5173)** for accessing the application
2. **API endpoints** are automatically proxied from Vite to Express
3. **Hot Module Replacement** works automatically for React components
4. **Database changes** require running `npm run db:push`
5. **Type checking** can be run separately with `npm run check`

## Replit vs Local Differences

| Feature | Local | Replit |
|---------|-------|--------|
| Server Mode | Dual (Vite + Express) | Unified (Express serves all) |
| Hot Reload | Yes (Vite HMR) | Limited |
| Port Access | Multiple ports | Single port only |
| File Watch | Fast | Can be slower |
| Debugging | Full DevTools | Limited |

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)