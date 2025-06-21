'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { ConvertContext, ConvertContextType } from "./context";
import { use } from "react";

type Input = {
    amount: string;
    targetCurrency: string;
}

export default function ConversionForm() {
    const { dataRefetch } = use(ConvertContext) as ConvertContextType;
    const {
        register,
        handleSubmit,
    } = useForm<Input>()

    const onSubmit = async (data) => {
        await fetch('/api/convert', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        dataRefetch();
    }

    return (
        <div className="w-96">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <label htmlFor='amount'>USD Amount</label>
                <input type="number" id="amount" {...register('amount')} className="border-black border-1 border-solid rounded-md p-2" />
                <label htmlFor="targetCurrency">Target Currency</label>
                <input type="text" id="targetCurrency" {...register('targetCurrency')} className="border-black border-1 border-solid rounded-md p-2" />
                <button type="submit">Convert</button>
            </form>
        </div>
    );
}
