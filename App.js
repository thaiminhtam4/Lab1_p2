import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [
    'C', 'DEL', '/', 
    '7', '8', '9', '*', 
    '4', '5', '6', '-', 
    '1', '2', '3', '+', 
    '0', '.', '='
  ];

  function calculator() {
    let lastArr = currentNumber[currentNumber.length - 1];
    
    if (['/', '*', '-', '+', '.'].includes(lastArr)) {
      return;
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      setLastNumber(currentNumber + '=' + result);
    }
  }

  function handleInput(buttonPressed) {
    Vibration.vibrate(35);
    
    if (buttonPressed === 'C') {
      setLastNumber('');
      setCurrentNumber('');
      return;
    }
    if (buttonPressed === 'DEL') {
      setCurrentNumber(currentNumber.slice(0, -1));
      return;
    }
    if (buttonPressed === '=') {
      setLastNumber(currentNumber + '=');
      calculator();
      return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    results: {
      width: '100%',
      minHeight: '40%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      padding: 20,
    },
    resultText: {
      color: darkMode ? '#00b9d6' : '#00b9d6',
      fontSize: 48,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 24,
      alignSelf: 'flex-end',
    },
    themeButton: {
      position: 'absolute',
      top: 30,
      right: 30,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      borderRadius: 25,
      padding: 10,
    },
    buttons: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '20%',
      height: 70,
      margin: 5,
      borderRadius: 10,
      backgroundColor: darkMode ? '#414853' : '#ededed',
    },
    operatorButton: {
      backgroundColor: '#00b9d6',
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    },
    operatorText: {
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.themeButton} onPress={() => setDarkMode(!darkMode)}>
        <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} />
      </TouchableOpacity>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button}
            style={[styles.button, ['/', '*', '-', '+', '='].includes(button) && styles.operatorButton]}
            onPress={() => handleInput(button)}
          >
            <Text style={[styles.textButton, ['/', '*', '-', '+', '='].includes(button) && styles.operatorText]}>
              {button}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
