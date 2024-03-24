import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ButtonText,
  Heading,
  Center,
  ButtonIcon,
  HStack,
} from "@gluestack-ui/themed";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import blogStyles from "../blogComponent/blogStyles";

//importing firestore
import { FIRESTORE, FIREBASE_AUTH } from "../../../../FirebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

const TravelLog = ({ navigation }) => {
  const db = FIRESTORE;
  const auth = FIREBASE_AUTH;
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  const [showModal, setShowModal] = useState(false);

  const getPost = async () => {
    try {
      const user = auth.currentUser;
      const userUID = user ? user.email : null;

      // Query posts filtered by the logged-in user's UID
      let q = query(
        postCollectionRef,
        where("author.name", "==", userUID), // Filter by user's UID
        orderBy("author.name")
      );

      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []); // Call getPost only once

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(postCollectionRef, postId));
      setShowModal(false);
      console.log("Post deleted successfully");
      // Update postList to reflect the deletion
      setPostList(postList.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePress = (post) => {
    navigation.navigate("BlogComponent", { post });
  };

  //onPress={() => handleDelete(post.id)} this is the delete button
  return (
    <ScrollView style={blogStyles.container}>
      {postList.length === 0 ? (
        <Center>
          <HStack>
            <FontAwesome5 name="sad-cry" size={30} color="black" />
            <Text style={blogStyles.noItemText}>No items available</Text>
          </HStack>
        </Center>
      ) : (
        postList.map(
          (post) =>
            (post.title ||
              post.caption ||
              (post.author && post.author.name) ||
              (post.image && post.image.length > 0)) && (
              <View key={post.id} style={blogStyles.card}>
                <View style={blogStyles.touchableBlogComponent}>
                  <TouchableOpacity onPress={() => handlePress(post)}>
                    {post.title && (
                      <Text style={blogStyles.title}>{post.title}</Text>
                    )}
                    {post.caption && (
                      <Text style={blogStyles.preview}>
                        {post.caption.substring(0, 50) + "..."}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  ref={{ ref: post.id }}
                  style={blogStyles.ellipsis}
                >
                  <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
                <Modal
                  isOpen={showModal}
                  onClose={() => {
                    setShowModal(false);
                  }}
                  finalFocusRef={post.id}
                >
                  <ModalBackdrop />
                  <ModalContent>
                    <ModalHeader>
                      <Heading>Warning!</Heading>
                      <ModalCloseButton onPress={() => setShowModal(false)}>
                        <AntDesign name="close" size={24} color="black" />
                      </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                      <Text>
                        Are you absolutely certain you wish to delete your
                        wonderful experience? This action cannot be undone.
                      </Text>
                    </ModalBody>
                    <Center>
                      <ModalFooter>
                        <Button
                          action="negative"
                          onPress={() => handleDelete(post.id)}
                        >
                          <ButtonIcon>
                            <Ionicons
                              name="trash-bin"
                              size={17}
                              color="white"
                            />
                          </ButtonIcon>
                          <ButtonText style={{ marginLeft: 5 }}>
                            Confirm
                          </ButtonText>
                        </Button>
                      </ModalFooter>
                    </Center>
                  </ModalContent>
                </Modal>
              </View>
            )
        )
      )}
    </ScrollView>
  );
};

export default TravelLog;
