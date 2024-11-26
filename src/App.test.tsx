// App.test.tsx
import App from "@/App";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders Dashboard component", async () => {
    // Render the App component
    render(<App />);

    // Wait for the Dashboard component to be rendered
    const dashboardElement = await screen.findByTestId("dashboard");

    // Ensure the Dashboard element is in the document
    expect(dashboardElement).toBeInTheDocument();
  });
});
