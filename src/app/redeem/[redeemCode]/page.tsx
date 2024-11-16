"use client";

import { DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

import { RedeemCodeForm } from "./redeem-code.form";

export default function RedeemPage({
  params,
}: {
  params: { redeemCode: string };
}) {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 py-24 shadow-2xl sm:px-24 xl:py-32">
      <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Redeem your code
      </h2>
      <p className="mx-auto mb-4 mt-6 max-w-lg text-center text-lg text-gray-300">
        You are logged in with
      </p>
      <DynamicWidget />
      {isLoggedIn && <RedeemCodeForm defaultRedeemCode={params.redeemCode} />}
    </div>
  );
}
