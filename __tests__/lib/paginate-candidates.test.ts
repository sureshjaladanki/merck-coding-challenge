import { paginateCandidates } from "../../src/lib/paginate-candidates";

describe("paginateCandidates", () => {
  const items = ["a", "b", "c", "d", "e"];

  test("returns the requested page of items", () => {
    const result = paginateCandidates(items, 2, 2);

    expect(result.items).toEqual(["c", "d"]);
    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(2);
    expect(result.total).toBe(5);
    expect(result.totalPages).toBe(3);
  });

  test("returns an empty page when the page is past the last item", () => {
    const result = paginateCandidates(items, 4, 2);

    expect(result.items).toEqual([]);
    expect(result.totalPages).toBe(3);
    expect(result.page).toBe(4);
  });

  test("returns an empty page when the page is below 1", () => {
    const result = paginateCandidates(items, 0, 2);

    expect(result.items).toEqual([]);
  });

  test("falls back to the default page size when pageSize is not positive", () => {
    const result = paginateCandidates(items, 1, 0);

    expect(result.pageSize).toBe(10);
    expect(result.items).toEqual(items);
  });
});
