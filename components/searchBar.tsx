import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
    placehonder: string;
    onpress?: () => void;
    value?: string;
    onchangetext?: (text: string) => void;
}

const SearchBar = ({ onpress , placehonder, value , onchangetext}: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={"#ab8bff"}/>
        <TextInput placeholder={placehonder} value={value} onChangeText={onchangetext} onPress={onpress} placeholderTextColor={"#a8b5bd"} className='flex-1 ml-2 text-white'/>
    </View>
  )
}

export default SearchBar