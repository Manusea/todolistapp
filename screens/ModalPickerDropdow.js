import React from "react";
import{
    StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView
} from 'react-native'

const OPTIONS =['RED','GREEN','BLUE','BLACK','PINK'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT= Dimensions.get('window').height;
const ModalPickerDropdow = (props) =>{

    const onPressItem=(option) =>{
        props.changeModalVisibility(false)
        props.setData(option)
    }
    const option =OPTIONS.map((item, index) =>{
        return (
            <TouchableOpacity
                style={styles.option}
                key = {index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>

            </TouchableOpacity>
        )
    })
    return(
        <TouchableOpacity
        onPress={() => props.changeModalVisibility(false)}
        style={styles.container}
        >
            <View style={[styles.modal,{width:WIDTH-20,height:HEIGHT/2}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    modal:{
        backgroundColor:'#ffffff',
        borderRadius:10,

    },
    option:{
        alignItems:'flex-start'
    },
    text:{
        margin:20,
        fontSize:20,
        fontWeight:'bold'
    }

})
export {ModalPickerDropdow}