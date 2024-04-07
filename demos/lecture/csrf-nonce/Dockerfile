FROM oven/bun:1 as base

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install
COPY src/ .

USER bun

EXPOSE 8000
EXPOSE 8001

ENTRYPOINT ["bun", "run", "start"]
