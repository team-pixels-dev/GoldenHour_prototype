import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { useNavigation } from '@react-navigation/native';


export default function Onboard_1() {
    const navigation = useNavigation();
    return(
        <View style={styles.continer}>
            <RegularText style={styles.script}>늦지 않게 해드릴게요!</RegularText>
            <FullSizeButton onPress={() => navigation.navigate('Onboard_2')} style={styles.button} children="시작하기"/>
        </View>
    )
}

const styles = StyleSheet.create({
    continer:{
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },

    script:{
        fontFamily:'Pretendard-Bold',
    },
    
    button:{
        position:'absolute',
        bottom:hScale(75)
    }
});