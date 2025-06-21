import { ConversionRow, getDb } from "./database";

export async function saveToDb(data: ConversionRow) {
    try {
        const db = await getDb();
        await db.run('INSERT INTO conversion_history (sourceAmount, sourceCurrency, targetCurrency, targetAmount) VALUES (?, ?, ?, ?)', data.sourceAmount, data.sourceCurrency, data.targetCurrency, data.targetAmount);
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function listFromDb() {
    try {
        const db = await getDb();
        const results = await db.all('SELECT * FROM conversion_history');
        return results;
    } catch (error) {
        console.error(error)
        throw new Error(error.message);
    }
}
