import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {cartAdd} from '../redux/cartSlice';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const dispatch = useDispatch();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const res = await response.json();
    setPokemonData(res.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const setPokemon = item => {
    dispatch(cartAdd({pokemon: item}));
    Alert.alert('Success', 'Pokemon was added to cart', [{text: 'Ok'}]);
  };

  const renderPokemon = ({item}) => {
    return (
      <TouchableOpacity style={styles.pokemon} onPress={() => setPokemon(item)}>
        <Text>{item.name}</Text>
        <View style={styles.select}>
          <Text style={styles.buy}>Add to cart</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={pokemonData}
        renderItem={renderPokemon}
        keyExtractor={item => item.name}
        numColumns={2}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemon: {
    width: width * 0.45,
    height: height * 0.1,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    width: width * 0.2,
    height: height * 0.03,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buy: {
    color: 'white',
  },
});
