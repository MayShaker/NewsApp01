import React, { useState, useEffect } from 'react';
import { API_KEY } from '@env';

console.log(API_KEY); 

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
         `https://gnews.io/api/v4/top-headlines?lang=en&token=${API_KEY}`
        );
        const data = await response.json();
        setArticles(data.articles);
        setFilteredArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredArticles(articles);
    } else {
      const filteredData = articles.filter((article) =>
        article.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredArticles(filteredData);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#f5f5f5' }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>Top News</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? '#fff' : '#000'}
          trackColor={{ false: '#ccc', true: '#333' }}
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: darkMode ? '#1e1e1e' : '#fff' }]}
          placeholder="Search articles..."
          placeholderTextColor={darkMode ? '#aaa' : '#888'}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <Text style={{ color: darkMode ? '#fff' : '#000' }}>Loading articles...</Text>
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: darkMode ? '#1e1e1e' : '#fff',
                  shadowColor: darkMode ? '#fff' : '#000', 
                  shadowOpacity: 0.8, 
                  elevation: darkMode ? 8 : 12, 
                },
              ]}
              onPress={() => navigation.navigate('ArticleDetail', { article: item, darkMode })}
            >
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
              )}
              <View style={styles.cardContent}>
                <Text style={[styles.articleTitle, { color: darkMode ? '#fff' : '#000' }]}>
                  {item.title}
                </Text>
                {item.description && (
                  <Text
                    style={[styles.articleDescription, { color: darkMode ? '#ccc' : '#444' }]}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  clearButton: {
    marginLeft: 8,
    color: '#007BFF',
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 }, 
    shadowRadius: 8, 
  },
  cardImage: {
    height: 150,
    width: '100%',
  },
  cardContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
  },
});

export default HomeScreen;