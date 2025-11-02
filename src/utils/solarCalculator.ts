
export const SIMULATED_CSV_DATA = [
  [NaN, 'FIXED RULES (RESIDENTIAL)', NaN, NaN, NaN, NaN, NaN, NaN, 'FIXED RULES (COMMERCIAL)', NaN, NaN, NaN, NaN, NaN],
  [NaN, 'POWERBILL IN RS', '0-1680', '1680-2520', '2520-3360', '3360-4200', 'input', NaN, 'POWERBILL IN RS', '0-2400', '2400-3600', '3600-4800', '4800-6000', 'input'],
  [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
  [NaN, 'KW SUGGESTED', '2KW', '3KW', '4KW', '5KW', NaN, NaN, 'KW SUGGESTED', '2KW', '3KW', '4KW', '5KW', NaN],
  [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
  [NaN, '80Sqft/KW', NaN, NaN, NaN, NaN, NaN, NaN, '80Sqft/KW', NaN, NaN, NaN, NaN, NaN],
  [NaN, 'AREA REQUIRED', '160 Sqft', '240 Sqft', '320 Sqft', '400 Sqft', NaN, NaN, 'AREA REQUIRED', '160 Sqft', '240 Sqft', '320 Sqft', '400 Sqft', NaN],
  [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
  [NaN, '4 UNITS/KW/DAY', NaN, NaN, NaN, NaN, NaN, NaN, '4 UNITS/KW/DAY', NaN, NaN, NaN, NaN, NaN],
  [NaN, 'TOTAL UNITS GENERATED', 240, 360, 480, 600, NaN, NaN, 'TOTAL UNITS GENERATED', 240, 360, 480, 600, NaN],
  [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
  [NaN, 'UNIT CHARGE : RS.7/KW', NaN, NaN, NaN, NaN, NaN, NaN, 'UNIT CHARGE : RS.10/KW', NaN, NaN, NaN, NaN, NaN],
  [NaN, 'MONTHLY SAVINGS', 1680, 2520, 3360, 4200, NaN, NaN, 'MONTHLY SAVINGS', 2400, 3600, 4800, 6000, NaN],
  [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
  [NaN, 'COST', '70000/KW + GST', '65000/KW + GST', '62000/KW + GST', '60000/KW + GST', NaN, NaN, 'COST', '57000/KW + GST', '50000/KW + GST', '47000/KW + GST', '45000/KW + GST', NaN],
  [NaN, 'TOTAL COST', '140000 + GST', '195000 + GST', '248000 + GST', '300000 + GST', NaN, NaN, 'TOTAL COST', '114000 + GST', '150000 + GST', '188000 + GST', '225000 + GST', NaN],
  [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
  [NaN, 'Yearly Savings', 20160, 30240, 40320, 50400, NaN, NaN, 'Yearly Savings', 28800, 43200, 57600, 72000, NaN],
];

// ---------------- Helper Functions ----------------

// Parse numeric values from strings like "1,40,000 + GST"
const parseNumberFromString = (s: any): number => {
  if (typeof s === 'number') return s;
  if (typeof s !== 'string') return 0;
  const cleaned = s.replace(/,/g, '').match(/(\d+)/);
  return cleaned ? parseInt(cleaned[1], 10) : 0;
};

// Parse a range string like "1680-2520"
const parseRange = (rangeStr: any): [number, number] => {
  if (typeof rangeStr !== 'string') return [0, 0];
  const cleaned = rangeStr.trim();
  if (!cleaned) return [0, 0];
  const parts = cleaned.split('-').map(p => p.trim());
  const min = parseInt(parts[0], 10) || 0;
  const max = parts[1] ? parseInt(parts[1], 10) || Infinity : Infinity;
  return [min, max];
};

// ---------------- Main Calculation ----------------
export const calculateSolarSavings = (monthlyBill: number, installationType: string) => {
  try {
    const rules = SIMULATED_CSV_DATA;

    let rangesRow = rules[1];
    let kwRow = rules[3];
    let areaRow = rules[6];
    let unitsRow = rules[9];
    let totalCostRow = rules[15];
    let yearlySavingsRow = rules[17];

    let colStartIndex, colEndIndex;

    if (installationType === 'Residential') {
      colStartIndex = 2;
      colEndIndex = 5;
    } else {
      colStartIndex = 9;
      colEndIndex = 12;
    }

    let foundColIndex = -1;
    for (let i = colStartIndex; i <= colEndIndex; i++) {
      const rangeStr = rangesRow[i];
      const [min, max] = parseRange(rangeStr);
      if (monthlyBill >= min && monthlyBill <= max) {
        foundColIndex = i;
        break;
      }
    }

    // fallback to last bucket
    if (foundColIndex === -1 && monthlyBill > 0) {
      foundColIndex = colEndIndex;
    }

    if (foundColIndex !== -1) {
      const monthlyUnits = parseNumberFromString(unitsRow[foundColIndex]);
      return {
        kwSuggested: kwRow[foundColIndex] || 'N/A',
        areaRequired: areaRow[foundColIndex] || 'N/A',
        totalUnitsGenerated: monthlyUnits * 12,
        annualSavings: parseNumberFromString(yearlySavingsRow[foundColIndex]),
        totalCost: parseNumberFromString(totalCostRow[foundColIndex]),
      };
    }
  } catch (error) {
    console.error('Error parsing calculation rules:', error);
  }

  return {
    kwSuggested: 'N/A',
    areaRequired: 'N/A',
    totalUnitsGenerated: 0,
    annualSavings: 0,
    totalCost: 0,
  };
};
