const fetchToRecipes = async (type) => {
  const url = `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?s=`;
  try {
    const response = await fetch(url);
    const { [type]: result } = await response.json();
    return result;
  } catch {
    return undefined;
  }
};

export default fetchToRecipes;
