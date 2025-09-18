import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Don't serve SPA for API routes
    if (url.startsWith("/api")) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static files with optimized caching headers
  app.use(express.static(distPath, {
    maxAge: '1y', // Cache static assets for 1 year
    etag: true, // Enable ETag generation
    lastModified: true, // Send Last-Modified header
    setHeaders: (res, filePath) => {
      // Different cache strategies based on file type
      const ext = path.extname(filePath).toLowerCase();

      if (ext === '.html') {
        // HTML files - short cache to allow updates
        res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300'); // 5 minutes
      } else if (['.js', '.css', '.woff2', '.woff', '.ttf', '.otf'].includes(ext)) {
        // JS, CSS, and font files - long cache as they're usually versioned
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year, immutable
      } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg', '.ico'].includes(ext)) {
        // Images - medium cache
        res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30 days
      } else {
        // Default cache for other files
        res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
      }

      // Add security headers for static assets
      res.setHeader('X-Content-Type-Options', 'nosniff');

      // Enable compression hint
      if (['.js', '.css', '.html', '.json', '.xml', '.svg'].includes(ext)) {
        res.setHeader('Vary', 'Accept-Encoding');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes for SPA fallback
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
