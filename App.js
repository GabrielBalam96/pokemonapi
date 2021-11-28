import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pokemon: [],
      url: "https://pokeapi.co/api/v2/pokemon/",
    };
  }

  componentDidMount() {
    this.getPokemon();
  }
  getPokemon = () => {
    this.setState({ loading: true });
    fetch(this.state.url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokemon: res.results,
          url: res.next,
          loading: false,
        })
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>Descargando pokemon!</Text>
          <StatusBar style="auto" />
        </View>
      );
    }

    return (
      <View style={{flex:1,padding:50,paddingLeft:5}}>
        <Text>Lista de Pokemon</Text>
        <FlatList 
        data={this.state.pokemon} 
          renderItem={({item}) => <text>{item.name}</text>}
          
        keyExtractor={(item, index)=> index.toString()}>
          
        </FlatList>
       
       
      </View>
    );
  }
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
