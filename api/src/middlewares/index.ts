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
import { trace_route } from './trace-route';
import type { ErrorMiddleware, Middleware } from '../types/router-types';
import { error_404 } from './errors/404';
import { generic } from './errors/generic';

export const middlewares: Middleware[] = [trace_route];

export const error_middlewares: ErrorMiddleware[] = [
    error_404,
    // Keep `generic` at the end
    generic,
];
