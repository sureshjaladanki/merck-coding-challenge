import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "../../src/app/layout";

describe("RootLayout", () => {
  test("exports site metadata", () => {
    expect(metadata.title).toBe("Drug Candidate Explorer");
  });

  test("renders the site title and skip link around children", () => {
    render(
      <RootLayout>
        <p>Page body</p>
      </RootLayout>,
    );

    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(
      screen.getByRole("link", { name: /drug candidate explorer/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByText("Page body")).toBeInTheDocument();
  });
});
