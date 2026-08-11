import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>
            Study Reminders
          </Text>

          <Text style={styles.settingDescription}>
            Enable reminders to help you remember your study sessions.
          </Text>
        </View>

        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <Text style={styles.status}>
        Reminders are{' '}
        {notificationsEnabled ? 'enabled' : 'disabled'}.
      </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  settingRow: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },

  textContainer: {
    flex: 1,
    paddingRight: 15,
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

  status: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '600',
  },
});