FROM nginx:alpine
COPY ./build /usr/share/nginx/html
COPY ./developer.deriv.com.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html