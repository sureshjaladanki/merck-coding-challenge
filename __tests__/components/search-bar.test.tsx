import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../../src/components/search-bar";

describe("SearchBar", () => {
  test("calls onSearchChange when the user types", async () => {
    const user = userEvent.setup();
    const handleSearchChange = jest.fn();

    render(<SearchBar value="" onSearchChange={handleSearchChange} />);

    await user.type(
      screen.getByRole("searchbox", { name: /search by name/i }),
      "ave",
    );

    expect(handleSearchChange).toHaveBeenCalled();
    expect(handleSearchChange.mock.calls.map((call) => call[0]).join("")).toBe(
      "ave",
    );
  });
});
