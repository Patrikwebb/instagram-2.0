import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '@/constants/theme';
import { MoveHorizontal as MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';

type PostProps = {
  username: string;
  avatar: string;
  location?: string;
  image: string;
  caption: string;
  likes: number;
  timestamp: string;
  isVerified?: boolean;
  hasBeenLiked?: boolean;
  hasBeenSaved?: boolean;
};

export const Post = ({ 
  username, 
  avatar, 
  location, 
  image, 
  caption, 
  likes, 
  timestamp,
  isVerified = false,
  hasBeenLiked = false,
  hasBeenSaved = false,
}: PostProps) => {
  const [liked, setLiked] = useState(hasBeenLiked);
  const [saved, setSaved] = useState(hasBeenSaved);
  const [likeCount, setLikeCount] = useState(likes);
  
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => !liked ? prev + 1 : prev - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.headerInfo}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{username}</Text>
              {isVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            {location && <Text style={styles.location}>{location}</Text>}
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={handleLike}
        delayLongPress={300}
        style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        <View style={styles.actionsLeft}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Heart 
              size={24} 
              color={liked ? theme.colors.interaction.like : theme.colors.text.primary}
              fill={liked ? theme.colors.interaction.like : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color={theme.colors.interaction.comment} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Send size={24} color={theme.colors.interaction.share} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setSaved(!saved)}>
          <Bookmark 
            size={24} 
            color={theme.colors.interaction.bookmark} 
            fill={saved ? theme.colors.interaction.bookmark : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.likes}>{likeCount.toLocaleString()} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>
            <Text style={styles.username}>{username}</Text> {caption}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewComments}>View all comments</Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>{timestamp} ago</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.primary,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
  },
  headerInfo: {
    marginLeft: theme.spacing.sm,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.primary,
  },
  verifiedBadge: {
    backgroundColor: theme.colors.brand.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  verifiedText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  location: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
  },
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').width,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  actionsLeft: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: theme.spacing.md,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  likes: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.xs,
    color: theme.colors.text.primary,
  },
  captionContainer: {
    marginBottom: theme.spacing.xs,
  },
  caption: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.primary,
    lineHeight: 18,
  },
  viewComments: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  timestamp: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
  },
});