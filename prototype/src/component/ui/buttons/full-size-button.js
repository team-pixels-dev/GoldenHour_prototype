import { StyleSheet, Pressable } from 'react-native';
import {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../utils/scaling';
import CustomAnimatedPressable from './animated-pressable';
import RegularText from '../../../component/ui/regular-text'

/** 큰 사이즈의 버튼, 애니메이션과 폰트가 적용됨 */
export default function fullSizeButton({style, children, onPress}){
    return (
        <CustomAnimatedPressable style={[styles.base, style]} onPress={onPress}>
                <RegularText style={[styles.font]}>{children}</RegularText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
      height: hScale(62),
      width: wScale(347),
      backgroundColor: "#FFF500",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:wScale(38.5)
    },
    font: {
        fontSize: wScale(16),
        fontFamily: "Pretendard-Bold",
    }
  });