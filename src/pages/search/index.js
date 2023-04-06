import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native'; 
import {useRoute} from '@react-navigation/native'; 
import api from  '../../services/api'
import { FoodList } from '../../components/foodList';
export function Search () {
    const route = useRoute(); 
    const [receipes, setReceipes] = useState([]); 

    useEffect(()=>{
        async function fetchReceipe () {
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            setReceipes(response.data); 
        }
        fetchReceipe(); 
    }, [route.params?.name])


    return (
        <SafeAreaView style={styles.container}> 
        <FlatList showsVerticalScrollIndicator={false}
            data={receipes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <FoodList data={item}/> }
            ListEmptyComponent={() => <Text style={styles.text}> Não encontramos o que está buscando...</Text>}
        />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F3F9FF', 
        flex: 1, 
        paddingStart: 14, 
        paddingEnd: 14,
        paddingTop: 36,   
    }, 
    title: {
        color: '#000', 
        fontWeight: 'bold', 
        fontSize: 24
    }, 
    text: {
        fontSize: 16
    }
})