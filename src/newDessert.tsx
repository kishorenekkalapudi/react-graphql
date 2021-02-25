import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import dessertsQuery from "./dessert";
import { useState } from "react";

export const addDessertMutation = gql`
  mutation createDessert(
    $dessert: String!
    $fat: Int!
    $carb: Int!
    $calories: Int!
    $protein: Int!
  ) {
    createDessert(
      dessert: $dessert
      fat: $fat
      carb: $carb
      calories: $calories
      protein: $protein
    ) {
      dessert
      carb
      calories
      protein
      fat
    }
  }
`;

function AddDessert() {
  const [calories, setCalories] = useState(0);
  const [dessert, setDessert] = useState("");
  const [fat, setFat] = useState(0);
  const [carb, setCarb] = useState(0);
  const [protein, setProtein] = useState(0);

  const clear = () => {
    setCalories(0);
    setDessert("");
    setFat(0);
    setCarb(0);
    setProtein(0);
  };

  return (
    <Mutation<any, Record<string, any>>
      mutation={addDessertMutation}
      refetchQueries={[
        {
          query: dessertsQuery,
        },
        {
          query: dessertsQuery,
        },
      ]}
      awaitRefetchQueries={true}
    >
      {(addDessert, { loading, error }) => (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            addDessert({
              variables: {
                dessert,
                fat,
                carb,
                calories,
                protein,
              },
            });
            clear();
          }}
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <div className="mt3">
              <label className="db fw4 lh-copy f6">Dessert</label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="text"
                value={dessert}
                onChange={({ target: { value } }) => {
                  setDessert(value);
                }}
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6">Fat</label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="text"
                value={fat || ""}
                onChange={({ target: { value } }) => {
                  setFat(parseInt(value));
                }}
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6">Calories</label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="text"
                value={calories || ""}
                onChange={({ target: { value } }) => {
                  setCalories(parseInt(value));
                }}
              />
            </div>

            <div className="mt3">
              <label className="db fw4 lh-copy f6">Protein</label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="text"
                value={protein || ""}
                onChange={({ target: { value } }) => {
                  setProtein(parseInt(value));
                }}
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6">Carb</label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="text"
                value={carb || ""}
                onChange={({ target: { value } }) => {
                  setCarb(Number.parseInt(value));
                }}
              />
            </div>

            <div>
              <div className="mt3">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                  type="submit"
                  value="Add Dessert"
                />
              </div>

              {loading && <p>Loading...</p>}
              {error && <p>Error :( Please try again</p>}
            </div>
          </fieldset>
        </form>
      )}
    </Mutation>
  );
}

export default AddDessert;
