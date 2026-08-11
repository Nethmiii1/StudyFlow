import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import subjects from '../data/subjects';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Subjects</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search subjects..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredSubjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('SubjectDetails', {
                subject: item,
              })
            }
          >
            <Text style={styles.subjectName}>{item.name}</Text>
            <Text style={styles.subjectCode}>{item.code}</Text>
            <Text style={styles.subjectDescription}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No subjects found.
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsButtonText}>
          Open Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },

  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subjectCode: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  subjectDescription: {
    fontSize: 14,
    lineHeight: 20,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },

  settingsButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  settingsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});