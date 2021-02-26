import { render, screen, fireEvent, act } from "@testing-library/react";
import NewDessert, { addDessertMutation } from "./newDessert";

import { MockedProvider } from "@apollo/react-testing";

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

    const addDessert = screen.getByText(/Add Dessert/i);
    const dessertInput = screen.getByTestId("dessert");
    fireEvent.change(dessertInput, { target: { value: "Sonoran" } });
    expect(dessertInput.value).toBe("Sonoran");

    const fatInput = screen.getByTestId("fat");
    fireEvent.change(fatInput, { target: { value: 10 } });
    expect(fatInput.value).toBe("10");

    const caloriesInput = screen.getByTestId("calories");
    fireEvent.change(caloriesInput, { target: { value: 20 } });
    expect(caloriesInput.value).toBe("20");

    const proteinInput = screen.getByTestId("protein");
    fireEvent.change(proteinInput, { target: { value: 30 } });
    expect(proteinInput.value).toBe("30");

    const carbInput = screen.getByTestId("carb");
    fireEvent.change(carbInput, { target: { value: 40 } });
    expect(carbInput.value).toBe("40");
    //fireEvent.click(addDessert);
    // expect(add).toBeInTheDocument();
  });
});
