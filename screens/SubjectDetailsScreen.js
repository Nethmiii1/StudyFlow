import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SubjectDetailsScreen({ route }) {
  const { subject } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {subject.name}
      </Text>

      <Text style={styles.code}>
        Subject Code: {subject.code}
      </Text>

      <Text style={styles.sectionTitle}>
        About this subject
      </Text>

      <Text style={styles.description}>
        {subject.description}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          Study Tip
        </Text>

        <Text style={styles.infoText}>
          Review your lecture notes regularly and practise
          questions related to this subject.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F7FA',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  code: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
  },

  infoBox: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  infoText: {
    fontSize: 15,
    lineHeight: 22,
  },
});