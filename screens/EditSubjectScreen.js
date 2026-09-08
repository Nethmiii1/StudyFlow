import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const API_URL =
  'https://6a9edaa82f89be7fb70ea912.mockapi.io/api/subjects';

export default function EditSubjectScreen({ route, navigation, theme }) {
  const { subject } = route.params;

  const [name, setName] = useState(subject.name);
  const [code, setCode] = useState(subject.code);
  const [description, setDescription] = useState(subject.description);

  const updateSubject = async () => {
    if (!name || !code || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${subject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          code,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      Alert.alert('Success', 'Subject updated successfully!');

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not update subject.');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        Edit Subject
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.input,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        placeholder="Subject Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.input,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        placeholder="Subject Code"
        value={code}
        onChangeText={setCode}
      />

      <TextInput
        style={[
          styles.input,
          styles.description,
          {
            backgroundColor: theme.input,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: theme.primary },
        ]}
        onPress={updateSubject}
      >
        <Text style={styles.buttonText}>
          Update Subject
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },

  description: {
    height: 120,
    textAlignVertical: 'top',
  },

  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});