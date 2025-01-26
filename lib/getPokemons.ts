import { PokemonInfoType } from "../types"

export async function getTypeData (typeUrl:String) {
  const response = await fetch(typeUrl.toString())
  const results = await response.json()
  return {
    id: results.id,
    name: results.name,
    spriteUrl:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${results.id}.png`
  }
}

export async function generatePokemon() {
  let baseNumber = 151
  let randomPokemonId = Math.random() * (baseNumber - 1) + 1

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.trunc(randomPokemonId)}`)
  const {id, name, sprites, types } = await response.json()
  const typeList = []
  for (let type of types) {
    // console.log(type.type.url)
    const typeRes = await getTypeData(type.type.url)
    typeList.push(typeRes)
  }
  // console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-")
  // console.log(typeList)
  // console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-")
  const myPoke:PokemonInfoType = {
    id,
    name,
    spriteUrl: sprites.other["official-artwork"].front_default,
    types:typeList
  }
  return myPoke
}

export async function generateTeamPokemon (number=6) {
  let pokeList = []
  while (pokeList.length<number) {
    if (pokeList.length<=0) {
      let poke = await generatePokemon()
      pokeList.push(poke)
    } else {
      let poke = await generatePokemon()
      pokeList.push(poke)
    }
  }
  return pokeList
}