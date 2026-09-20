# 📚 StudyFlow

## Mobile Application for Student Productivity

StudyFlow is a mobile application developed using **React Native and Expo** to help Computer Science students manage and organize their academic subjects in one place.

The application allows students to view, search, add, edit, delete, and manage subject information. It also uses a REST API and local storage to provide data persistence.

---

## 🎯 Project Overview

### Target Domain

**Education and Student Productivity**

### Application Name

**StudyFlow**

### Problem Statement

Computer Science students need to manage and access information about multiple subjects during their studies. Finding and managing subject information can become difficult when information is stored in different places.

StudyFlow provides a simple mobile application where students can manage their academic subject information in one place.

---

## ✨ Main Features

* 🏠 Home screen with subject list
* 🔍 Search subjects by name or subject code
* 📖 View detailed subject information
* ➕ Add new subjects
* ✏️ Edit existing subjects
* 🗑️ Delete subjects
* 🌐 REST API integration
* 💾 Local data persistence using AsyncStorage
* 📡 Offline data access
* 🌙 Light and Dark mode
* 🔄 Automatic data refresh
* ⏳ Loading indicator
* ⚠️ Empty-state handling
* ❌ API and network error handling
* 📱 Android application build

---

## 🛠️ Technologies Used

| Technology       | Purpose                           |
| ---------------- | --------------------------------- |
| React Native     | Mobile application development    |
| Expo             | Development and application build |
| JavaScript       | Programming language              |
| React Navigation | Navigation between screens        |
| React Hooks      | State and application management  |
| FlatList         | Displaying subject lists          |
| MockAPI          | REST API backend                  |
| AsyncStorage     | Local data persistence            |
| Git & GitHub     | Source code management            |

---

# 🌐 REST API Integration

StudyFlow uses **MockAPI** as its REST API backend.

### API Endpoint

```text
https://6a9edaa82f89be7fb70ea912.mockapi.io/api/subjects
```

The application communicates with the API using JavaScript `fetch()` requests.

### API Operations

| HTTP Method | Function                   |
| ----------- | -------------------------- |
| GET         | Retrieve subjects          |
| POST        | Create a new subject       |
| PUT / PATCH | Update an existing subject |
| DELETE      | Delete a subject           |

Each subject contains information such as:

* Subject name
* Subject code
* Description
* Automatically generated ID

---

# 💾 Local Storage and Offline Support

StudyFlow uses **AsyncStorage** to store subject information locally on the device.

After successfully retrieving data from the API, subject information can be stored locally.

This allows previously saved subject data to remain available even when the network connection is unavailable.

### Offline Flow

```text
API Available
     ↓
Retrieve Subject Data
     ↓
Save Data to AsyncStorage
     ↓
Display Subjects
```

If the API or network is unavailable:

```text
API Unavailable
     ↓
Load Previously Saved Data
     ↓
AsyncStorage
     ↓
Display Subjects
```

This improves the reliability and usability of the application.

---

# 📱 Application Screens

## 🏠 Home Screen

The Home screen displays the available Computer Science subjects.

Users can:

* View subjects
* Search subjects
* Open subject details
* Edit subjects
* Delete subjects
* Add new subjects

### Screenshot

<img width="1917" height="1078" alt="Screenshot 2026-09-20 233135" src="https://github.com/user-attachments/assets/f80a535f-336f-4862-a206-9d1160b853dc" />

---

## ➕ Add Subject Screen

The Add Subject screen allows users to create a new subject.

Users can enter:

* Subject name
* Subject code
* Description

The information is stored locally and submitted to the REST API.

### Screenshot

<img width="1917" height="1020" alt="Screenshot 2026-09-20 233203" src="https://github.com/user-attachments/assets/322f3f5d-932f-4a6f-8811-a412c7cd05a9" />

---

## ✏️ Edit Subject Screen

The Edit Subject screen allows users to modify information about an existing subject.

The updated information is sent to the REST API and stored locally.

### Screenshot

<img width="1917" height="1078" alt="Screenshot 2026-09-20 233224" src="https://github.com/user-attachments/assets/17548302-b2e4-4f64-a3f0-c4951718abe7" />

---

## 📖 Subject Details Screen

The Subject Details screen displays detailed information about the selected subject.

### Screenshot

<img width="1917" height="1078" alt="Screenshot 2026-09-20 233250" src="https://github.com/user-attachments/assets/b3366a9c-9e69-433d-9db7-07a457f4d6ab" />

---

## ⚙️ Settings Screen

The Settings screen provides application settings, including the **Light Mode and Dark Mode** option.

