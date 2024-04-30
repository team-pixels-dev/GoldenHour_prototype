import { Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ style, children, onPress }) => {
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withSpring(0.4);
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPress={onPress}
      onPressOut={handlePressOut}
      style={[{ opacity }, style]}
    >
      {children}
    </AnimatedPressable>
  );
};

export default Button