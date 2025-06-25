FROM nginx:1.29.0-alpine@sha256:b2e814d28359e77bd0aa5fed1939620075e4ffa0eb20423cc557b375bd5c14ad AS production

RUN apk update && apk add nodejs

COPY app/dist /usr/share/nginx/html
COPY api/dist /api
COPY tools/docker /

HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl --head -f http://localhost/api/health || exit 1

ENTRYPOINT [ "/entrypoint.sh" ]

FROM production AS development

RUN apk add npm && npm install -g nodemon

COPY tools/docker-dev /
