import {useState, useEffect} from 'react'
import {View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import {getFavorites} from '../..//utils/storage'
import {useIsFocused} from '@react-navigation/native'
import {FoodList} from '../../components/foodList'

export function Favorites () {
const isFocous = useIsFocused(); 
const [receipes, setReceipes] = useState([]); 

useEffect(()=> {

    let isActivy = true; 

    async function getReceipes() {
        const result = await getFavorites("@appreceipes")
    if (isActivy) {
        setReceipes(result)
    }
    }
    if (isActivy) {
        getReceipes()
    }

}, [isFocous])
    return (
        <SafeAreaView style={styles.container}> 
        <Text style={styles.title}> Receitas Favoritas</Text>
        {
            receipes.length === 0 && (
            <Text>Você ainda não tem nenhuma receita salva</Text>
            )
        }
        <FlatList showsVerticalScrollIndicator={false}
            style={{marginTop: 14}}
            data={receipes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <FoodList data={item}/> }
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
    }
})