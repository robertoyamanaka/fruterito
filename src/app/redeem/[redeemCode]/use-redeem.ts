import { useMutation } from "@tanstack/react-query";
import { redeem } from "./redeem";
import { PrizeRedeem } from "@/lib/types";
import { RedeemInput } from "./redeem";

export function useRedeem() {
  return useMutation<PrizeRedeem, Error, RedeemInput>({
    mutationFn: redeem,
  });
}
