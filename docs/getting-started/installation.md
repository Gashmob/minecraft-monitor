## With Docker compose *(recommended)*

All the application is shipped inside a single [:simple-docker: Docker](https://www.docker.com/) image except for the database. The currently used database is [:simple-postgresql: PostgreSQL](https://hub.docker.com/_/postgres).

Here an example configuration for your `docker-compose.yml` file:

```yaml
services:
  app:
    image: ghcr.io/gashmob/minecraft-monitor:latest
    ports:
      - "80:80"
    volumes:
      - ./config.toml:/etc/minecraft-monitor/config.toml # (1)
    depends_on:
      - db

  db:
    image: postgres:latest
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

1. A volume bind to application configuration file, you can see more [here](../configuration/application/config.toml.md).

!!! warning "Do not use this file directly"
    You should adapt it to your environment. Especially for the database configuration and version pin.

## From sources

The git repository is available here: [:simple-github: https://github.com/Gashmob/minecraft-monitor](https://github.com/Gashmob/minecraft-monitor).

You can either build yourself the docker image and run it anywhere or run it locally by "just" building the app. No matter your choice, all the tools are available inside a [:simple-nixos: Nix shell](https://nixos.org/).
