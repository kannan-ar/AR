FROM node:18 AS build

WORKDIR /app
COPY . .
WORKDIR "/app/src/ui-service"

RUN npm install
ARG CLIENT_ID=""
ARG AUTHORITY=""
ARG REDIRECT_URI=""

RUN sed -i \
    -e "s|clientId: '.*'|clientId: '${CLIENT_ID}'|" \
    -e "s|authority: '.*'|authority: '${AUTHORITY}'|" \
    -e "s|redirectUri: '.*'|redirectUri: '${REDIRECT_URI}'|" \
    /app/src/ui-service/src/environments/environment.ts
RUN npm run build --prod

FROM nginx:latest AS serve
COPY --from=build /app/src/ui-service/dist/ui-service /usr/share/nginx/html
COPY --from=build /app/src/ui-service/src/config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]