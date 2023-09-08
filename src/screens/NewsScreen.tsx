import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Share from 'react-native-share';

import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import {RootStackParamList} from '../../App';
import NewsSection from '../components/NewsSection';

type NewsScreenProps = {};

const NewsScreen: FC<NewsScreenProps> = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList> = useRoute();
  const article = route.params?.article;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconF5 name="chevron-left" size={18} color="black" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={styles.title}>
          <IconF5 name="globe-asia" size={25} color="black" />
          <Text style={styles.titleText}>{article?.source.name}</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            // const shareResponse = await Share.open({title:'News'});
          }}>
          <IconFeather name="share" size={25} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic">
        {/* Author & Timestamp */}
        <NewsSection>
          <Text style={styles.authorText}>{article?.author}</Text>
          <Text style={styles.timestamp}>
            {new Date(article?.publishedAt!).toLocaleString('default', {
              day: '2-digit',
              month: 'long',
              weekday: 'short',
              hour: 'numeric',
            })}
          </Text>
        </NewsSection>
        {/* Title */}
        <NewsSection>
          <Text style={styles.newsTitle}>{article?.title}</Text>
        </NewsSection>
        {/* Description */}
        <NewsSection>
          <Text style={styles.newsDescription}>{article?.description}</Text>
        </NewsSection>
        {/* Image */}
        <NewsSection>
          <Image
            source={{
              uri: article?.urlToImage,
            }}
            resizeMode={'cover'}
            style={styles.image}
          />
        </NewsSection>
        {/* Content */}
        <NewsSection>
          <Text style={styles.newsDescription}>{article?.content}</Text>
        </NewsSection>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flexGrow: 1,
    padding: 10,
  },
  back: {
    backgroundColor: 'silver',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 30,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 5,
  },
  section: {marginVertical: 5},
  authorText: {
    fontSize: 15,
    fontWeight: '500',
  },
  timestamp: {
    color: 'grey',
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  newsDescription: {
    fontSize: 18,
  },
  image: {
    borderRadius: 24,
    height: 250,
  },
});
