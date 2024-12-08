import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const ArticleDetailScreen = ({ route, navigation }) => {
  const { article, darkMode } = route.params;  

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#121212' : '#fff' }, 
      ]}
    >
      {article.image && (
        <Image source={{ uri: article.image }} style={styles.image} />
      )}

      <Text style={[styles.title, { color: darkMode ? '#fff' : '#333' }]}>
        {article.title}
      </Text>

      <Text style={[styles.content, { color: darkMode ? '#ccc' : '#555' }]}>
        {article.content}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: darkMode ? '#fff' : '#000', 
            borderColor: darkMode ? '#fff' : '#000',
          },
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, { color: darkMode ? '#000' : '#fff' }]}>
          Go Back
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ArticleDetailScreen;