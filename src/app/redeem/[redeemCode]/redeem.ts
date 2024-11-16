"use server";

import { createSupabaseClient } from "@/lib/supabase-server";
import { PrizeRedeem } from "@/lib/types";

export type RedeemInput = {
  redeemCode: string;
  walletAddress: string;
  telegramUsername: string;
};

export async function redeem({
  redeemCode,
  walletAddress,
  telegramUsername,
}: RedeemInput) {
  const supabase = await createSupabaseClient();

  const { data: prize, error: prizeError } = await supabase
    .from("prizes")
    .select("*")
    .eq("redeemCode", redeemCode)
    .single();

  if (prizeError || !prize) {
    throw new Error("Invalid redeem code");
  }

  // Check if user already redeemed
  const { count: userRedeems } = await supabase
    .from("prizeRedeems")
    .select("*", { count: "exact" })
    .eq("prizeRedeemCode", redeemCode)
    .eq("telegramUsername", telegramUsername);

  if (userRedeems && userRedeems >= prize.maxRedeemsPerUser) {
    throw new Error("You have already redeemed this code");
  }

  // Insert redeem record
  const { error: redeemError, data: redeemData } = await supabase
    .from("prizeRedeems")
    .insert({
      prizeRedeemCode: redeemCode,
      walletAddress,
      telegramUsername,
    })
    .select();

  console.log("redeemData", redeemData);
  console.log("redeemError", redeemError);
  if (redeemError) {
    throw new Error("Failed to redeem code");
  }
  return redeemData[0] as PrizeRedeem;
}
