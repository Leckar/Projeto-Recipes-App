const fetchCategories = async (type) => {
  const url = `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/list.php?c=list`;
  try {
    const response = await fetch(url);
    const { [type]: result } = await response.json();
    return result;
  } catch {
    return undefined;
  }
};

export default fetchCategories;
