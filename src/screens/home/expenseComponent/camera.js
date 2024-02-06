import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Button from "../../../constants/button";

const CameraFunction = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        console.error("Error while taking a picture:", error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Image saved to library");
        setImage(null);
      } catch (error) {
        console.log("Error while saving the image:", error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={cameraStyles.container}>
      {!image ? (
        <Camera
          style={cameraStyles.camera}
          type={type}
          FlashMode={flash}
          ref={cameraRef}
          autoFocus={Camera.Constants.AutoFocus.on}
        >
          <View style={cameraStyles.inCamera}>
            <Button
              icon={"retweet"}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              icon={"flash"}
              color={flash === FlashMode.on ? "yellow" : "white"}
              onPress={() => {
                setFlash(
                  flash === FlashMode.off ? FlashMode.on : FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={cameraStyles.camera} />
      )}
      <View>
        {image ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              title={"Take another picture"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <Button title={"Save picture"} icon="check" onPress={saveImage} />
          </View>
        ) : (
          <Button
            title={"Take a picture"}
            icon="camera"
            onPress={takePicture}
          />
        )}
      </View>
    </View>
  );
};

const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },

  camera: {
    flex: 1,
    borderRadius: 20,
  },

  inCamera: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 50,
  },
});

export default CameraFunction;
