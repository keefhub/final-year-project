import React from "react";
import { View, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../screens/home/styles";

const CustomsHeader = ({ navigation, route }) => {
  const goBack = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CustomsHeader;
