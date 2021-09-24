# ---------------- Build stage
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
# Install app dependencies
RUN npm i
# Add the source code to app
COPY . /usr/src/app/
# Generate the build of the application
RUN npm run build --prod

# # ---------------- Deploy stage
# FROM nginx:1.21.3-alpine
# # Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*
# # Copy the build output to replace the default nginx contents.
# COPY --from=build /usr/src/app/dist/sicuy-front /usr/share/nginx/html
# # Expose port 80
# EXPOSE 80