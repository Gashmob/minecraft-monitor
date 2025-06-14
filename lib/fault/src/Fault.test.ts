/**
 * Daydream Web Monitor
 * Copyright (C) 2025-Present  Daydream developers
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
import { describe, expect, it } from 'vitest';
import { Fault, isFault } from './Fault';

const FAULT_MESSAGE = 'A Fault message';
const ERROR_MESSAGE = 'An Error message';

describe('Fault', () => {
    it('Builds Fault from message', () => {
        const fault = Fault.fromMessage(FAULT_MESSAGE);
        expect(isFault(fault)).toBe(true);
        expect(String(fault)).toStrictEqual(FAULT_MESSAGE);
    });

    it('Builds Fault from Error', () => {
        const fault = Fault.fromError(new Error(ERROR_MESSAGE));
        expect(isFault(fault)).toBe(true);
        expect(String(fault)).toStrictEqual(ERROR_MESSAGE);
    });

    it('Builds Fault from Error with message', () => {
        const fault = Fault.fromErrorWithMessage(new Error(ERROR_MESSAGE), FAULT_MESSAGE);
        expect(isFault(fault)).toBe(true);
        expect(String(fault)).toStrictEqual(FAULT_MESSAGE);
    });
});
