
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const API_URL =
  'https://6a9edaa82f89be7fb70ea912.mockapi.io/api/subjects';

const STORAGE_KEY = '@studyflow_subjects';

const defaultSubjects = [
  {
    id: 'local-1',
    name: 'Database Management Systems',
    code: 'CSI1208',
    description:
      'Learn about databases, SQL, tables, relationships and data management.',
  },
  {
    id: 'local-2',
    name: 'Mobile Application Development',
    code: 'CSI2114',
    description:
      'Learn how to develop mobile applications using React Native.',
  },
  {
    id: 'local-3',
    name: 'Software Engineering',
    code: 'CSI2105',
    description:
      'Study software development processes, methodologies and best practices.',
  },
  {
    id: 'local-4',
    name: 'Computer Networks',
    code: 'CSI2106',
    description:
      'Learn about networking concepts, protocols and network communication.',
  },
  {
    id: 'local-5',
    name: 'Web Application Development',
    code: 'CSI2107',
    description:
      'Learn how to design and develop modern web applications.',
  },
  {
    id: 'local-6',
    name: 'Object Oriented Programming',
    code: 'CSI2108',
    description:
      'Learn object-oriented programming concepts such as classes, objects and inheritance.',
  },
  {
    id: 'local-7',
    name: 'Data Structures and Algorithms',
    code: 'CSI2109',
    description:
      'Learn important data structures and algorithms used in software development.',
  },
  {
    id: 'local-8',
    name: 'Operating Systems',
    code: 'CSI2110',
    description:
      'Learn about operating systems, processes, memory and file management.',
  },
  {
    id: 'local-9',
    name: 'Computer Security',
    code: 'CSI2111',
    description:
      'Learn the fundamentals of cybersecurity, threats and security protection.',
  },
  {
    id: 'local-10',
    name: 'Cloud Computing',
    code: 'CSI2112',
    description:
      'Learn about cloud services, virtualization and cloud-based applications.',
  },
];

