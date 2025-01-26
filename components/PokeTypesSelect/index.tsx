import { useCallback, useEffect, useState } from "react"
import { getTypesData } from "../../lib/pokedata"
import { PokemonType } from "../../types"
import { View, Text, TouchableOpacity, FlatList, TouchableHighlight, Image } from "react-native"

import {styles} from './styles'


const TypeContainer = ({type, index}:{type:PokemonType, index:Number}) => {
  return (
    <TouchableHighlight>
      {/* <Text>{type.name}</Text> */}
      <Image
      style={styles.styleImageType}
      source={{uri:type.spriteUrl.toString()}} />
    </TouchableHighlight>
  )
}


export const PokeTypesSelect = () => {

  const [valueSelect, setValueSelect] = useState()
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
  )
}
