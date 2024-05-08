
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../utils/scaling';
import RegularText from '../../../component/ui/regular-text';
import { useNavigation } from '@react-navigation/native';
import CustomAnimatedPressable from './animated-pressable';
export default circleButton = ({style, children, color, onPress, backgroundC}) => {
    return (
        <CustomAnimatedPressable style={[styles.circle1, {borderColor: color}]} onPress={onPress}>
            <CustomAnimatedPressable style={[styles.circle2, {borderColor: color, backgroundColor: backgroundC}]} onPress={onPress}>
                <RegularText style={[styles.font, style]} >{children}</RegularText>
            </CustomAnimatedPressable>
        </CustomAnimatedPressable>
    )
};

const styles = StyleSheet.create({
    circle1: {
        width: wScale(78),
        height: hScale(78),
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: wScale(50),
        backgroundColor: '#FFFFFF',
        borderWidth: wScale(1),
    },
    circle2: {
        width: wScale(70),
        height: hScale(70),
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: wScale(50),
        backgroundColor: '#FFFFFF',
        borderWidth: wScale(1),
    },
    font: {
        fontFamily:'Pretendard-Bold',
        fontSize: wScale(20)
    }
})