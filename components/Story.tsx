import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

type StoryProps = {
  avatar: string;
  username: string;
  seen: boolean;
  isUser?: boolean;
};

export const Story = ({ avatar, username, seen, isUser = false }: StoryProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {!seen ? (
          <LinearGradient
            colors={theme.colors.brand.instagram.slice(0, 5)}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.storyRing}>
            <View style={styles.storyInnerRing}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.storyRingSeen}>
            <View style={styles.storyInnerRing}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
            </View>
          </View>
        )}
        <Text 
          style={[
            styles.username, 
            { fontFamily: isUser ? theme.fontFamily.semiBold : theme.fontFamily.regular }
          ]}
          numberOfLines={1}>
          {isUser ? 'Your story' : username}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    width: 80,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyRingSeen: {
    width: 68,
    height: 68,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyInnerRing: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.full,
    borderWidth: 3,
    borderColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: theme.borderRadius.full,
  },
  username: {
    fontSize: theme.fontSize.xs,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
});