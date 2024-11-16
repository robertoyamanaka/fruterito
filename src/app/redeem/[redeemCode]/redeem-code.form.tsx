"use client";

import { useState } from "react";
import { useRedeem } from "./use-redeem";
import { Spinner } from "@/components/spinner";

export function RedeemCodeForm({
  defaultRedeemCode,
}: {
  defaultRedeemCode: string;
}) {
  const [redeemCode, setRedeemCode] = useState<string>(defaultRedeemCode);
  const { mutate: redeem, isPending, error } = useRedeem();

  const triggerRedeem = () => {
    redeem({
      redeemCode,
      walletAddress: "0x123",
      telegramUsername: "telegramUser",
    });
  };

  return (
    <div className="mx-auto mt-10 flex max-w-md flex-col gap-x-4">
      <div className="flex flex-row gap-x-2">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="redeem-code"
          name="redeem-code"
          value={redeemCode}
          onChange={(e) => setRedeemCode(e.target.value)}
          type="text"
          placeholder="Enter your code"
          autoComplete="redeem-code"
          className="min-w-0 flex-auto rounded-md border-2 border-white bg-black px-3.5 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        />
        <button
          type="submit"
          onClick={triggerRedeem}
          disabled={isPending}
          className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 active:bg-gray-300"
        >
          {isPending ? <Spinner /> : "Redeem"}
        </button>
      </div>
      {error && <p className="mt-1 text-red-500">{error.message}</p>}
    </div>
  );
}
