import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

const TabBarIconDesign = ( {focused, name, icon}: any ) => {
  if (focused) {
    return (
        <ImageBackground
          source={images.highlight}
          className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
          <Image source={icon} tintColor={"#151312"} className="size-5" /><Text className="text-black text-base font-semibold ml-2">{name}</Text>
        </ImageBackground>
    )
  } else {
    return(
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image source={icon} tintColor={"#a8b5db"} className="size-5"/>
      </View>
    )
  }
}
const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        },
        tabBarStyle: {
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 53,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: "#0f0d23"
        }
      }}
    >
      <Tabs.Screen name="index" options={
        { 
          title: "Home",
          headerShown: false,
          tabBarIcon: ( {focused} ) => (
            <TabBarIconDesign focused={focused} name="Home" icon={icons.home} />
          )
           }} />
      <Tabs.Screen name="search" options={{ 
        title: "Search",
        headerShown: false,
        tabBarIcon: ( {focused} ) => (
          <TabBarIconDesign focused={focused} name="Search" icon={icons.search} />
        )  
      }} />
      <Tabs.Screen name="save" options={{ 
        title: "Save",
        headerShown: false,
        tabBarIcon: ( {focused} ) => (
          <TabBarIconDesign focused={focused} name="Save" icon={icons.save} />
        )
      }} />
      <Tabs.Screen name="profile" options={{ 
        title: "Profile",
        headerShown: false,
        tabBarIcon: ( {focused} ) => (
          <TabBarIconDesign focused={focused} name="Profile" icon={icons.person} />
        )  
      }} />
    </Tabs>
  );
};

export default _Layout;