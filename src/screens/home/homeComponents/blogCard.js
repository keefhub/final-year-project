import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import blogStyles from "../blogComponent/blogStyles";

//firebase
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../../../../FirebaseConfig";

const BlogCard = ({ navigation }) => {
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

  const handlePress = (post) => {
    navigation.navigate("BlogComponent", { post });
  };

  return (
    <View style={styles.container}>
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
              {post.author && (
                <Text style={blogStyles.preview}>
                  By: {post.author.name || "Unknown Author"}
                </Text>
              )}
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
