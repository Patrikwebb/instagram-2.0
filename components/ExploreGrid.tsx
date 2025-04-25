import React from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  FlatList 
} from 'react-native';
import { theme } from '@/constants/theme';

type ExplorePost = {
  id: string;
  image: string;
};

type ExploreGridProps = {
  posts: ExplorePost[];
  onPress?: (post: ExplorePost) => void;
};

export const ExploreGrid = ({ posts, onPress }: ExploreGridProps) => {
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const tileSize = screenWidth / numColumns;

  const renderItem = ({ item }: { item: ExplorePost }) => (
    <TouchableOpacity
      style={[styles.tile, { width: tileSize, height: tileSize }]}
      activeOpacity={0.9}
      onPress={() => onPress && onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  tile: {
    padding: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});