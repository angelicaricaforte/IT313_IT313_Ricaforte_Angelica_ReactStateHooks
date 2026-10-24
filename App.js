import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Custom Hook: stopwatch timer
function useStopwatch(isRunning) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: stop interval
    return () => clearInterval(interval);
  }, [isRunning]);

  return seconds;
}

// PracticeTracker Component
function PracticeTracker({ solved, onSolve, onReset }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Practice Tracker</Text>
      <Text style={styles.text}>Solved: {solved}</Text>

      {solved >= 5 && (
        <Text style={styles.success}>Great job!</Text>
      )}

      <Button title="Solve +1" onPress={onSolve} />
      <View style={styles.gap} />
      <Button title="Reset" onPress={onReset} />
    </View>
  );
}

// Stopwatch Component
function Stopwatch({ seconds, isRunning }) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const time =
    String(minutes).padStart(2, '0') +
    ':' +
    String(remainingSeconds).padStart(2, '0');

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Lab Stopwatch</Text>
      <Text style={styles.timer}>{time}</Text>
      <Text style={styles.text}>
        {isRunning ? 'Running…' : 'Paused'}
      </Text>
    </View>
  );
}

// Parent Component
export default function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lab Practice Tracker</Text>

      <PracticeTracker
        solved={solved}
        onSolve={() => setSolved(s => s + 1)}
        onReset={() => setSolved(0)}
      />

      <Stopwatch
        seconds={seconds}
        isRunning={isRunning}
      />

      <View style={styles.gap} />
      <Button
        title="Start"
        onPress={() => setIsRunning(true)}
      />
      <View style={styles.gap} />
      <Button
        title="Stop"
        onPress={() => setIsRunning(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f5f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 10,
  },
  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gap: {
    height: 10,
  },
});
    
