import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { FetchMovie } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useeftch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const { data: movies, loading: movieLoading, error: movieError , refetch: loadMovie, reset: reset} = useFetch(() => FetchMovie({ query: searchQuery }), false)
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(async () => {
        if(searchQuery.trim()) {
            await loadMovie();

            if (movies?.length! > 0 && movies?.[0]) {
                await updateSearchCount(searchQuery, movies[0]);
            }
        } else {
            reset()
        }
    }, 500);
     return () => clearTimeout(timeOut);
  }, [searchQuery])

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 w-full absolute z-0" resizeMode="cover"/>
            <FlatList 
                data={movies}
                renderItem={({item}) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                className="px-5"
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListHeaderComponent={
                    <View>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10"/>
                        </View>  
                        <View className="my-5 ">
                            <SearchBar placehonder="search Movies ..." onchangetext={(text) =>setSearchQuery(text)} value={searchQuery}/>
                        </View>

                        {movieLoading && (
                            <ActivityIndicator size={'large'} color={'#000ff'} className="my-3 self-center"/>
                        )}

                        {movieError && (
                            <Text className="text-lg px-5b my-3 text-red-500 font-bold">Error: {movieError.message}</Text>
                        )}

                        {!movieLoading && !movieError && searchQuery.trim() && movies?.length > 0 && (
                            <Text className="text-xl text-white font-bold">Search Result for { '' }<Text className="text-accent">{searchQuery}</Text></Text>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    <View>
                        {!movieError && !movieLoading ? (
                            <View className="px-5">
                                <Text className="text-center text-gray-500">{searchQuery.trim() ? 'No movie found for your search' : 'Search for a movie'}</Text>
                            </View>
                        ) : null}
                    </View>
                }
            />
        </View>
    )
}

export default Search;