FROM nginx:1.12-alpine
COPY build /usr/share/nginx/html

ARG API_URL

ENV ARG_ENv=${API_URL}

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
