import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [answeredYes, setAnsweredYes] = useState(false);

  const handleNoPress = () => {
    setNoCount(noCount + 1);
  };

  const handleYesPress = () => {
    setAnsweredYes(true);
  };

  // Dynamically calculate sizes based on how many times "No" was clicked
  const yesFontSize = 16 + noCount * 12;
  const yesPaddingV = 12 + noCount * 6;
  const yesPaddingH = 24 + noCount * 12;

  const noFontSize = Math.max(4, 16 - noCount * 2);
  const noPaddingV = Math.max(4, 12 - noCount * 1.5);
  const noPaddingH = Math.max(6, 24 - noCount * 3);

  if (answeredYes) {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>Yay! See you on our date! ❤️</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

        {noFontSize > 4 && (
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