---
title: 'How to Optimize Your Next.js Dockerfile'
pubDate: 2024-06-27
description: 'React component detail'
tags: ["Dokcer"]
---
As I've been writing Dockerfile for my Next.js frontend, I've noticed that the build times can be quite lengthy.Today, I want to share some strategies to optimize Dockerfile.
## Use multi-stage builds

1. First of all, Multi-stage builds let us reduce the size of our image, and why it can do that
- Separation of Build and Runtime Environments
- Selective Copying>
- Layer Reduction
- Optimized Caching