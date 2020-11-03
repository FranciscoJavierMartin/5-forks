import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar, ListItem, Icon, Image } from 'react-native-elements';
import { IRestaurant } from '../common/interfaces/common';
import { RestaurantScreenNavigationProp } from '../common/routes/restaurants';
import { getSearchRestaurants } from '../api/restaurants';
import NotFoundRestaurants from '../components/search/NotFoundRestaurants';
import ResultList from '../components/search/ResultList';

const Search: React.FC = () => {
  const navigation = useNavigation<RestaurantScreenNavigationProp>();
  const [searchText, setSearchText] = useState<string>('');
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    if (searchText.length > 2) {
      getSearchRestaurants(searchText)
        .then((response) => {
          setRestaurants(
            response.map(
              (r) =>
                ({
                  ...r,
                } as IRestaurant)
            )
          );
        })
        .catch(() => {
          console.log('Hello');
        });
    } else if (searchText.length === 0) {
      setRestaurants([]);
    }
  }, [searchText]);

  return (
    <View>
      <SearchBar
        placeholder='Search your restaurant'
        onChangeText={(e) => setSearchText(e)}
        value={searchText}
        containerStyle={styles.searchBar}
      />
      {restaurants.length === 0 ? (
        <NotFoundRestaurants />
      ) : (
        <ResultList restaurants={restaurants} navigation={navigation} />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
});
