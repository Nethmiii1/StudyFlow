import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const API_URL =
  'https://6a9edaa82f89be7fb70ea912.mockapi.io/api/subjects';

export default function HomeScreen({ navigation, theme }) {
  const [subjects, setSubjects] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadSubjects = async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to load');
      }

      const data = await response.json();

      setSubjects(data);

      await AsyncStorage.setItem(
        'studyflow_subjects',
        JSON.stringify(data)
      );

      setMessage('');
    } catch (error) {
      const saved = await AsyncStorage.getItem(
        'studyflow_subjects'
      );

      if (saved) {
        setSubjects(JSON.parse(saved));
        setMessage('Showing saved data.');
      } else {
        setMessage('Unable to load subjects.');
      }
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadSubjects();
    }, [])
  );

  const deleteSubject = async (id) => {
    console.log('DELETE BUTTON PRESSED');
    console.log('Subject ID:', id);

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: 'DELETE',
        }
      );

      console.log('DELETE RESPONSE:', response.status);

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      const newSubjects = subjects.filter(
        (subject) =>
          String(subject.id) !== String(id)
      );

      setSubjects(newSubjects);

      await AsyncStorage.setItem(
        'studyflow_subjects',
        JSON.stringify(newSubjects)
      );

      setMessage('Subject deleted successfully!');
    } catch (error) {
      console.log('DELETE ERROR:', error);
      setMessage('Could not delete subject.');
    }
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading subjects...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Text
        style={[
          styles.heading,
          {
            color: theme.text,
          },
        ]}
      >
        My Subjects
      </Text>

      <TextInput
        style={[
          styles.search,
          {
            backgroundColor: theme.input,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        placeholder="Search subjects..."
        placeholderTextColor={theme.secondaryText}
        value={searchText}
        onChangeText={setSearchText}
      />

      {message !== '' && (
        <Text style={styles.message}>
          {message}
        </Text>
      )}

      <Pressable
        style={[
          styles.addButton,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={() =>
          navigation.navigate('AddSubject')
        }
      >
        <Text style={styles.addText}>
          + Add Subject
        </Text>
      </Pressable>

      <FlatList
        data={filteredSubjects}
        keyExtractor={(item) =>
          String(item.id)
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Pressable
              style={styles.subjectArea}
              onPress={() =>
                navigation.navigate(
                  'SubjectDetails',
                  {
                    subject: item,
                  }
                )
              }
            >
              <Text
                style={[
                  styles.name,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.name}
              </Text>

              <Text
                style={[
                  styles.code,
                  {
                    color: theme.primary,
                  },
                ]}
              >
                {item.code}
              </Text>

              <Text
                style={[
                  styles.description,
                  {
                    color: theme.secondaryText,
                  },
                ]}
              >
                {item.description}
              </Text>
            </Pressable>

            <View style={styles.buttons}>
              <Pressable
                style={[
                  styles.editButton,
                  {
                    backgroundColor:
                      theme.secondary,
                  },
                ]}
                onPress={() =>
                  navigation.navigate(
                    'EditSubject',
                    {
                      subject: item,
                    }
                  )
                }
              >
                <Text
                  style={[
                    styles.editText,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  Edit
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  deleteSubject(item.id)
                }
              >
                <Text style={styles.deleteText}>
                  DELETE
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text
            style={[
              styles.empty,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            No subjects found.
          </Text>
        }
      />

      <Pressable
        style={styles.settingsButton}
        onPress={() =>
          navigation.navigate('Settings')
        }
      >
        <Text
          style={[
            styles.settings,
            {
              color: theme.primary,
            },
          ]}
        >
          Open Settings
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  search: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },

  message: {
    marginBottom: 10,
    fontWeight: '600',
  },

  addButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  addText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },

  subjectArea: {
    width: '100%',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  code: {
    marginTop: 5,
    fontWeight: 'bold',
  },

  description: {
    marginTop: 8,
    lineHeight: 20,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 15,
  },

  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },

  editText: {
    fontWeight: 'bold',
  },

  deleteButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#E74C3C',
  },

  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
  },

  settingsButton: {
    paddingVertical: 5,
  },

  settings: {
    textAlign: 'center',
    padding: 15,
    fontWeight: 'bold',
  },
});