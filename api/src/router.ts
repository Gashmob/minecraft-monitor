/**
 * Minecraft Monitor
 * Copyright (C) 2025-Present  Kevin Traini
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import type { Express, RequestHandler } from 'express';
import { routes } from './routes';
import { error_middlewares, middlewares } from './middlewares';
import type { RouteMethod } from './types/router-types';

export function collectMiddlewares(api: Express): void {
    middlewares.forEach((middleware) => {
        addRouteToAPI(api, middleware.method, middleware.path, middleware.handler);
    });
}

export function collectRoutes(api: Express): void {
    const routes_methods = new Map<string, Set<RouteMethod>>();
    routes_methods.set('/', new Set());
    routes_methods.get('/')?.add('GET');

    routes.forEach((route) => {
        const path = route.path;
        const method = route.method;
        const handler = route.handler;
        if (!routes_methods.has(path)) {
            routes_methods.set(path, new Set());
        }
        routes_methods.get(path)?.add(method);

        addRouteToAPI(api, method, path, handler);
    });

    api.get('/', (req, res) => {
        const map = new Map<string, string[]>();
        routes_methods.forEach((methods, route) => {
            map.set(route, Array.from(methods.add('HEAD').add('OPTIONS').values()));
        });

        res.json(Object.fromEntries(map));
    });
}

export function collectErrorMiddlewares(api: Express): void {
    error_middlewares.forEach((middleware) => {
        api.use(middleware.handler);
    });
}

function addRouteToAPI(
    api: Express,
    method: RouteMethod,
    path: string,
    handler: RequestHandler,
): void {
    switch (method) {
        case 'HEAD':
            api.head(path, handler);
            break;
        case 'OPTIONS':
            api.options(path, handler);
            break;
        case 'GET':
            api.get(path, handler);
            break;
        case 'POST':
            api.post(path, handler);
            break;
        case 'PATCH':
            api.patch(path, handler);
            break;
        case 'PUT':
            api.put(path, handler);
            break;
        case 'DELETE':
            api.delete(path, handler);
            break;
        case '*':
            api.all(path, handler);
            break;
    }
}
