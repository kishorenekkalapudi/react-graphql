import gql from "graphql-tag";

export default gql`
  {
    Desserts {
      dessert
      nutritionInfo {
        fat
        protein
        carb
        calories
      }
    }
  }
`;
