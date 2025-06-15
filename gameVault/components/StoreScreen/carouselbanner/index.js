import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Carousel = ({ artworks = [], autoPlay = true, interval = 4000, onItemPress }) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const windowWidth = Dimensions.get('window').width;
  const SWIPE_THRESHOLD = windowWidth * 0.2;

  useEffect(() => {
    if (autoPlay && artworks.length > 1) {
      const timer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % artworks.length;
        goToIndex(nextIndex);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [currentIndex, artworks.length, autoPlay, interval]);

  const goToIndex = (index) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / windowWidth);
    setCurrentIndex(index);
  };

  if (!artworks || artworks.length === 0) return null;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={artworks}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={(item, index) => {
          // Usa o id se existir, senão usa o index
          return item.id ? item.id.toString() : `section-${index}`
        }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.9} 
            style={{ width: windowWidth }}
            onPress={() => onItemPress(item)}
          >
            <Image 
              source={item.source} 
              style={[styles.image, { width: windowWidth }]} 
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        decelerationRate="fast"
        snapToInterval={windowWidth}
        snapToAlignment="center"
        disableIntervalMomentum={true}
      />

      {artworks.length > 1 && (
        <View style={styles.indicatorContainer}>
          {artworks.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * windowWidth,
                index * windowWidth,
                (index + 1) * windowWidth,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[styles.indicator, { opacity }]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Carousel;