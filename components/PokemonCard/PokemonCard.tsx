import { Image, Pressable, Text, View } from "react-native"
import { useFonts } from "expo-font"
import {getTypeData} from '../../lib/getPokemons'

const  pokeballIcon = require("../../assets/Poké_Ball_icon.png")

export const PokemonCard = ({pokeData}:{pokeData:PokemonInfoType}) => {
  const [show, setShow] = useState(false)
  const [fontsLoaded] = useFonts({
    Flexo: require("../../assets/fonts/Flexo-Demi.ttf")
  })

  const revealPokemon = () => {
    setShow(!show)
  }

  if (!fontsLoaded) return null

  return (
    <View style={styles.pokeCard}>
      
      {/* Pokemon Image */}
      <View
        style={styles.imageContainer}
      >
        {show=== false
          ?
            (
              <Pressable
                onLongPress={revealPokemon}
              >
                <Image
                  style={styles.pokeImage}
                  source={pokeballIcon}
                />
              </Pressable>
            )
          : (
            <Pressable
              onLongPress={revealPokemon}
            >
              <Image
                style={styles.pokeImage}
                source={{uri:pokeData.spriteUrl.toString()}}
              />
            </Pressable>

          )
        }
      </View>
      
      <Text style={styles.number}>
        N.°
        {pokeData.id.toString()}
      </Text>
      <Text style={styles.name}>
        {pokeData.name}
      </Text>

      {/* Types Description */}
      <View style={{flexDirection:"row", gap: 10}}>
        {pokeData.types.map((
            {id, name, spriteUrl}:
            {id:Number, name:String, spriteUrl:String}
          )=>(
            <Image
              key={`${name}-${id.toString}`}
              source={{uri: spriteUrl.toString()}}
              style={styles.typesImage}
            />
            // <Text>{spriteUrl}</Text>
        ))}
      </View>

    </View>
  )
}


import { StyleSheet } from "react-native"
import { PokemonInfoType } from "../../types"
import { useEffect, useState } from "react"
import { getTypesData } from "../../lib/pokedata"
import { PokeballSvg } from "../PokeballSvg"

const styles = StyleSheet.create({
  pokeCard:{
    width: "100%",
  },
  imageContainer:{
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    justifyContent: "center",
    alignItems:"center"
  },
  pokeImage:{
    height:300,
    width:300
  },
  number:{
    fontFamily: 'Flexo',
    fontWeight:"bold",
    fontSize: 20,
    opacity: .6
  },
  name:{
    fontSize: 40,
    textTransform:"capitalize",
    fontWeight:"bold",
    fontFamily: 'Flexo'
  },
  typesImage:{
    width:"40%",
    height: 35,
    resizeMode:"stretch",
    borderRadius: 6
  },
})