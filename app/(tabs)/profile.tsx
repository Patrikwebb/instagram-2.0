import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { ProfileHeader } from '@/components/ProfileHeader';
import { USERS, POSTS } from '@/data/mockData';
import { Grid2x2 as Grid, Film, Bookmark, User as UserTag, LogIn, LogOut } from 'lucide-react-native';
import { authMethods, supabase } from '@/lib/supabase/auth';

type TabType = 'posts' | 'reels' | 'saved' | 'tagged';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check current user on mount
    const checkUser = async () => {
      try {
        const currentUser = await authMethods.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      await authMethods.signOut();
      setUser(null);
      Alert.alert('Logged Out', 'You have been successfully logged out.');
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsGrid />;
      case 'reels':
        return <EmptyState text="No Reels Yet" />;
      case 'saved':
        return <EmptyState text="No Saved Posts" />;
      case 'tagged':
        return <EmptyState text="No Tagged Posts" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerUsername}>
          {user ? user.email : 'Profile'}
        </Text>
        <TouchableOpacity 
          style={styles.authButton} 
          onPress={user ? handleLogout : handleLogin}
        >
          {user ? (
            <LogOut 
              size={24} 
              color={theme.colors.text.primary} 
            />
          ) : (
            <LogIn 
              size={24} 
              color={theme.colors.text.primary} 
            />
          )}
        </TouchableOpacity>
      </View>

      {user ? (
        <ScrollView>
          <ProfileHeader
            username={user.email || 'User'}
            name={user.email || 'User'}
            avatar={USERS[0].avatar}
            bio={USERS[0].bio}
            posts={USERS[0].posts}
            followers={USERS[0].followers}
            following={USERS[0].following}
            isVerified={false}
          />

          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
              onPress={() => setActiveTab('posts')}
            >
              <Grid 
                size={24} 
                color={theme.colors.text.primary} 
                strokeWidth={activeTab === 'posts' ? 2.5 : 1.5}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'reels' && styles.activeTab]}
              onPress={() => setActiveTab('reels')}
            >
              <Film 
                size={24} 
                color={theme.colors.text.primary}
                strokeWidth={activeTab === 'reels' ? 2.5 : 1.5}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
              onPress={() => setActiveTab('saved')}
            >
              <Bookmark 
                size={24} 
                color={theme.colors.text.primary}
                strokeWidth={activeTab === 'saved' ? 2.5 : 1.5}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'tagged' && styles.activeTab]}
              onPress={() => setActiveTab('tagged')}
            >
              <UserTag 
                size={24} 
                color={theme.colors.text.primary}
                strokeWidth={activeTab === 'tagged' ? 2.5 : 1.5}
              />
            </TouchableOpacity>
          </View>

          {renderTabContent()}
        </ScrollView>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Please log in to view your profile</Text>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

function PostsGrid() {
  const screenWidth = Dimensions.get('window').width;
  const tileSize = screenWidth / 3;

  return (
    <View style={styles.gridContainer}>
      <FlatList
        data={POSTS}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.gridTile, { width: tileSize, height: tileSize }]}
            activeOpacity={0.9}
          >
            <Image source={{ uri: item.image }} style={styles.tileImage} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        scrollEnabled={false}
      />
    </View>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  headerUsername: {
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.primary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridTile: {
    padding: 1,
  },
  tileImage: {
    width: '100%',
    height: '100%',
  },
  emptyContainer: {
    paddingVertical: theme.spacing.xxl * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    fontFamily: theme.fontFamily.semiBold,
  },
  authButton: {
    position: 'absolute',
    right: theme.spacing.md,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  loginText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  loginButton: {
    backgroundColor: theme.colors.button.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.bold,
  },
});