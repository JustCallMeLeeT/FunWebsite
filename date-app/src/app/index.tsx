import { useState } from 'react';
import { DimensionValue, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const initialImage = require('../../assets/initial.webp');
const happyImage = require('../../assets/happy.webp');

const sadImages = [
  require('../../assets/sad1.webp'),
  require('../../assets/sad2.webp'),
  require('../../assets/sad4.webp'),
  require('../../assets/sad3.webp'),
];

export default function Index() {
  const [noCount, setNoCount] = useState(0);
  const [answeredYes, setAnsweredYes] = useState(false);
  const [noPosition, setNoPosition] = useState<{ top: DimensionValue; left: DimensionValue } | null>(null);
  const [currentImage, setCurrentImage] = useState(initialImage);

  const handleNoPress = () => {
    setNoCount(noCount + 1);
    
    const randomTop: DimensionValue = `${Math.floor(Math.random() * 60) + 20}%`;
    const randomLeft: DimensionValue = `${Math.floor(Math.random() * 60) + 20}%`;
    setNoPosition({ top: randomTop, left: randomLeft });

    const randomIndex = Math.floor(Math.random() * sadImages.length);
    setCurrentImage(sadImages[randomIndex]);
  };

  const handleYesPress = () => {
    setAnsweredYes(true);
  };

  const yesFontSize = 16 + noCount * 12;
  const yesPaddingV = 12 + noCount * 6;
  const yesPaddingH = 24 + noCount * 12;

  const noFontSize = Math.max(4, 16 - noCount * 2);
  const noPaddingV = Math.max(4, 12 - noCount * 1.5);
  const noPaddingH = Math.max(6, 24 - noCount * 3);

  if (answeredYes) {
    return (
      <View style={styles.container}>
        <Image source={happyImage} style={styles.image} />
        <Text style={styles.successText}>Yay! See you on our date! ❤️</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={currentImage} style={styles.image} />
      
      <Text style={styles.questionText}>Would you like to be my date? 🌹</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button, 
            styles.yesButton, 
            { paddingVertical: yesPaddingV, paddingHorizontal: yesPaddingH }
          ]}
          onPress={handleYesPress}
        >
          <Text style={[styles.buttonText, { fontSize: yesFontSize }]}>Yes</Text>
        </TouchableOpacity>

        {!noPosition && (
          <TouchableOpacity
            style={[
              styles.button, 
              styles.noButton, 
              { paddingVertical: noPaddingV, paddingHorizontal: noPaddingH }
            ]}
            onPress={handleNoPress}
          >
            <Text style={[styles.buttonText, { fontSize: noFontSize }]}>No</Text>
          </TouchableOpacity>
        )}
      </View>

      {noPosition && noFontSize > 4 && (
        <TouchableOpacity
          style={[
            styles.button, 
            styles.noButton, 
            { 
              position: 'absolute', 
              top: noPosition.top, 
              left: noPosition.left,
              paddingVertical: noPaddingV, 
              paddingHorizontal: noPaddingH 
            }
          ]}
          onPress={handleNoPress}
        >
          <Text style={[styles.buttonText, { fontSize: noFontSize }]}>No</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 30,
    resizeMode: 'cover',
  },
  questionText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  successText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#e91e63',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  yesButton: {
    backgroundColor: '#4caf50',
  },
  noButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});