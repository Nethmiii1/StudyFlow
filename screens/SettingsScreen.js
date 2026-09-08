import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

export default function SettingsScreen({
  isDarkMode,
  setIsDarkMode,
  theme,
}) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: theme.text },
        ]}
      >
        Settings
      </Text>

      <View
        style={[
          styles.settingRow,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.settingTitle,
              { color: theme.text },
            ]}
          >
            Dark Mode
          </Text>

          <Text
            style={[
              styles.settingDescription,
              { color: theme.secondaryText },
            ]}
          >
            Change the appearance of StudyFlow.
          </Text>
        </View>

        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
  },

  textContainer: {
    flex: 1,
    marginRight: 15,
  },

  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});