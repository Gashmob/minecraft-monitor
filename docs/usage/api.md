---
title: API
---

A public API is exposed behind url `/api`. Except for some routes, they all need an authentication token

## `/`

<!-- badge:api-auth open -->
<!-- badge:api-method GET -->

Returns a map of existing routes with their methods. Note that all routes have at least `HEAD` and `OPTIONS` methods.

```json
{
    "/": [
        "GET",
        "HEAD",
        "OPTIONS"
    ],
    "/health": [
        "HEAD",
        "OPTIONS"
    ]
}
```

## `/health`

<!-- badge:api-auth open -->
<!-- badge:api-method HEAD -->

A simple route to check if API is alive. Will always return a 200.
