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

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getLogger } from './logger';
import * as loglayer from 'loglayer';
import * as filelog from '@loglayer/transport-log-file-rotation';

vi.mock('loglayer');
vi.mock('@loglayer/transport-log-file-rotation');

describe('logger', () => {
    describe('getLogger', () => {
        beforeEach(() => {
            vi.resetAllMocks();
        });

        it('Should build a console transport', () => {
            const ConsoleTransport = vi.spyOn(loglayer, 'ConsoleTransport');
            getLogger({
                database: { host: '', port: 0, user: '', password: '' },
                logger: [{ type: 'console', level: 'debug' }],
            });

            expect(ConsoleTransport).toHaveBeenCalledExactlyOnceWith({
                logger: console,
                level: 'debug',
            });
        });

        it('Should build a file transport', () => {
            const LogFileRotationTransport = vi.spyOn(filelog, 'LogFileRotationTransport');
            getLogger({
                database: { host: '', port: 0, user: '', password: '' },
                logger: [{ type: 'file', level: 'trace', dir: '/var/log/minecraft-monitor' }],
            });

            expect(LogFileRotationTransport).toHaveBeenCalledExactlyOnceWith({
                filename: '/var/log/minecraft-monitor/api-%DATE%.log',
                compressOnRotate: true,
                createSymlink: true,
                dateFormat: 'Y_M_D',
                frequency: 'daily',
                symlinkName: 'current.log',
                level: 'trace',
            });
        });
    });
});
