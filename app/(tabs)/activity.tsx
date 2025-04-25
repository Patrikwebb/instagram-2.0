import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  RefreshControl,
} from 'react-native';
import { theme } from '@/constants/theme';
import { NotificationItem } from '@/components/NotificationItem';
import { NOTIFICATIONS } from '@/data/mockData';

export default function ActivityScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you would fetch new data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.todaySection}>
          <Text style={styles.sectionTitle}>Today</Text>
          {NOTIFICATIONS.slice(0, 3).map((notification) => (
            <NotificationItem
              key={notification.id}
              type={notification.type}
              avatar={notification.user.avatar}
              username={notification.user.username}
              content={notification.content}
              timestamp={notification.timestamp}
              postImage={notification.postImage}
            />
          ))}
        </View>

        <View style={styles.earlierSection}>
          <Text style={styles.sectionTitle}>Earlier</Text>
          {NOTIFICATIONS.slice(3).map((notification) => (
            <NotificationItem
              key={notification.id}
              type={notification.type}
              avatar={notification.user.avatar}
              username={notification.user.username}
              content={notification.content}
              timestamp={notification.timestamp}
              postImage={notification.postImage}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  todaySection: {
    marginBottom: theme.spacing.md,
  },
  earlierSection: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
});