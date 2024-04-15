import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {cartDecrease, cartIncrease, cartRemove} from '../redux/cartSlice';

const {width, height} = Dimensions.get('window');

const Cart = () => {
  const cartItems = useSelector(state => state.cart.data);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(
      cartItems.map(item => {
        return {...item, quantity: item.quantity};
      }),
    );
  }, [cartItems]);

  const increaseQuantity = name => {
    const updatedItems = items.map(item => {
      if (item.name === name) {
        return {...item, quantity: item.quantity + 1};
      }
      return item;
    });
    setItems(updatedItems);
    dispatch(cartIncrease({pokemon: name}));
  };

  const decreaseQuantity = name => {
    const updatedItems = items.map(item => {
      if (item.name === name && item.quantity > 1) {
        return {...item, quantity: item.quantity - 1};
      }
      return item;
    });
    setItems(updatedItems);
    dispatch(cartDecrease({pokemon: name}));
  };

  const removeItem = name => {
    const updatedItems = items.filter(item => item.name !== name);
    dispatch(cartRemove({name}));
    setItems(updatedItems);
  };

  return (
    <View style={styles.main}>
      <ScrollView style={{marginTop: 90}}>
        {items.map((item, index) => (
          <View key={index} style={styles.direction}>
            <Text>{item.name}</Text>
            <View style={styles.align}>
              <TouchableOpacity onPress={() => decreaseQuantity(item.name)}>
                <Text style={styles.size}>-</Text>
              </TouchableOpacity>
              <Text>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQuantity(item.name)}>
                <Text style={styles.size}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.name)}>
              <Text style={styles.remove}>x</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  main: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  size: {
    fontSize: 30,
  },
  align: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: width * 0.2,
  },
  direction: {
    flexDirection: 'row',
    width: width * 0.9,
    height: height * 0.1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 10,
  },
  remove: {
    alignSelf: 'flex-end',
    fontSize: 25,
  },
});
