import React, { useState } from 'react';
import { 
  View, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  Modal, 
  StyleSheet,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_SPACING = 16;

const ScreenshotCarousel = ({ screenshots = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (screenshots.length === 0) {
    return null;
  }

  const openImage = (url) => {
    setSelectedImage(url);
    setModalVisible(true);
  };

  const closeImage = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={screenshots}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: CARD_SPACING }}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            onPress={() => openImage(`https:${item.url.replace('t_thumb', 't_1080p')}`)}
            style={[styles.cardContainer, { width: CARD_WIDTH, marginRight: CARD_SPACING }]}
          >
            <Image
              source={{ uri: `https:${item.url.replace('t_thumb', 't_screenshot_med')}` }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeImage}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={closeImage}
          >
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ScreenshotCarousel;