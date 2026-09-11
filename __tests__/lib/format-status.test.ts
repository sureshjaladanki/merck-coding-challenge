import { formatStatus } from "../../src/lib/format-status";

describe("formatStatus", () => {
  test("formats in-development as In Development", () => {
    expect(formatStatus("in-development")).toBe("In Development");
  });

  test("formats approved as Approved", () => {
    expect(formatStatus("approved")).toBe("Approved");
  });
});
