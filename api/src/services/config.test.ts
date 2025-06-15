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
import { beforeEach, describe, expect, it } from 'vitest';
import { buildConfiguration, getConfig } from './config';
import { fs, vol } from 'memfs';
import type { Configuration, LoggerConfiguration } from './config-types';
import { CONFIG_FILE, DEFAULT_LOGGER } from './config-types';

describe('config', () => {
    describe('getConfig', () => {
        beforeEach(() => {
            vol.reset();
            vol.mkdirSync('/etc/minecraft-monitor', { recursive: true });
        });

        it('Should return Err when file not found', () => {
            const result = getConfig();
            expect(result.isErr()).toBe(true);
            result.mapErr((fault) => expect(fault.toString()).toContain('Config file not found'));
        });

        it('Should return Err when not toml', () => {
            fs.writeFileSync(CONFIG_FILE, 'not a toml');

            const result = getConfig();
            expect(result.isErr()).toBe(true);
            result.mapErr((fault) => expect(fault.toString()).toContain('Invalid TOML document'));
        });

        it('Should return Ok with good object', () => {
            fs.writeFileSync(
                CONFIG_FILE,
                `
[[logger]]
type = "file"
dir = "/var/log/minecraft-monitor/"
level = "trace"
`,
            );

            const result = getConfig();
            expect(result.isOk()).toBe(true);
            const value = result.unwrapOr(null);
            expect(value).toStrictEqual({
                logger: [
                    {
                        type: 'file',
                        dir: '/var/log/minecraft-monitor/',
                        level: 'trace',
                    },
                ],
            });
        });
    });

    describe('buildConfiguration', () => {
        it('Should return Err if logger is not an array', () => {
            const result = buildConfiguration({ logger: true });
            expect(result.isErr()).toBe(true);
            result.mapErr((fault) =>
                expect(fault.toString()).toContain('Logger configuration should be an array'),
            );
        });

        it('Should return Err if logger has not type', () => {
            const result = buildConfiguration({ logger: [{ key: 'value' }] });
            expect(result.isErr()).toBe(true);
            result.mapErr((fault) =>
                expect(fault.toString()).toContain('A logger should have a type'),
            );
        });

        it('Should return Err logger.type is not a string', () => {
            const result = buildConfiguration({ logger: [{ type: true }] });
            expect(result.isErr()).toBe(true);
            result.mapErr((fault) =>
                expect(fault.toString()).toContain('A logger should have a type'),
            );
        });

        it.each([
            [{}, { logger: [DEFAULT_LOGGER] }],
            [{ logger: [] }, { logger: [DEFAULT_LOGGER] }],
            [{ logger: [{ type: 'file' }] }, { logger: [DEFAULT_LOGGER] }],
            [
                { logger: [{ type: 'file', level: 'trace', dir: '/logs' }] },
                { logger: [{ type: 'file', level: 'trace', dir: '/logs' } as LoggerConfiguration] },
            ],
            [
                { logger: [DEFAULT_LOGGER, { type: 'console' }] },
                {
                    logger: [
                        DEFAULT_LOGGER,
                        { type: 'console', level: 'warn' } as LoggerConfiguration,
                    ],
                },
            ],
        ])('Should build the corresponding config', (input: object, expected: Configuration) => {
            const result = buildConfiguration(input);
            expect(result.isOk()).toBe(true);
            expect(result.unwrapOr(null)).toStrictEqual(expected);
        });
    });
});
