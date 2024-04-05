import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/scaling';
import RegularText from '../../component/RegularText'

import {useDispatch, useSelector} from "react-redux";

import { setColor } from '../../stores/colorSlice';

import clock from '../../assets/onboard1/clock.png'

export default function Onboard_1() {

    const color = useSelector((state) => state.color.value);
    const dispatch = useDispatch();

    return(
        <View style={styles.continer}>
            {/* <Image style={styles.clock_image} source={clock}/> */}
            <RegularText style={styles.script}>늦지 않게 해드릴게요!{color}</RegularText>
            <Button onPress={() => dispatch(setColor())} title='hello'></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    continer:{
        justifyContent: 'center',
        alignItems: 'center'
    },

    clock_image:{
        justifyContent: 'center',
        alignItems: 'center',
        width: wScale(280),
        height: wScale(280),
    },

    script:{
        fontSize:wScale(28),
        fontFamily:'Pretendard-Bold'
    }
});