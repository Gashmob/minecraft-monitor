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
import type { Express } from 'express';
import type { ILogLayer } from 'loglayer';
import { getDatabase } from './database';

export async function injectServicesInAPI(
    api: Express,
    logger: ILogLayer,
    config: Configuration,
): Promise<void> {
    // logger
    api.use((req, _, next) => {
        req.logger = logger;
        next();
    });

    // database
    await getDatabase(config).match(
        (client) =>
            api.use((req, _, next) => {
                req.db = client;
                next();
            }),
        (fault) => {
            logger.fatal(fault.toString());
            process.exit(1);
        },
    );
}
