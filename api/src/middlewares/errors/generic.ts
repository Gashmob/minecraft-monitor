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
import type { ErrorMiddleware } from '../../types/router-types';

export const generic: ErrorMiddleware = {
    handler: (req, res) => {
        if (req.error === undefined) {
            req.logger.debug('Uncaught server error');
            res.status(500).json({
                error: {
                    code: 500,
                    message: 'Uncaught server error',
                },
            });
            return;
        }

        const error = req.error;
        req.logger.withMetadata(error).debug('Caught error');
        res.status(error.error.code).json(error);
    },
};
