import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import styles from "./styles";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import {
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
  RadioLabel,
  Box,
  FormControl,
  Heading,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  VStack,
} from "@gluestack-ui/themed";

import { FontAwesome } from "@expo/vector-icons";

const Itinerary = () => {
  const [values, setValues] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [activities, setActivities] = useState("");

  const handleSubmit = () => {
    if (values === "" || destination === "" || duration === "") {
      alert("Please do not leave required fields empty");
    } else {
      setValues("");
      setDestination("");
      setDuration("");
      setActivities("");
      console.log(values, destination, duration, activities);
      alert("Your itinerary has been created!");
    }
  };
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <Box style={styles.container}>
          <ScrollView>
            <FormControl>
              <Box style={styles.heading}>
                <Heading size="lg">I am Travelling with...</Heading>
              </Box>
              <Box style={styles.radioGroup}>
                <RadioGroup value={values} onChange={setValues}>
                  <VStack space="md">
                    <Radio value="family">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Family</RadioLabel>
                    </Radio>
                    <Radio value="friends">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Friends</RadioLabel>
                    </Radio>
                    <Radio value="partner">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Partner</RadioLabel>
                    </Radio>
                    <Radio value="alone">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Alone</RadioLabel>
                    </Radio>
                  </VStack>
                </RadioGroup>
              </Box>
              <VStack space="md">
                <Box style={styles.heading}>
                  <Heading size="lg">I am Travelling to...</Heading>
                </Box>
                <Box style={styles.itineraryInput}>
                  <Input
                    size={"lg"}
                    variant={"outline"}
                    isInvalid={false}
                    isDisabled={false}
                  >
                    <InputField
                      placeholder="Input your destination"
                      value={destination}
                      onChangeText={setDestination}
                    />
                  </Input>
                </Box>
                <Box style={styles.heading}>
                  <Heading size="lg">I am Travelling for...</Heading>
                </Box>
                <Box style={styles.itineraryInput}>
                  <Input
                    size={"lg"}
                    variant={"outline"}
                    isInvalid={false}
                    isDisabled={false}
                  >
                    <InputField
                      placeholder="i.e., 7d6n"
                      value={duration}
                      onChangeText={setDuration}
                    />
                  </Input>
                </Box>
                <Box style={styles.heading}>
                  <Heading size="lg">
                    Lastly, I want to include these activities..
                  </Heading>
                </Box>
                <Box style={styles.itineraryInput}>
                  <Input
                    size={"lg"}
                    variant={"outline"}
                    isInvalid={false}
                    isDisabled={false}
                  >
                    <InputField
                      placeholder="i.e., hiking, snorkeling, etc."
                      value={activities}
                      onChangeText={setActivities}
                    />
                  </Input>
                </Box>
                <Box style={styles.buttonContainer}>
                  <Button
                    size={"lg"}
                    variant={"solid"}
                    isInvalid={false}
                    isDisabled={false}
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <ButtonText style={styles.buttonText}>Plan Now!</ButtonText>
                    <ButtonIcon as={FontAwesome} name="plane" />
                  </Button>
                </Box>
              </VStack>
            </FormControl>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Itinerary;
