import { StyleSheet, Pressable } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../utils/scaling';
import Button from './animated-pressable';
import RegularText from '../../../component/ui/regular-text'

export default function fullSizeButton({style, children, onPress}){
    return (
        <Button style={[styles.base, style]} onPress={onPress}>
                <RegularText style={[styles.font, style]} >{children}</RegularText>
        </Button>
    )
}

const styles = StyleSheet.create({
    base: {
      height: hScale(62),
      width: wScale(347),
      backgroundColor: "#FFF500",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:wScale(38.5),
      marginTop: hScale(250)
    },
    font: {
        fontSize: wScale(16),
        fontFamily: "Pretendard-Bold",
    }
  });