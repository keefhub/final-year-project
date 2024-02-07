//this is just in case i need

import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import Button from "../../constants/button";

const CameraFunction = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState(FlashMode.flashOff);
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
        console.log(data);
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
        ></Camera>
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
});

export default CameraFunction;
