export function parseOptionalAge(value: unknown): number | null | undefined {
  if (value === null || value === undefined || value === "") return null

  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) return undefined
  return parsed
}

export function parseAgeRange(minValue: unknown, maxValue: unknown) {
  const minAge = parseOptionalAge(minValue)
  const maxAge = parseOptionalAge(maxValue)

  if (minAge === undefined || maxAge === undefined) {
    throw new Error("Yaş aralığı 1-100 arasında tam sayılardan oluşmalıdır.")
  }

  if (minAge !== null && maxAge !== null && minAge > maxAge) {
    throw new Error("Minimum yaş, maksimum yaştan büyük olamaz.")
  }

  return { minAge, maxAge }
}
