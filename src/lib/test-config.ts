// Test configuration — shared across all subjects
// 5 Module Tests + 2 Internal Tests

export const TEST_TYPES = [
  { key: "MT1", label: "Module Test 1", short: "MT1", color: "indigo" },
  { key: "MT2", label: "Module Test 2", short: "MT2", color: "blue" },
  { key: "MT3", label: "Module Test 3", short: "MT3", color: "violet" },
  { key: "MT4", label: "Module Test 4", short: "MT4", color: "purple" },
  { key: "MT5", label: "Module Test 5", short: "MT5", color: "fuchsia" },
  { key: "IT1", label: "Internal Test 1", short: "IT1", color: "amber" },
  { key: "IT2", label: "Internal Test 2", short: "IT2", color: "orange" },
] as const;

export type TestKey = (typeof TEST_TYPES)[number]["key"];

export const MODULE_TESTS = TEST_TYPES.filter((t) => t.key.startsWith("MT"));
export const INTERNAL_TESTS = TEST_TYPES.filter((t) => t.key.startsWith("IT"));

export const MAX_MARKS = 100;
