import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import { theme } from '@/constants/theme';
import { Search, X } from 'lucide-react-native';
import { ExploreGrid } from '@/components/ExploreGrid';
import { EXPLORE_POSTS } from '@/data/mockData';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={16} color={theme.colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholderTextColor={theme.colors.text.secondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <X size={16} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearchFocused || searchQuery.length > 0 ? (
        <ScrollView style={styles.searchResults}>
          <Text style={styles.noResults}>No recent searches</Text>
        </ScrollView>
      ) : (
        <ExploreGrid 
          posts={EXPLORE_POSTS} 
          onPress={(post) => console.log('Post pressed:', post.id)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 38,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.sm,
  },
  clearButton: {
    marginLeft: theme.spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResults: {
    flex: 1,
    padding: theme.spacing.md,
  },
  noResults: {
    textAlign: 'center',
    paddingVertical: theme.spacing.xl,
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.sm,
  },
});