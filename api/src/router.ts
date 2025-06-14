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

export type RouteMethod = 'HEAD' | 'OPTIONS' | 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | '*';

export interface Route {
    readonly method: RouteMethod;
    readonly path: string;
    readonly handler: RequestHandler;
}

export function collectRoutes(api: Express): void {
    const routes_methods = new Map<string, Set<RouteMethod>>();
    routes_methods.set('/', new Set());
    routes_methods.get('/')?.add('GET');

    routes.forEach((route) => {
        if (!routes_methods.has(route.path)) {
            routes_methods.set(route.path, new Set());
        }
        routes_methods.get(route.path)?.add(route.method);

        switch (route.method) {
            case 'HEAD':
                api.head(route.path, route.handler);
                break;
            case 'OPTIONS':
                api.options(route.path, route.handler);
                break;
            case 'GET':
                api.get(route.path, route.handler);
                break;
            case 'POST':
                api.post(route.path, route.handler);
                break;
            case 'PATCH':
                api.patch(route.path, route.handler);
                break;
            case 'PUT':
                api.put(route.path, route.handler);
                break;
            case 'DELETE':
                api.delete(route.path, route.handler);
                break;
            case '*':
                api.all(route.path, route.handler);
                break;
        }
    });

    api.get('/', (req, res) => {
        const map = new Map<string, string[]>();
        routes_methods.forEach((methods, route) => {
            map.set(route, Array.from(methods.add('HEAD').add('OPTIONS').values()));
        });

        res.json(Object.fromEntries(map));
    });
}
