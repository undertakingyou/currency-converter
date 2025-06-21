import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

export type ConversionRow = {
    sourceAmount: number;
    sourceCurrency: string;
    targetCurrency: string;
    targetAmount: number;
}

let db = null;

export async function getDb() {
    if (!db) {
        db = await open({
            filename: path.join(process.cwd(), 'converter.db'),
            driver: sqlite3.Database,
        })
        await db.run('CREATE TABLE IF NOT EXISTS conversion_history (sourceAmount, sourceCurrency, targetCurrency, targetAmount )');
    }
    return db;
}
