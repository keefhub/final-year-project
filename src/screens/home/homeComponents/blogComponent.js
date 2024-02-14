import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Image } from "react-native";
import styles from "../styles";

//firebase
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../../../../FirebaseConfig";

//styling
import {
  Input,
  InputSlot,
  InputIcon,
  InputField,
  SearchIcon,
} from "@gluestack-ui/themed";

const BlogComponent = () => {
  const db = FIRESTORE;
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        setPostList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        //console.log(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error getting posts:", error);
      }
    };

    getPost();
  }, []);

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
          {postList.map(
            (post) =>
              // Check if essential data is present before rendering the post
              (post.title ||
                post.caption ||
                (post.author && post.author.name) ||
                (post.image && post.image.length > 0)) && (
                <View key={post.id}>
                  {post.author && (
                    <Text>@{post.author.name || "Unknown Author"}</Text>
                  )}
                  {post.title && <Text>{post.title}</Text>}
                  {post.caption && <Text>{post.caption}</Text>}
                  {post.image && post.image.length > 0 && (
                    <View>
                      {post.image.map((imageUrl, index) => (
                        <Image
                          key={index}
                          source={{ uri: imageUrl }}
                          style={styles.image}
                        />
                      ))}
                    </View>
                  )}
                </View>
              )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BlogComponent;
