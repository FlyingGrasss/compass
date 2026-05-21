// lib/format-amount.ts

type AmountInput = number | string | { toString(): string } | null | undefined

export function parseAmount(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null
  const n = typeof value === "number" ? value : Number(String(value).replace(",", "."))
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

export function formatAmount(
  amount: AmountInput,
  currency = "TRY"
): string | null {
  if (amount === null || amount === undefined || amount === "") return null

  const value = Number(amount)

  if (!Number.isFinite(value)) return null

  const currencyLabels: Record<string, string> = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
  }

  const symbol = currencyLabels[currency] ?? currency
  const formatted = new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 2,
  }).format(value)

  if (currency === "TRY") return `${formatted} ${symbol}`
  return `${symbol}${formatted}`
}

export function formatAmountRange(
  amount: AmountInput,
  currency?: string | null
): string | null {
  return formatAmount(amount, currency ?? "TRY")
}