export default function HomeScreen({ navigation, theme }) {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // -----------------------------------------
  // SAVE LOCALLY
  // -----------------------------------------
  const saveSubjects = async (data) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
      console.log('Subjects saved locally');
    } catch (error) {
      console.log('SAVE ERROR:', error);
    }
  };

  // -----------------------------------------
  // LOAD LOCAL DATA
  // -----------------------------------------
  const loadLocalSubjects = async () => {
    try {
      const stored =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      return null;
    } catch (error) {
      console.log('LOCAL LOAD ERROR:', error);
      return null;
    }
  };

  // -----------------------------------------
  // LOAD SUBJECTS
  // -----------------------------------------
  const loadSubjects = async () => {
    setLoading(true);

    try {
      // First use local data
      const localData = await loadLocalSubjects();

      if (localData && localData.length > 0) {
        setSubjects(localData);
        setLoading(false);
        return;
      }

      // No local data → try API
      console.log('Loading subjects from API...');

      try {
        const response = await fetch(API_URL);

        if (response.ok) {
          const apiData = await response.json();

          if (
            Array.isArray(apiData) &&
            apiData.length > 0
          ) {
            setSubjects(apiData);
            await saveSubjects(apiData);
            setLoading(false);
            return;
          }
        }
      } catch (apiError) {
        console.log('API unavailable');
      }

      // API unavailable → default data
      setSubjects(defaultSubjects);
      await saveSubjects(defaultSubjects);
    } catch (error) {
      console.log('LOAD ERROR:', error);

      setSubjects(defaultSubjects);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSubjects();
    }, [])
  );

  // -----------------------------------------
  // DELETE
  // -----------------------------------------
  const handleDelete = async (id) => {
    const updatedSubjects = subjects.filter(
      (subject) =>
        String(subject.id) !== String(id)
    );

    setSubjects(updatedSubjects);
    await saveSubjects(updatedSubjects);

    setMessage('Subject deleted');

    setTimeout(() => {
      setMessage('');
    }, 2000);

    // Try API delete if internet is available
    if (!String(id).startsWith('local-')) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.log(
          'API delete skipped - offline'
        );
      }
    }
  };

  // -----------------------------------------
  // SEARCH
  // -----------------------------------------
  const filteredSubjects = subjects.filter(
    (subject) => {
      const text = search.toLowerCase();

      return (
        String(subject.name || '')
          .toLowerCase()
          .includes(text) ||
        String(subject.code || '')
          .toLowerCase()
          .includes(text)
      );
    }
  );

  // -----------------------------------------
  // CARD
  // -----------------------------------------
  const renderSubject = ({ item, index }) => {
    const colors = [
      '#E8F4FF',
      '#F3E8FF',
      '#E8FFF3',
      '#FFF4E5',
      '#FFE8EF',
    ];

    return (
      <View
        style={[
          styles.subjectCard,
          {
            backgroundColor:
              colors[index % colors.length],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.subjectMain}
          onPress={() =>
            navigation.navigate(
              'SubjectDetails',
              { subject: item }
            )
          }
        >
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>
              {index + 1}
            </Text>
          </View>

          <View style={styles.subjectInfo}>
            <Text style={styles.subjectName}>
              {item.name}
            </Text>

            <Text style={styles.subjectCode}>
              {item.code}
            </Text>

            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate(
                'EditSubject',
                { subject: item }
              )
            }
          >
            <Text style={styles.editText}>
              ✏️ Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              handleDelete(item.id)
            }
          >
            <Text style={styles.deleteText}>
              🗑 Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // -----------------------------------------
  // LOADING
  // -----------------------------------------
  if (loading) {
    return (
      <View
        style={[
          styles.loading,
          {
            backgroundColor:
              theme?.background || '#F2F8FF',
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color="#7B61FF"
        />

        <Text style={styles.loadingText}>
          Loading your subjects...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme?.background || '#F2F8FF',
        },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>
            ✨ WELCOME TO
          </Text>

          <Text style={styles.title}>
            StudyFlow
          </Text>

          <Text style={styles.subtitle}>
            Organize your learning. Stay productive.
          </Text>
        </View>

        <View style={styles.iconCircle}>
          <Text style={styles.icon}>
            🎓
          </Text>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>
          🔍
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search subjects..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* MESSAGE */}
      {message !== '' && (
        <View style={styles.messageBox}>
          <Text style={styles.message}>
            ✅ {message}
          </Text>
        </View>
      )}

      {/* SECTION */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            📚 My Subjects
          </Text>

          <Text style={styles.count}>
            {filteredSubjects.length} subjects available
          </Text>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() =>
            navigation.navigate('Settings')
          }
        >
          <Text style={styles.settingsText}>
            ⚙️
          </Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={filteredSubjects}
        keyExtractor={(item, index) =>
          String(item.id || index)
        }
        renderItem={renderSubject}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      />

      {/* ADD */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddSubject')
        }
      >
        <Text style={styles.addText}>
          ＋ Add New Subject
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
  },

  header: {
    backgroundColor: '#7B61FF',
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  welcome: {
    color: '#E9E4FF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },

  subtitle: {
    color: '#F0EDFF',
    fontSize: 13,
    marginTop: 5,
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 28,
  },

  searchBox: {
    height: 52,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },

  messageBox: {
    marginHorizontal: 18,
    marginTop: 10,
    backgroundColor: '#E8FFF1',
    padding: 10,
    borderRadius: 10,
  },

  message: {
    textAlign: 'center',
    color: '#147A3C',
    fontWeight: '700',
  },

  sectionHeader: {
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#263238',
  },

  count: {
    color: '#777',
    fontSize: 13,
    marginTop: 3,
  },

  settingsButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingsText: {
    fontSize: 21,
  },

  subjectCard: {
    marginHorizontal: 18,
    marginBottom: 13,
    borderRadius: 18,
    padding: 15,
  },

  subjectMain: {
    flexDirection: 'row',
  },

  numberCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  numberText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  subjectInfo: {
    flex: 1,
  },

  subjectName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#263238',
  },

  subjectCode: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7B61FF',
    marginTop: 3,
  },

  description: {
    fontSize: 12,
    color: '#68737A',
    marginTop: 6,
    lineHeight: 18,
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 14,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#BCAEFF',
  },

  editText: {
    color: '#6A50E8',
    fontWeight: '700',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#FFEDED',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#FFBABA',
  },

  deleteText: {
    color: '#D64545',
    fontWeight: '700',
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 18,
    right: 18,
    backgroundColor: '#7B61FF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },

  addText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

