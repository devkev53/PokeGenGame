import { StatusBar } from 'expo-status-bar';
import {PokeballSvg} from './components/PokeballSvg'
import {
  StyleSheet, View,Text,
  Image, TouchableHighlight, FlatList,
  SafeAreaView
} from 'react-native';
import { useEffect, useState } from 'react';
import { generateTeamPokemon } from './lib/getPokemons';
import { PokemonInfoType } from './types';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    Flexo: require("./assets/fonts/Flexo-Demi.ttf")
  })

  const [pokemons, setPokemons] = useState<Array<PokemonInfoType>|[]>()
  
  const getPokemons = async() => {
    const data = await generateTeamPokemon()
    console.log(data)
    setPokemons(data)
  }

  const reGeneratePokes = () => {
    alert("RegeneratePoke's")
    setPokemons([])
    getPokemons()
  }

  useEffect(()=>{
    getPokemons()
  },[])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        {/* <PokeTypesSelect/> */}
        {/* <View style={styles.pokeballContainer}> */}
          {/* <PokeballSvg/> */}
          <View style={styles.pokeListContainer}>
            <FlatList
              style={{padding: 20, gap: 20}}
              data={pokemons}
              keyExtractor={(poke) => poke.id.toLocaleString()}
              renderItem={({item}) => (<PokemonCard pokeData={item}/>)}
            />
          </View>
            {/* Regenerate Button */}
            <TouchableHighlight
              style={styles.primaryBtn}
              onPress={reGeneratePokes}
            >
              <Text style={styles.primaryBtnText}>Generar</Text>
            </TouchableHighlight>
          {/* {pokemons!==undefined && (
            <Image 
              source={{uri: pokemons.spriteUrl.toString()}}
              style={{width: "80%", height:"80%"}}
            />
          )} */}
        {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  pokeListContainer:{
    width: "100%",
    // maxHeight: 600
  },
  // pokeballContainer: {
  //   width: 400,
  //   height:400
  // },
  primaryBtn: {
    backgroundColor:"#313131",
    color:"#f2f2f2",
    // height:60
    padding:20,
    borderRadius: 12,
    justifyContent:"center",
    alignItems:"center",
    fontFamily:"Flexo"
  },
  primaryBtnText:{
    color:"#f2f2f2",
    fontSize: 36,
    fontFamily:"Flexo"

  }
});
