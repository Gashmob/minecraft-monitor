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
import { Client } from 'pg';
import { ResultAsync } from 'neverthrow';
import { Fault } from '@minecraft-monitor/fault';

export function getDatabase(config: Configuration): ResultAsync<Client, Fault> {
    const client = new Client({
        user: config.database.user,
        password: config.database.password,
        host: config.database.host,
        port: config.database.port,
        database: config.database.user,
    });

    return ResultAsync.fromPromise(
        client.connect().then(() => client),
        (error): Fault => Fault.fromError(error as Error),
    );
}
