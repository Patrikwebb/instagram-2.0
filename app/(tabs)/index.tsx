import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  RefreshControl
} from 'react-native';
import { theme } from '@/constants/theme';
import { Story } from '@/components/Story';
import { Post } from '@/components/Post';
import { POSTS, STORIES, USERS } from '@/data/mockData';
import { Camera, Heart, SendHorizontal as SendHorizonal } from 'lucide-react-native';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you would fetch new data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderStory = ({ item }) => (
    <Story 
      avatar={item.user.avatar} 
      username={item.user.username} 
      seen={item.seen} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png' }} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Heart size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <SendHorizonal size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.storiesContainer}>
          <FlatList
            data={[{ id: 'user-story', user: USERS[0], seen: false, isUser: true }, ...STORIES]}
            renderItem={({ item, index }) => 
              index === 0 ? (
                <View style={styles.yourStory}>
                  <Story 
                    avatar={item.user.avatar} 
                    username="Your story" 
                    seen={false} 
                    isUser
                  />
                  <TouchableOpacity style={styles.addStoryButton}>
                    <View style={styles.addIconContainer}>
                      <Text style={styles.addIcon}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : renderStory({ item })
            }
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesList}
          />
        </View>

        <View style={styles.postsContainer}>
          {POSTS.map((post) => (
            <Post
              key={post.id}
              username={post.user.username}
              avatar={post.user.avatar}
              image={post.image}
              caption={post.caption}
              likes={post.likes}
              timestamp={post.timestamp}
              isVerified={post.user.isVerified}
              hasBeenLiked={post.hasBeenLiked}
              hasBeenSaved={post.hasBeenSaved}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  logo: {
    height: 30,
    width: 104,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: theme.spacing.md,
  },
  storiesContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
  },
  storiesList: {
    paddingHorizontal: theme.spacing.md,
  },
  yourStory: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 18,
    right: 0,
    zIndex: 1,
  },
  addIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.button.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background.primary,
  },
  addIcon: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: -2,
  },
  postsContainer: {
    flex: 1,
  },
});