"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Component() {
  const [totalTokens, setTotalTokens] = useState<number | "">("");
  const [totalSol, setTotalSol] = useState<number | "">("");
  const [desiredSol, setDesiredSol] = useState<number | "">("");
  const [tokensToSell, setTokensToSell] = useState<number | null>(null);
  const [pricePerToken, setPricePerToken] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof totalTokens === "number" && typeof totalSol === "number" && totalTokens > 0) {
      setPricePerToken(totalSol / totalTokens);
    } else {
      setPricePerToken(null);
    }
  }, [totalTokens, totalSol]);

  useEffect(() => {
    if (pricePerToken && typeof desiredSol === "number") {
      setTokensToSell(desiredSol / pricePerToken);
    } else {
      setTokensToSell(null);
    }
  }, [pricePerToken, desiredSol]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | "">>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setter(value);
  };

  const handleCopyToClipboard = () => {
    if (tokensToSell !== null) {
      navigator.clipboard.writeText(tokensToSell.toFixed(2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Token Profit Calculator</CardTitle>
          <CardDescription>
            Easily calculate how many tokens you need to sell to reach a desired profit or withdraw your initial investment. Enter your total tokens, their worth in SOL, and the amount of SOL you&apos;d like to cash out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="total-tokens">Total Number of Tokens</Label>
            <Input
              id="total-tokens"
              type="number"
              placeholder="Enter total tokens"
              value={totalTokens}
              onChange={handleInputChange(setTotalTokens)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total-sol">Total Worth in SOL</Label>
            <Input
              id="total-sol"
              type="number"
              placeholder="Enter total SOL worth"
              value={totalSol}
              onChange={handleInputChange(setTotalSol)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desired-sol">Desired SOL Amount</Label>
            <Input
              id="desired-sol"
              type="number"
              placeholder="Enter desired SOL amount"
              value={desiredSol}
              onChange={handleInputChange(setDesiredSol)}
            />
          </div>
          {pricePerToken !== null && (
            <div className="text-sm text-gray-600">
              Price per token: {pricePerToken.toFixed(6)} SOL
            </div>
          )}
          {tokensToSell !== null && (
            <div className="flex items-center bg-gray-100 p-4 rounded-md shadow-sm">
              <span className="text-xs font-semibold text-gray-800 break-all">
                Tokens to sell: <span className="text-sm text-gray-600">{tokensToSell.toFixed(2)}</span>
              </span>
              <button
                className={`ml-2 px-2 py-1 text-xs rounded-md text-white font-medium transition-colors duration-300 ${
                  copied ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={handleCopyToClipboard}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
          <div className="pt-4 text-xs text-gray-500">
            <p>
              Disclaimer: This tool is for personal use and does not account for slippage, liquidity, or other market factors. This is not financial advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
