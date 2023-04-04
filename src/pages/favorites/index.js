import {View, Text, StyleSheet} from 'react-native'
export function Favorites () {
    return (
        <View style={styles.container}> 
            <Text> Pagina favoritos!</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue', 
    }
})