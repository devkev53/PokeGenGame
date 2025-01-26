import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
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
  options: {
    position: "absolute",
    top: 53,
    backgroundColor: "white",
    width:"100%",
    padding:10,
    borderRadius:6,
    maxHeight: 250,
  },
  styleImageType:{
    width: "80%",
    height: 30,
    resizeMode:"contain"
  },
})