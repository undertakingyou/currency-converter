'use client';

import { useQuery } from "@tanstack/react-query";
import { ConversionRow } from "./api/database";
import ConversionForm from "./components/form";
import { ConvertContext } from "./components/context";

export default function Home() {
  const { data, refetch } = useQuery({
    queryKey: ['conversions'],
    queryFn: async () => {
      const response = await fetch('/api/convert');
      return await response.json() as { results: ConversionRow[], status: string };
    },
  })

  return (
    <ConvertContext value={{ dataRefetch: refetch }}>
      <div className="flex flex-col gap-8">
        <ConversionForm />
        <div className="flex flex-col gap-2">
          {(data?.results ?? []).map((entry, index) => {
            return (
              <div key={index}>{`Conversion of ${entry.sourceAmount} (${entry.sourceCurrency}) becomes ${entry.targetAmount} (${entry.targetCurrency})`}</div>
            )
          })}
        </div>
      </div>
    </ConvertContext>
  );
}
