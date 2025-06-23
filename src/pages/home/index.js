import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Logo } from "../../components/logo";
import { FoodList } from "../../components/foodList";
import api from '../../services/api'
import {useNavigation} from '@react-navigation/native'; 
import {Text as MotiText} from 'moti'

export function Home() {
  const navigation = useNavigation(); 
const [inputValue, setInputValue] = useState(''); 
const [foods, setFoods] = useState([]); 


useEffect(() => {
    async function fechAPI() {
      const response = await api.get('/foods'); 
      setFoods(response.data);
    }
    fechAPI(); 
}, [])

function handleSearch () {
  if (inputValue === '') return; 
  let input = inputValue; 
  setInputValue(''); 
  navigation.navigate('Search', {name: input}); 
    console.log('voce clicou Teste6', inputValue ); 
} 

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <MotiText style={styles.title}
      from={{opacity: 0, translateY: 15}}
      animate={{opacity: 1, translateY: 0 }}
      transition={{delay: 100, type: 'timing', duration: 650}}
      >Encontre a receita</MotiText>

      <MotiText style={styles.title}
          from={{opacity: 0, translateY: 18}}
          animate={{opacity: 1, translateY: 0 }}
          transition={{delay: 200, type: 'timing', duration: 850}}
      >que combine com você</MotiText>

      <View style={styles.form}>
        <TextInput 
        placeholder="Digite o nome da comida" 
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        style={styles.input}/>
        <TouchableOpacity onPress={handleSearch}> 
            <Ionicons name='search'
            size={28}
            color='#4cbe6c'
            /> 
        </TouchableOpacity>
      </View>
      <FlatList 
        data={foods}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <FoodList data={item}/>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e0e0e",
  },
  form: {
    backgroundColor: '#FFF', 
    width: '100%', 
    borderRadius: 8, 
    marginBottom: 16, 
    marginTop: 16,
    borderWidth: 1, 
    borderColor: '#ECECEC', 
    paddingLeft: 8, 
    paddingRight: 8, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'

  }, 
  input: {
    width: '90%', 
    maxWidth: '90%', 
    height: 54,
  }
});
