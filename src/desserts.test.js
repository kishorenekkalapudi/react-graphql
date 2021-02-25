import { render, screen } from "@testing-library/react";
import Dessert from "./desserts";

import { MockedProvider } from "@apollo/react-testing";
import dessertsQuery from "./dessertgl";

// The component AND the query need to be exported
describe("dessert page", () => {
  test("basic content", async () => {
    const mocks = {
      request: {
        query: dessertsQuery,
      },
      result: {
        data: {
          Desserts: [
            {
              dessert: "Nougat",
              nutritionInfo: {
                carb: 50,
                calories: 360,
                fat: 19,
                protein: 37,
              },
            },
            {
              dessert: "test1",
              nutritionInfo: {
                carb: 20,
                calories: 30,
                fat: 10,
                protein: 600,
              },
            },
          ],
        },
      },
    };
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Dessert />
      </MockedProvider>
    );

    const h1 = screen.getByText(/Nutrition List/i);
    expect(h1).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/Nougat/i)).toBeInTheDocument();
  });
});
