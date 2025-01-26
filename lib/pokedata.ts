import { PokemonType } from "../types";

interface pokeTypeResponseI {
  name:String,
  url:String
}
export async function getTypesData() {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  const { results: typeList } = await response.json();
  let count = 0;
  let typeListData:PokemonType[] = typeList.map(({ name, url }:pokeTypeResponseI) => {
    count++;
    let spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${count}.png`;
    if (count <= 18) {
      return {
        id: count,
        name,
        spriteUrl,
      };
    }
  });
  typeListData = typeListData.slice(0,18)
  
  console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*")
  console.log(typeListData)
  return typeListData
}