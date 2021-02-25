import { render, screen, fireEvent, act } from "@testing-library/react";
import NewDessert, { addDessertMutation } from "./newDessert";

import { MockedProvider } from "@apollo/react-testing";
import dessertsQuery from "./dessert";

// The component AND the query need to be exported
describe("dessert page", () => {
  test("mutation new dessert content", async () => {
    const mocks = {
      request: {
        query: addDessertMutation,
        variables: {
          dessert: "test1",
          fat: 10,
          carb: 20,
          calories: 30,
          protein: 600,
        },
      },
      result: {
        data: {
          createDessert: {
            dessert: "test",
            carb: 20,
            calories: 30,
            protein: 600,
            fat: 10,
          },
        },
      },
    };
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <NewDessert />
      </MockedProvider>
    );

    //const h1 = screen.getByText(/Add Dessert/i);

    await act(() => {
      fireEvent.click(screen.getByText(/Add Dessert/i));
    });
    const add = screen.getByText(/Add Dessert/i);

    expect(add).toBeInTheDocument();
  });
});
