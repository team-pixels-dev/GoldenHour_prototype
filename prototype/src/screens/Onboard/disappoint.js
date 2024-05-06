import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import RegularText from '../../component/ui/regular-text'
import FullSizeButton from '../../component/ui/buttons/full-size-button';
import { useNavigation } from '@react-navigation/native';


export default function Onboard_1() {
    const navigation = useNavigation();
    return(
        <View style={styles.continer}>
            <RegularText style={styles.script}>흠..</RegularText>
            <RegularText style={styles.script2}>다음에는 늦지 않아봐요 !</RegularText>
            <FullSizeButton onPress={() => navigation.navigate('Onboard_1')} children="완료"/>
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
        marginTop:hScale(300)
    },
    script2:{
        fontFamily:'Pretendard-Bold',
        marginTop:hScale(10)
    }
});