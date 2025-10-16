---
title: 'How to Optimize Your Next.js Dockerfile'
pubDate: 2024-06-27
description: '分享如何優化 Next.js Dockerfile 的技巧，包括選擇合適的 base image、使用 multi-stage builds 和 standalone application'
tags: ["Docker"]
---
As I’ve been writing Dockerfiles for my Next.js projects, I’ve noticed that the build size can be quite large. Today, I want to share three strategies to optimize your Dockerfile and reduce the overall image size.

## 1. Choosing the Right Base Image
The **node:18-alpine** image is small and efficient, which helps reduce the overall size of your Docker image. Alpine images are known for their minimalistic design, making them much smaller compared to other images. If you want to use a different version, you can replace 18 with 16 or 20.
<br/>

![Base Image](../../../public/images/image.png)

## 2.   Use multi-stage builds
### Introduce
Docker introduced the Multi-Stage Builds feature in version 17.05. Before version 17.05, achieving multi-stage builds  would require multiple Dockerfiles. If the build environment was complex, maintaining multiple Dockerfiles might be necessary. However, Multi-Stage Builds can address the issue of needing to maintain multiple Dockerfiles.

### How to use it
To utilize multi-stage builds, we need to use multiple **FROM** statements in a single Dockerfile. Each **FROM** instruction can use a different base image and starts a new stage of the build.
![image](../../../public/images/DockerFile.png)
## 3.   Use Standalone Application in Next.js
<!-- we can see [Next.js Doc/api-reference/next-config-js/output](https://nextjs.org/docs/app/api-reference/next-config-js/output) -->
### Automatically Copying Traced Files
Next.js can automatically create a standalone folder that copies only the necessary files for a production deployment including select files in node_modules.
To leverage this automatic copying you can enable it in your next.config.js:
```typescript
// next.config.js
module.exports = {
  output: 'standalone',
}
```
This will create a folder at **.next/standalone** which can then be deployed on its own without installing node_modules.
<br/>
Additionally, a minimal server.js file is also output which can be used instead of next start. This minimal server does not copy the public or .next/static folders by default as these should ideally be handled by a CDN instead, although these folders can be copied to the standalone/public and standalone/.next/static folders manually, after which server.js file will serve these automatically.

## Final Dockerfile

```dockerfile
# Base Stage
FROM node:18-alpine AS base

# Deps Stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.staging.sample .env.production
RUN npm run build

# Runner Stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD HOSTNAME=localhost node server.js
```
## Troubleshooting
If you encounter any issues while building your Docker image, here are some common problems and solutions:

<li>Node modules not found: Ensure that the COPY --from=deps /app/node_modules ./node_modules line is correctly placed and that the node_modules directory exists in the deps stage.
<li>Environment variables: Make sure that your environment variables are correctly set up in your Dockerfile and your Next.js configuration.
<li>File permissions: If you encounter permission issues, check the ownership and permissions of the copied files, especially in the Runner Stage.

## Conclusion
By choosing the right base image, utilizing multi-stage builds, and leveraging Next.js standalone applications, you can significantly reduce the size of your Docker images and improve your deployment process. These strategies help keep your applications lightweight, efficient, and easier to manage.
## Reference
- [Docker Multi-Stage Builds Documentation](https://docs.docker.com/build/building/multi-stage/)

- [Next.js Documentation - Standalone Mode](https://nextjs.org/docs/app/api-reference/next-config-js/output)

- [Next.js Github Dokcerfile](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile)

- [understanding-nextjs-docker-images](https://dev.to/sliplane/understanding-nextjs-docker-images-2g08)