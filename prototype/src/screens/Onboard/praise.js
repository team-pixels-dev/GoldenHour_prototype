import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { useNavigation } from '@react-navigation/native';


export default function Onboard_1() {
    const navigation = useNavigation();
    return(
        <View style={styles.continer}>
            <RegularText style={styles.script}>굿굿</RegularText>
            <RegularText style={styles.script2}>제 시간에 도착하셨네요 !</RegularText>
            <FullSizeButton onPress={() => navigation.navigate('Onboard_1')} style={styles.button} children="완료"/>
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
    script2:{
        fontFamily:'Pretendard-Bold',
        marginTop:hScale(10)
    },
    button:{
        position:'absolute',
        bottom:hScale(75)
    }
});