import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

type NotificationItemProps = {
  type: 'like' | 'comment' | 'follow' | 'mention';
  avatar: string;
  username: string;
  content: string;
  timestamp: string;
  postImage?: string;
};

export const NotificationItem = ({
  type,
  avatar,
  username,
  content,
  timestamp,
  postImage,
}: NotificationItemProps) => {
  const renderButton = () => {
    if (type === 'follow') {
      return (
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        
        <View style={styles.textContent}>
          <Text style={styles.notificationText}>
            <Text style={styles.username}>{username}</Text> {content}
          </Text>
          <Text style={styles.timestamp}>{timestamp} ago</Text>
        </View>
      </View>
      
      <View style={styles.rightContent}>
        {renderButton()}
        {postImage && (
          <TouchableOpacity>
            <Image source={{ uri: postImage }} style={styles.postImage} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.primary,
    lineHeight: 18,
  },
  username: {
    fontFamily: theme.fontFamily.semiBold,
  },
  timestamp: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton: {
    backgroundColor: theme.colors.button.primary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  followButtonText: {
    color: 'white',
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.semiBold,
  },
  postImage: {
    width: 44,
    height: 44,
    borderRadius: 4,
  },
});