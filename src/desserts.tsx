import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import dessertsQuery from "./dessertgl";
import { Mutation } from "react-apollo";

export const deleteDessert = gql`
  mutation deleteDessert($dessert: String) {
    deleteDessert(dessert: $dessert) {
      dessert
    }
  }
`;
const Dessert = () => {
  const [sort, setSort] = useState("");
  return (
    <div className="Appfl w-100 pa2">
      Nutrition List
      <Query<any, Record<string, any>> query={dessertsQuery}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Something went wrong</p>;
          if (sort)
            data.Desserts.sort((a: any, b: any) => {
              console.log(b.nutritionInfo);
              console.log(sort);

              return b.nutritionInfo[sort] - a.nutritionInfo[sort];
            });

          const sorted = <li className="aquamarine dib mr2-ns">||</li>;

          return (
            <div className="pa4">
              <div
                data-testid="dessert"
                className="overflow-auto ba b--black-20"
              >
                <table className="f6 w-100 mw8 center">
                  <thead>
                    <tr>
                      <th className="fw6 bb b--black-20 pb3 pr3 bg-white">
                        Name
                      </th>
                      <th
                        className="fw6 bb b--black-20 pb3 pr3 bg-white"
                        onClick={() => setSort("calories")}
                      >
                        Calories {sort === "calories" ? sorted : null}
                      </th>
                      <th
                        className="fw6 bb b--black-20 pb3 pr3 bg-white"
                        onClick={() => setSort("protein")}
                      >
                        Protein
                        {sort === "protein" ? sorted : null}
                      </th>
                      <th
                        className="fw6 bb b--black-20 pb3 pr3 bg-white"
                        onClick={() => setSort("carb")}
                      >
                        Carb
                        {sort === "carb" ? sorted : null}
                      </th>
                      <th
                        className="fw6 bb b--black-20 pb3 pr3 bg-white"
                        onClick={() => setSort("fat")}
                      >
                        Fat
                        {sort === "fat" ? sorted : null}
                      </th>
                      <th className="fw6 bb b--black-20 pb3 pr3 bg-white">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="lh-copy">
                    {data.Desserts.map((e: any) => {
                      return (
                        <tr key={e.dessert}>
                          <td className="pv3 pr3 bb b--black-20">
                            {e.dessert}
                          </td>
                          <td className="pv3 pr3 bb b--black-20">
                            {e.nutritionInfo.calories}
                          </td>
                          <td className="pv3 pr3 bb b--black-20">
                            {e.nutritionInfo.protein}
                          </td>
                          <td className="pv3 pr3 bb b--black-20">
                            {e.nutritionInfo.carb}
                          </td>
                          <td className="pv3 pr3 bb b--black-20">
                            {e.nutritionInfo.fat}
                          </td>
                          <td className="pv3 pr3 bb b--black-20">
                            <Mutation<any, Record<string, any>>
                              mutation={deleteDessert}
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
                              {(deleteDessert, { loading, error }) => (
                                <a
                                  className="f6 link dim ba bw2 ph3 pv2 mb2 dib mid-gray"
                                  href="#0"
                                  onClick={() =>
                                    deleteDessert({
                                      variables: {
                                        dessert: e.dessert,
                                      },
                                    })
                                  }
                                >
                                  {" "}
                                  X {error && "Failed to update"}
                                </a>
                              )}
                            </Mutation>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Dessert;
