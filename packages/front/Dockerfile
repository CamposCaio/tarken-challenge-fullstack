FROM node:16.15.0-alpine3.14 AS builder
WORKDIR /app/front

COPY package*.json ./
RUN yarn

COPY . ./
RUN yarn build

# ---

FROM nginx:1.20.2-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*

# Copies static resources from builder stage
COPY --from=builder /app/front/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
