import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../utils/scaling';
import CustomAnimatedPressable from './animated-pressable';
import RegularText from '../regular-text';
export default modalButton = ({style,children,onPress}) => {
    return(
        <View>
            <CustomAnimatedPressable style={[styles.base, style]} onPress={onPress}>
                <RegularText style={[styles.font]} >{children}</RegularText>
            </CustomAnimatedPressable>
        </View>
    )
};
const styles = StyleSheet.create({
    base: {
      height: hScale(46),
      width: wScale(240),
      backgroundColor: "#FFF500",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:wScale(10),
    },
    font: {
        fontSize: wScale(16),
        fontFamily: "Pretendard-Bold",
    }
  });