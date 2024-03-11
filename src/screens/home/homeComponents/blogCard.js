import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import blogStyles from "../blogComponent/blogStyles";

//gluestack-ui
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from "@gluestack-ui/themed";

//firebase
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { FIRESTORE } from "../../../../FirebaseConfig";

const BlogCard = ({ navigation }) => {
  const db = FIRESTORE;
  const [postList, setPostList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPost = async () => {
      try {
        let q;

        if (searchQuery) {
          // Apply search filter if searchQuery is not empty
          q = query(
            postCollectionRef,
            where("title", ">=", searchQuery),
            where("title", "<=", searchQuery + "\uf8ff"),
            orderBy("title")
          );
        } else {
          // Fetch all posts if no search query
          q = postCollectionRef;
        }

        const data = await getDocs(q);
        setPostList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error getting posts:", error);
      }
    };

    getPost();
  }, [postCollectionRef, searchQuery]);

  const handlePress = (post) => {
    navigation.navigate("BlogComponent", { post });
  };

  return (
    <View style={blogStyles.container}>
      <View style={styles.searchContainer}>
        <Input style={styles.search}>
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            type="text"
            placeholder="Search your dream destination!"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </Input>
      </View>
      {postList.map(
        (post) =>
          (post.title ||
            post.caption ||
            (post.author && post.author.name) ||
            (post.image && post.image.length > 0)) && (
            <TouchableOpacity
              key={post.id}
              style={blogStyles.card}
              onPress={() => handlePress(post)}
            >
              {post.title && <Text style={blogStyles.title}>{post.title}</Text>}
              {post.caption && (
                <Text style={blogStyles.preview}>
                  {post.caption.substring(0, 50) + "..."}
                </Text>
              )}
            </TouchableOpacity>
          )
      )}
    </View>
  );
};

export default BlogCard;
