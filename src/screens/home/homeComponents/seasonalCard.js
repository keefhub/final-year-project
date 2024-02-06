import React from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import images from "../../../constants/images";
import styles from "../styles";

const SeasonalCard = () => {
  return (
    <View style={styles.seasonalContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Seasonal Destinations</Text>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Pressable>
            <Image source={images.Spring} style={styles.image} />
            <Text style={styles.imageText}>Spring</Text>
          </Pressable>
          <Pressable>
            <Image source={images.Summer} style={styles.image} />
            <Text style={styles.imageText}>Summer</Text>
          </Pressable>
        </View>
        <View style={styles.imageContainer}>
          <Pressable>
            <Image source={images.Autumn} style={styles.image} />
            <Text style={styles.imageText}>Autumn</Text>
          </Pressable>
          <Pressable>
            <Image source={images.Winter} style={styles.image} />
            <Text style={styles.imageText}>Winter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default SeasonalCard;
