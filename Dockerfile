FROM node:20-alpine as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
# Replace environment.staging by environment.ts
# RUN mv src/environments/environment.staging.ts src/environments/environment.ts
RUN npm install
RUN npm run build

## Stage 2: Serve app with nginx server

### Use official nginx image as the base image
FROM nginx:latest
## Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/ui_stov /usr/share/nginx/html
## Expose port 80
EXPOSE 80
