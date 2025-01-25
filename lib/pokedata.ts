export async function getTypesData() {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  const { results: typeList } = await response.json();
  let count = 0;
  const typeListData = typeList.map(({ name, url }) => {
    count++;
    let spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${count}.png`;
    return {
      id: count,
      name,
      spriteUrl,
    };
  });
  return typeListData
}