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
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as pg from 'pg';
import { getDatabase } from './database';

vi.mock('pg');

describe('database', () => {
    describe('getDatabase', () => {
        let client_connect: MockInstance;
        const configuration: Configuration = {
            database: {
                user: 'user',
                password: 'password',
                host: 'host',
                port: 5432,
            },
            logger: [],
        };

        beforeEach(() => {
            client_connect = vi.fn();

            const Client = vi.fn();
            Client.mockReturnValue({ connect: client_connect });
            vi.spyOn(pg, 'Client').mockImplementation(Client);
        });

        it('Should return Err if client.connect fails', async () => {
            client_connect.mockRejectedValue(new Error('some error'));
            const client = await getDatabase(configuration);

            expect(client.isErr()).toBe(true);
        });

        it('Should return Ok when connect success', async () => {
            client_connect.mockResolvedValue(null);
            const client = await getDatabase(configuration);

            expect(client.isOk()).toBe(true);
        });
    });
});
