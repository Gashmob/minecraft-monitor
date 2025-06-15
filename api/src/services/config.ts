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
import { existsSync, readFileSync } from 'node:fs';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import { Fault } from '@minecraft-monitor/fault';
import { parse } from 'smol-toml';
import type { Configuration, LoggerConfiguration } from './config-types';
import { CONFIG_FILE, DEFAULT_LOGGER } from './config-types';

export function getConfig(): Result<object, Fault> {
    if (!existsSync(CONFIG_FILE)) {
        return err(Fault.fromMessage('Config file not found'));
    }

    try {
        const content = readFileSync(CONFIG_FILE, { encoding: 'utf8' });
        const config = parse(content);
        return ok(config);
    } catch (error: unknown) {
        return err(Fault.fromError(error as Error));
    }
}

export function buildConfiguration(input: object): Result<Configuration, Fault> {
    return buildLoggerConfiguration(input).andThen((logger) => ok({ logger }));
}

function buildLoggerConfiguration(input: object): Result<LoggerConfiguration[], Fault> {
    if (!('logger' in input)) {
        return ok([DEFAULT_LOGGER]);
    }

    const logger_array = input.logger;
    if (!Array.isArray(logger_array)) {
        return err(Fault.fromMessage('Logger configuration should be an array'));
    }

    const loggers: LoggerConfiguration[] = [];
    for (const logger of logger_array) {
        if (!('type' in logger) || typeof logger.type !== 'string') {
            return err(Fault.fromMessage('A logger should have a type'));
        }

        switch (logger.type) {
            case 'file':
                loggers.push({
                    type: 'file',
                    level: logger?.level ?? DEFAULT_LOGGER.level,
                    dir: logger?.dir ?? DEFAULT_LOGGER.dir,
                });
                break;
            case 'console':
                loggers.push({
                    type: 'console',
                    level: logger?.level ?? DEFAULT_LOGGER.level,
                });
                break;
        }
    }

    if (loggers.length === 0) {
        loggers.push(DEFAULT_LOGGER);
    }

    return ok(loggers);
}
