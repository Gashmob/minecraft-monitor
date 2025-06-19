FROM nginx:1.28.0-alpine@sha256:aed99734248e851764f1f2146835ecad42b5f994081fa6631cc5d79240891ec9 AS production

RUN apk update && apk add nodejs

COPY api/dist /api
COPY tools/docker /

HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl --head -f http://localhost/api/health || exit 1

ENTRYPOINT [ "/entrypoint.sh" ]

FROM production AS development

RUN apk add npm && npm install -g nodemon

COPY tools/docker-dev /
