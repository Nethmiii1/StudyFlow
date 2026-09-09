# StudyFlow 📚

## Target Domain

Education and Student Productivity

## Mobile Application Name

StudyFlow

## Problem Statement

Computer Science students need to manage and access information about multiple subjects during their studies. Finding subject information quickly can be difficult when information is scattered across different places.

StudyFlow provides a simple mobile application where students can view, search, create, update, and manage information about their academic subjects in one place.

## How StudyFlow Solves the Problem

StudyFlow provides students with an easy-to-use mobile interface for managing their academic subject information.

The application allows users to:

* View a list of Computer Science subjects
* Search for subjects by name
* View detailed information about each subject
* Add new subjects
* Edit existing subjects
* Delete subjects
* Store subject data locally for offline access
* Access application settings
* Navigate between different screens easily

## Main Features

* Home screen with subject list
* Subject list using FlatList
* Subject search functionality
* Subject details screen
* Add new subjects
* Edit existing subjects
* Delete subjects
* REST API integration using MockAPI
* GET, POST, PUT and DELETE API operations
* Local data persistence using AsyncStorage
* Offline access to previously loaded subject data
* Loading indicator while retrieving data
* Empty-state handling
* Network and API error handling
* Settings screen with dark mode
* Navigation between multiple application screens
* State management using React Hooks
* Responsive mobile interface

## Technologies Used

* React Native
* Expo
* JavaScript
* React Navigation
* FlatList
* React Hooks
* MockAPI
* AsyncStorage

## REST API Integration

StudyFlow uses MockAPI as the backend REST API.

A `subjects` resource was created in MockAPI to store subject information. Each subject contains information such as:

* Subject name
* Subject code
* Description
* Automatically generated ID

The application uses JavaScript `fetch()` to communicate with the REST API.

### API Operations

* **GET** – Retrieves subjects from MockAPI and displays them in the application.
* **POST** – Creates a new subject through the Add Subject screen.
* **PUT** – Updates an existing subject through the Edit Subject screen.
* **DELETE** – Deletes an existing subject from the Home screen.

## Local Storage and Offline Support

StudyFlow uses AsyncStorage for local data persistence.

After successfully retrieving subjects from MockAPI, the application stores the subject data locally as JSON in AsyncStorage.

When the network is unavailable, the application attempts to retrieve the previously stored subject data from AsyncStorage. This allows previously loaded subjects to remain accessible even when the device is offline.

## Loading, Empty and Error Handling

The application provides appropriate feedback for different application states.

* An `ActivityIndicator` is displayed while subject data is being loaded.
* An empty-state message is displayed when no subjects match the search criteria.
* API and network errors are handled using `try/catch`.
* When the API cannot be reached, locally stored subject data is used where available.

These features improve the reliability and usability of the application.

## Application Architecture

StudyFlow is a React Native mobile application developed using Expo. The application follows a component-oriented architecture where different screens are responsible for specific functions.

The main screens include:

* Home
* Subject Details
* Add Subject
* Edit Subject
* Settings

React Navigation is used to navigate between screens.

React Hooks such as `useState`, `useEffect`, `useFocusEffect`, and `useCallback` are used for state management and controlling data loading.

The Home screen retrieves subjects from MockAPI and displays them using `FlatList`. The Add Subject screen handles POST requests, while the Edit Subject screen handles PUT requests. DELETE functionality is available from the Home screen.

## Application Screens

### Home Screen

The Home screen displays the subjects retrieved from MockAPI and provides a search function. Users can also add, edit, and delete subjects.

### Add New Subject Screen

The Add New Subject screen provides a form for creating a new subject. The entered information is submitted to MockAPI using a POST request.

### Edit Subject Screen

The Edit Subject screen allows users to modify an existing subject. The updated information is sent to MockAPI using a PUT request.

### Subject Details Screen

The Subject Details screen displays detailed information about a selected subject.

### Settings Screen

The Settings screen provides application settings, including the dark mode option.

## Screenshots

The following screenshots demonstrate the completed Sprint 2 version of StudyFlow.

### Home Screen

![StudyFlow Home Screen](https://github.com/user-attachments/assets/24f971df-d7fb-48ec-a060-4f3214944adc)

### Add New Subject

![StudyFlow Add New Subject](https://github.com/user-attachments/assets/a6ff799e-8eb4-4dfb-a3b1-7a9e868d5da1)

### Edit Subject

![StudyFlow Edit Subject](https://github.com/user-attachments/assets/196bd083-a059-4d65-ac51-6ae161521507)

### Subject Details

![StudyFlow Subject Details](https://github.com/user-attachments/assets/cacca6d4-ae2a-4c3a-9966-cb42acb952d9)

## Challenges and Implementation Decisions

One challenge encountered during development was ensuring that the subject list was updated after a subject had been added or edited. `useFocusEffect` was used so that the Home screen could reload the most recent API data whenever the screen became active.

Another challenge was testing the application in Expo Web and resolving runtime errors encountered during development.

A simple component-based architecture was selected to keep the application organised and maintainable. React Hooks were used for state and lifecycle management without requiring an additional external state-management library.

MockAPI was selected as the REST API backend because it provides a simple environment for demonstrating REST API operations. AsyncStorage was selected for local persistence because it is suitable for storing simple application data locally in a React Native application.

## APK Build and Deployment

The StudyFlow application was successfully built as an Android APK using Expo Application Services (EAS).

The APK build was completed successfully and the generated APK was downloaded for installation, testing, and submission.

## How to Run the Application

### Prerequisites

* Node.js
* Expo
* VS Code

### Installation

1. Clone the StudyFlow repository.
2. Open the project folder in VS Code.
3. Install the required dependencies:

```bash
npm install
```

4. Start the Expo development server:

```bash
npx expo start
```

5. Open the application using an Android emulator, Expo Go, or a compatible device.

## Project Repository

GitHub repository:

https://github.com/Nethmiii1/StudyFlow

## Sprint 2 Deliverables

The Sprint 2 application includes:

* Feature-complete React Native application
* MockAPI REST API integration
* GET, POST, PUT and DELETE operations
* AsyncStorage local persistence
* Offline data access
* Loading, empty, and error-state handling
* Android APK built using Expo EAS
* GitHub source-code repository
* Technical summary
