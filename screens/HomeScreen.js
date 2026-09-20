import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const defaultSubjects = [
  {
    id: '1',
    name: 'Database Management Systems',
    code: 'CSI1208',
    description:
      'Learn about databases, SQL, tables, relationships and data management.',
  },
  {
    id: '2',
    name: 'Mobile Application Development',
    code: 'CSI2114',
    description:
      'Learn how to develop mobile applications using React Native.',
  },
  {
    id: '3',
    name: 'Software Engineering',
    code: 'CSI2105',
    description:
      'Study software development processes, methodologies and best practices.',
  },
  {
    id: '4',
    name: 'Computer Networks',
    code: 'CSI2106',
    description:
      'Learn about networking concepts, protocols and network communication.',
  },
  {
    id: '5',
    name: 'Web Application Development',
    code: 'CSI2107',
    description:
      'Learn how to design and develop modern web applications.',
  },
  {
    id: '6',
    name: 'Object Oriented Programming',
    code: 'CSI2108',
    description:
      'Learn object-oriented programming concepts such as classes, objects, inheritance and polymorphism.',
  },
  {
    id: '7',
    name: 'Data Structures and Algorithms',
    code: 'CSI2109',
    description:
      'Learn about data structures, algorithms, searching, sorting and problem solving.',
  },
  {
    id: '8',
    name: 'Operating Systems',
    code: 'CSI2110',
    description:
      'Learn about operating system concepts, processes, memory management and file systems.',
  },
  {
    id: '9',
    name: 'Computer Security',
    code: 'CSI2111',
    description:
      'Learn about cybersecurity, threats, vulnerabilities and security techniques.',
  },
  {
    id: '10',
    name: 'Cloud Computing',
    code: 'CSI2112',
    description:
      'Learn about cloud services, virtualization, deployment and cloud infrastructure.',
  },
];

const cardColors = [
  '#E8E0FF',
  '#DDF4FF',
  '#FFE4EC',
  '#E1F7E7',
  '#FFF0D9',
  '#E5E7FF',
  '#DDF8F3',
  '#FFE1D6',
  '#E9E1FF',
  '#E1F0FF',
];

export default function HomeScreen({ navigation }) {
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [searchText, setSearchText] = useState('');

  const deleteSubject = (id, name) => {
    Alert.alert(
      'Delete Subject',
      `Are you sure you want to delete "${name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSubjects((currentSubjects) =>
              currentSubjects.filter(
                (subject) => subject.id !== id
              )
            );
          },
        },
      ]
    );
  };

  const filteredSubjects = subjects.filter((subject) => {
    const search = searchText.toLowerCase();

    return (
      subject.name.toLowerCase().includes(search) ||
      subject.code.toLowerCase().includes(search) ||
      subject.description.toLowerCase().includes(search)
    );
  });

  const renderSubject = ({ item, index }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            cardColors[index % cardColors.length],
        },
      ]}
    >
      <View style={styles.cardTopRow}>
        <View style={styles.subjectIcon}>
          <Text style={styles.iconText}>📚</Text>
        </View>

        <Text style={styles.subjectNumber}>
          #{index + 1}
        </Text>
      </View>

      <Text style={styles.subjectName}>
        {item.name}
      </Text>

      <View style={styles.codeBadge}>
        <Text style={styles.codeText}>
          {item.code}
        </Text>
      </View>

      <Text style={styles.description}>
        {item.description}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditSubject', {
              subject: item,
            })
          }
        >
          <Text style={styles.editText}>
            ✏️ Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            deleteSubject(item.id, item.name)
          }
        >
          <Text style={styles.deleteText}>
            🗑 Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.smallHeader}>
            ✨ WELCOME TO
          </Text>

          <Text style={styles.title}>
            StudyFlow
          </Text>

          <Text style={styles.subtitle}>
            Organize your learning. Stay productive.
          </Text>
        </View>

        <View style={styles.headerEmoji}>
          <Text style={styles.bigEmoji}>🎓</Text>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search your subjects..."
          placeholderTextColor="#888899"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* SECTION HEADER */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            📚 My Subjects
          </Text>

          <Text style={styles.sectionSubtitle}>
            {filteredSubjects.length} subjects available
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddSubject')
          }
        >
          <Text style={styles.addButtonText}>
            + Add Subject
          </Text>
        </TouchableOpacity>
      </View>

      {/* SUBJECT LIST */}
      <FlatList
        data={filteredSubjects}
        keyExtractor={(item) => item.id}
        renderItem={renderSubject}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔎</Text>

            <Text style={styles.emptyTitle}>
              No subjects found
            </Text>

            <Text style={styles.emptyText}>
              Try searching for another subject.
            </Text>
          </View>
        }
      />

      {/* SETTINGS */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() =>
          navigation.navigate('Settings')
        }
      >
        <Text style={styles.settingsText}>
          ⚙️ Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FC',
    padding: 20,
  },

  header: {
    backgroundColor: '#7C4DFF',
    borderRadius: 22,
    padding: 25,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerContent: {
    flex: 1,
  },

  smallHeader: {
    color: '#EDE7FF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#F0ECFF',
    fontSize: 14,
    marginTop: 5,
  },

  headerEmoji: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

  bigEmoji: {
    fontSize: 38,
  },

  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E1F5',
  },

  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#252333',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#888899',
    marginTop: 3,
  },

  addButton: {
    backgroundColor: '#FF4F9A',
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  list: {
    paddingBottom: 100,
  },

  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  subjectIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    fontSize: 22,
  },

  subjectNumber: {
    color: '#777777',
    fontWeight: 'bold',
    fontSize: 13,
  },

  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252333',
    marginBottom: 8,
  },

  codeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
  },

  codeText: {
    color: '#6842D8',
    fontWeight: 'bold',
    fontSize: 12,
  },

  description: {
    color: '#555565',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 17,
  },

  buttonRow: {
    flexDirection: 'row',
  },

  editButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 11,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
  },

  editText: {
    color: '#6842D8',
    fontWeight: 'bold',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#FF5C6C',
    padding: 11,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
  },

  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  empty: {
    alignItems: 'center',
    marginTop: 60,
  },

  emptyEmoji: {
    fontSize: 45,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },

  emptyText: {
    marginTop: 5,
    color: '#888888',
  },

  settingsButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#29263D',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  settingsText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});