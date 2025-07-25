import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreScreen from '../screens/StoreScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import SectionScreen from '../screens/SectionScreen';
import CartScreen from '../screens/CartScreen';

const StoreStack = createNativeStackNavigator();

export const StoreStackNavigator = () => (
  <StoreStack.Navigator screenOptions={{ headerShown: false }}>
    <StoreStack.Screen name="StoreMain" component={StoreScreen} />
    <StoreStack.Screen name="GameDetails" component={GameDetailsScreen} />
    <StoreStack.Screen name="SectionScreen" component={SectionScreen} />
    <StoreStack.Screen name="CartScreen" component={CartScreen} />
  </StoreStack.Navigator>
);
