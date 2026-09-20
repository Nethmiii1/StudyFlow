
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL =
  'https://6a9edaa82f89be7fb70ea912.mockapi.io/api/subjects';

const STORAGE_KEY = '@studyflow_subjects';

export default function AddSubjectScreen({
  navigation,
  theme,
}) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] =
    useState('');
  const [loading, setLoading] = useState(false);

  const addSubject = async () => {
    if (
      !name.trim() ||
      !code.trim() ||
      !description.trim()
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill all fields.'
      );
      return;
    }

    setLoading(true);

    const localSubject = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      code: code.trim(),
      description: description.trim(),
    };

    try {
      // --------------------------------
      // SAVE LOCALLY FIRST
      // --------------------------------
      const stored =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );

      const currentSubjects = stored
        ? JSON.parse(stored)
        : [];

      const updatedSubjects = [
        ...currentSubjects,
        localSubject,
      ];

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedSubjects)
      );

      // --------------------------------
      // TRY REST API
      // --------------------------------
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            code: code.trim(),
            description:
              description.trim(),
          }),
        });

        if (response.ok) {
          const apiSubject =
            await response.json();

          // Replace local ID with API ID
          const finalSubjects =
            updatedSubjects.map(
              (subject) =>
                subject.id === localSubject.id
                  ? apiSubject
                  : subject
            );

          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(finalSubjects)
          );
        }
      } catch (apiError) {
        console.log(
          'Offline - saved locally'
        );
      }

      Alert.alert(
        'Success',
        'Subject added successfully!',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.log('ADD ERROR:', error);

      Alert.alert(
        'Error',
        'Could not save subject.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor:
            theme?.background ||
            '#F2F8FF',
        },
      ]}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          ➕ Add Subject
        </Text>

        <Text style={styles.headerText}>
          Add a new subject to StudyFlow
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Subject Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Artificial Intelligence"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>
          Subject Code
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. CSI2113"
          value={code}
          onChangeText={setCode}
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.textArea,
          ]}
          placeholder="Enter subject description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addSubject}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading
              ? 'Saving...'
              : 'Add Subject'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#7B61FF',
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  headerText: {
    color: '#EEE9FF',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    margin: 18,
    padding: 20,
    borderRadius: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D8D0FF',
    borderRadius: 12,
    padding: 13,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#FAF9FF',
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  addButton: {
    backgroundColor: '#7B61FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 22,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  cancelButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 5,
  },

  cancelText: {
    color: '#777',
    fontWeight: '700',
  },
});
