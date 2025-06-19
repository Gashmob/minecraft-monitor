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

const FaultSymbol = Symbol('Fault');

export interface Fault {
    readonly [FaultSymbol]: true;

    getStackTraceAsString(): string;

    toString(): string;

    valueOf(): string;

    readonly [key: string]: () => boolean | string;
}

const newFault = (message: string, error: Error | null = null): Fault => {
    const _error = error ?? new Error();

    return {
        [FaultSymbol]: true,
        getStackTraceAsString: (): string => _error.stack ?? '',
        toString: (): string => message,
        valueOf: (): string => message,
    };
};

export const isFault = (something: unknown): something is Fault =>
    Object.getOwnPropertySymbols(something).includes(FaultSymbol);

export const Fault = {
    fromMessage(message: string): Fault {
        return newFault(message);
    },

    fromError(error: Error): Fault {
        return newFault(error.message, error);
    },

    fromErrorWithMessage(error: Error, message: string): Fault {
        return newFault(message, error);
    },
};
