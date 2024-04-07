FROM oven/bun:1 as base

WORKDIR /app

COPY bun.lockb package.json ./

RUN bun install

ENTRYPOINT [ "bun", "run", "start" ]