### Screenshot

<img width="1917" height="1078" alt="Screenshot 2026-09-20 233306" src="https://github.com/user-attachments/assets/686d3c67-4e6c-4184-a76f-e06b47c12b5d" />

---

# 🧭 Application Navigation

StudyFlow contains the following main screens:

```text
                    StudyFlow
                        |
        ┌───────────────┼───────────────┐
        |               |               |
       Home          Settings      Other Screens
        |                               |
        ├── Subject Details             |
        ├── Add Subject                 |
        └── Edit Subject               |
```

React Navigation is used to move between the different screens.

---

# ⚛️ React Native Concepts Used

## useState

`useState` is used to manage changing application data such as:

* Subject lists
* Search text
* Form inputs
* Loading states
* Dark mode

Example:

```javascript
const [subjects, setSubjects] = useState([]);
```

---

## FlatList

`FlatList` is used to efficiently display the list of subjects.

```javascript
<FlatList
  data={filteredSubjects}
  renderItem={...}
/>
```

---

## useFocusEffect

`useFocusEffect` is used to reload subject information when the Home screen becomes active again.

This helps the Home screen display updated information after adding or editing a subject.

---

# 🔄 CRUD Operations

StudyFlow demonstrates CRUD operations.

| CRUD   | StudyFlow Feature |
| ------ | ----------------- |
| Create | Add Subject       |
| Read   | View Subjects     |
| Update | Edit Subject      |
| Delete | Delete Subject    |

---

# ⚠️ Error and State Handling

The application handles different states during operation.

### Loading State

A loading indicator is displayed while subject data is being retrieved.

### Empty State

A message is displayed when no subjects match the search criteria.

### Network/API Errors

The application handles API or network errors and can use locally stored subject data when available.

---

# 🎨 User Interface

The application uses a simple and colorful interface designed to make subject management easier.

The application also supports:

* Light mode
* Dark mode
* Search
* Buttons for common actions
* Loading feedback
* User-friendly messages

---

# 📂 Project Structure

```text
StudyFlow/
│
├── screens/
│   ├── HomeScreen.js
│   ├── SubjectDetailsScreen.js
│   ├── AddSubjectScreen.js
│   ├── EditSubjectScreen.js
│   └── SettingsScreen.js
│
├── App.js
├── package.json
├── README.md
└── screenshots/
```

---

# 🚀 How to Run the Application

## 1. Clone the repository

```bash
git clone https://github.com/Nethmiii1/StudyFlow.git
```

## 2. Open the project

```bash
cd StudyFlow
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start Expo

```bash
npx expo start
```

## 5. Run on Web

```bash
npx expo start --web
```

The application can also be tested using an Android device or emulator through Expo.

---

# 📦 Android Build

The application was also built as an Android APK using Expo Application Services (EAS).

Example build command:

```bash
npx eas build -p android --profile preview
```

The generated APK can be installed on an Android device for testing.

---

# 🧪 Testing

The main application functions were tested during development:

* Subject list loading
* Search
* Add Subject
* Edit Subject
* Delete Subject
* Subject Details
* REST API communication
* Local storage
* Offline data access
* Light/Dark mode
* Navigation between screens

---

# 🧠 Challenges and Solutions

### API and Local Storage

One challenge was keeping the application usable when API data was unavailable.

**Solution:** AsyncStorage was implemented to store subject information locally.

### Updating the Home Screen

After adding or editing a subject, the Home screen needed to display the latest information.

**Solution:** `useFocusEffect` was used to reload the subject data when the Home screen becomes active.

### API Errors

Network and API errors can occur during development.

**Solution:** Error handling and locally stored data were implemented to improve application reliability.

---

# 🎓 Sprint 2 Deliverables

The Sprint 2 implementation includes:

* React Native mobile application
* MockAPI REST API integration
* GET, POST, UPDATE and DELETE operations
* AsyncStorage local persistence
* Offline data access
* Add Subject
* Edit Subject
* Delete Subject
* Search functionality
* Subject Details
* Settings and Dark Mode
* Loading and error handling
* Android APK build
* GitHub source-code repository

---

# 👩‍💻 Developer

**Nethmi Perera**

Computer Science Student
**ACBT**

---

# 🔗 GitHub Repository

[StudyFlow GitHub Repository](https://github.com/Nethmiii1/StudyFlow)

---

## 📌 Project Summary

StudyFlow demonstrates the development of a React Native mobile application with **REST API integration, local data persistence, navigation, state management, CRUD operations, search functionality, and offline support**.

The project was developed as part of the **Mobile Application Development** module.
