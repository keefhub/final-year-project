import React, { useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import styles from "../styles";

import {
  Input,
  InputSlot,
  InputIcon,
  InputField,
  SearchIcon,
} from "@gluestack-ui/themed";

const BlogComponent = () => {
  const [text, onChangeText] = useState(null);
  return (
    <SafeAreaView>
      <View style={styles.blogContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Blog</Text>
        </View>
        <View style={styles.searchContainer}>
          <Input style={styles.search}>
            <InputSlot pl="$3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Search your dream Destination!" />
          </Input>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BlogComponent;
