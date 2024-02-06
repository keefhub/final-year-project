import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles";

import { FontAwesome5 } from "@expo/vector-icons";

const ContinentCard = () => {
  return (
    <View style={styles.continentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Next Travel Destination!</Text>
      </View>
      <ScrollView
        style={styles.cardContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.card, styles.cardElevated, styles.cardAfrica]}>
          <FontAwesome5 name="globe-africa" size={40} color="white" />
          <Text style={{ color: "white" }}>Africa</Text>
        </View>
        <View style={[styles.card, styles.cardElevated, styles.cardAmerica]}>
          <FontAwesome5 name="globe-americas" size={40} color="black" />
          <Text>America</Text>
        </View>
        <View style={[styles.card, styles.cardElevated, styles.cardAsia]}>
          <FontAwesome5 name="globe-asia" size={40} color="black" />
          <Text>Asia</Text>
        </View>
        <View style={[styles.card, styles.cardElevated, styles.cardEurope]}>
          <FontAwesome5 name="globe-europe" size={40} color="black" />
          <Text>Europe</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContinentCard;
