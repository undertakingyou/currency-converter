import { ConversionRow } from "../database";
import { listFromDb, saveToDb } from "../save-data";

export async function POST(request: Request): Promise<Response> {
    const body = await request.json()

    const response = await fetch(`https://open.er-api.com/v6/latest/USD`)
    const responseBody = await response.json()


    const conversionRate = responseBody.rates[body.targetCurrency]
    const targetAmount = body.amount * conversionRate;

    const conversionRow: ConversionRow = {
        sourceAmount: body.amount,
        sourceCurrency: 'USD',
        targetCurrency: body.targetCurrency,
        targetAmount
    }

    saveToDb(conversionRow);

    return new Response(JSON.stringify(conversionRow), { status: 201 });
}

export async function GET(request: Request): Promise<Response> {
    const results = await listFromDb()
    console.log('GET DB results', results)

    return new Response(JSON.stringify({ results, status: 'ok' }), { status: 200 })

}
