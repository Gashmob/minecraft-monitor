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
import type { ILogLayer, LogLayerTransport } from 'loglayer';
import { ConsoleTransport, LogLayer } from 'loglayer';
import { serializeError } from 'serialize-error';
import { LogFileRotationTransport } from '@loglayer/transport-log-file-rotation';

export const DEFAULT_LOGGER: LoggerConfiguration = {
    type: 'file',
    level: 'warn',
    dir: '/var/log/minecraft-monitor',
};

export function getLogger(config: Configuration): ILogLayer {
    const transports: LogLayerTransport[] = [];

    for (const logger of config.logger) {
        switch (logger.type) {
            case 'file':
                transports.push(buildFileTransport(logger));
                break;
            case 'console':
                transports.push(buildConsoleTransport(logger));
                break;
        }
    }

    return new LogLayer({
        transport: transports,
        errorSerializer: serializeError,
    });
}

function buildFileTransport(logger: LoggerConfiguration): LogLayerTransport {
    return new LogFileRotationTransport({
        filename: logger.dir + '/api-%DATE%.log',
        compressOnRotate: true,
        createSymlink: true,
        dateFormat: 'Y_M_D',
        frequency: 'daily',
        symlinkName: 'current.log',
        level: logger.level,
    });
}

function buildConsoleTransport(logger: LoggerConfiguration): LogLayerTransport {
    return new ConsoleTransport({
        logger: console,
        level: logger.level,
    });
}
