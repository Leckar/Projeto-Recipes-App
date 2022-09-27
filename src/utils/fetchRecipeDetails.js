const fetchRecipeDetails = async (type, id) => {
  const url = `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const json = await response.json();
  const result = json[type][0];
  return result;
};

export default fetchRecipeDetails;
