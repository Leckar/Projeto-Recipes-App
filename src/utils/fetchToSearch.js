const fetchToSearch = async ({ ingredient, name, firstLetter }, type) => {
  const url = () => {
    if (ingredient) return `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/filter.php?i=${ingredient}`;
    if (name) return `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?s=${name}`;
    return `https://www.${type === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?f=${firstLetter}`;
  };

  if (firstLetter && firstLetter.length > 1) {
    return global.alert('Your search must have only 1 (one) character');
  }

  try {
    const response = await fetch(url());
    const { [type]: result } = await response.json();
    return result;
  } catch {
    return undefined;
  }
};

export default fetchToSearch;
