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
import express from 'express';
import { collectErrorMiddlewares, collectMiddlewares, collectRoutes } from './router';
import { buildConfiguration, getConfig } from './services/config';
import { getLogger } from './services/logger';
import { injectServicesInAPI } from './services';

getConfig()
    .andThen((config) => buildConfiguration(config))
    .map(async (config) => {
        const logger = getLogger(config);
        logger.info('Starting API...');

        const app = express();
        const api = express();

        logger.trace('Injecting services');
        await injectServicesInAPI(api, logger, config);
        logger.trace('Collecting middlewares');
        collectMiddlewares(api);
        logger.trace('Collecting routes');
        collectRoutes(api);
        logger.trace('Collecting error middlewares');
        collectErrorMiddlewares(api);

        app.use('/api', api);
        app.listen(3000, (error?: Error) => {
            if (error !== undefined) {
                logger.fatal(`Failed to start API ${error.message}`);
                process.exit(1);
            }

            logger.info('Listening on port `3000`...');
        });
    })
    .mapErr((fault) => {
        console.error(`Failed to start API: ${fault}`);
        process.exit(1);
    });
