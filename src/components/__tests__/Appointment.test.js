import React from "react";

import { render, cleanup } from "@testing-library/react";

import Show from "components/Appoinment/Show";

afterEach(cleanup);

describe("appointment components", () => {
  xit("renders Show without crashing", () => {
    render(<Show />);
  });
});
