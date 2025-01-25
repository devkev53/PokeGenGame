import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, StyleSheet, Text, View, Image,
  SectionList, FlatList, TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { getTypesData } from './lib/pokedata';

type PokemonType = {
  id:Number,
  name:String,
  spriteUrl:String
}

const TypeContainer = ({type, index}:{type:PokemonType, index:Number}) => {
  return (
    <TouchableHighlight>
      <Text>{type.name}</Text>
    </TouchableHighlight>
  )
}

export default function App() {
  const [types, setTypes] = useState<Array<PokemonType>>([])
  const [expanded, setExpanded] = useState(false)

  const getPokemonTypes = async () => {
    const data:PokemonType[] = await getTypesData()
    setTypes(data)
    console.log(data)
  }

  const toggleExpanded = useCallback(()=>setExpanded(!expanded), [expanded])

  useEffect(() => {
    getPokemonTypes()
  },[])

  return (
    <View style={styles.container}>
      {types.length===0 ? (
        <ActivityIndicator/>
      ) : (
        <View>
          <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={toggleExpanded}>
            <Text style={styles.text}>All Types</Text>
          </TouchableOpacity>
          {expanded
            ?
              <View style={styles.options}>
                <FlatList
                  data={types}
                  keyExtractor={((type) => type.id.toString())}
                  renderItem={({item, index}) => <TypeContainer type={item} index={index}/>}
                  />
              </View>
            : null}
        </View>

        //   types.map((type)=>(
        //     <View key={type.id.toString()}>
        //       <Text>{type.name}</Text>
        //       <Image source={{uri: type.spriteUrl.toString()}} style={styles.imageType} />
        //     </View>
        // ))
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  options: {
    position: "absolute",
    top: 53,
    backgroundColor: "white",
    width:"100%",
    padding:10,
    borderRadius:6
  },
  imageType:{
    width: "100%",
    height: 20,
    resizeMode:"center"
  },
  text:{
    fontSize:15,
    opacity:0.8,
    width:"100%"
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection:"row",
    width: "100%",
    alignItems:"center",
    paddingHorizontal:15,
    borderRadius:8,
  },
});
