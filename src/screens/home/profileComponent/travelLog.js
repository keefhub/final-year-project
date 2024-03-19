import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";
import styles from "../styles";
import blogStyles from "../blogComponent/blogStyles";

//importing firestore
import { FIRESTORE, FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const TravelLog = ({ navigation }) => {
  const db = FIRESTORE;
  const auth = FIREBASE_AUTH;
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  const getPost = async () => {
    try {
      const user = auth.currentUser;
      const userUID = user ? user.email : null;

      // Query posts filtered by the logged-in user's UID
      let q = query(
        postCollectionRef,
        where("author", "==", userUID), // Filter by user's UID
        orderBy("title")
      );

      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []); // Call getPost only once when the component mounts

  const handlePress = (post) => {
    navigation.navigate("BlogComponent", { post });
  };

  return (
    <ScrollView style={blogStyles.container}>
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
    </ScrollView>
  );
};

export default TravelLog;
