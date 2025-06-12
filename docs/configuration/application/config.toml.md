This file must be in [:simple-toml: TOML](https://toml.io/) format and will contains some required keys.

## Database

```toml
# Example placeholder configuration
[database]
host="{{pghost}}"
port={{pgport}}
user="{{pguser}}"
password="{{pgpassword}}"
```

### `host`

<!-- badge:config-required -->
<!-- badge:config-type string -->

Database hostname. Must point to a valid PostgreSQL database.

### `port`

<!-- badge:config-type number -->
<!-- badge:config-default-value 5432 -->

If your instance port is difference you can set it with this key.

### `user`

<!-- badge:config-required -->
<!-- badge:config-type string -->

Login name for the database user

### `password`

<!-- badge:config-required -->
<!-- badge:config-type string -->

Password for the database user

## Logger

You can define zero or several logger output. If none are defined it will use a default one with this configuration:

```toml
[[logger]]
type="file"
dir="/var/log/minecraft-monitor/"
level="warn"
```

### `type`

<!-- badge:config-required -->
<!-- badge:config-type string -->

The logger type. Available types:

- `file` for rotated files
- `console` for output on stdout
- Other types may come in the future, you can suggest one by [creating an issue](https://github.com/Gashmob/minecraft-monitor/issues/new).

### `level`

<!-- badge:config-type string -->
<!-- badge:config-default-value warn -->

Maximum level of logging, all levels below are ignored. The hierarchy is: 

`fatal` > `error` > `warn` > `info` > `debug` > `trace`.

### `dir`

<!-- badge:config-type string -->
<!-- badge:config-default-value /var/log/minecraft-monitor/ -->

For `file` logger. Set where the files should be located.
