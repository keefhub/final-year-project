import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import styles from "./styles";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import {
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
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

import {
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

// OpenAI
import OpenAI from "openai";
import { OPENAI_API_KEY, OPENAI_BASE_URL } from "@env";

const Itinerary = () => {
  const [values, setValues] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [activities, setActivities] = useState("");

  const planItinerary = async () => {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      baseURL: OPENAI_BASE_URL,
    });
    res = await openai.chat.completions.create({});
    try {
      const prompt = [
        {
          role: "user",
          content: `Plan a comprehensive travel itinerary. 
            I am travelling with,
            ${values}.
            I am going to
            ${destination}
            for
            ${duration}.
            And I want to include the following activities,
            ${activities}`,
        },
      ];

      const results = await fetch(OPENAI_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: prompt,
        }),
      });

      //const responseData = await results.json();

      console.log(results);

      // Access specific fields from the response as needed
      //console.log(responseData.choices[0]);

      // setPlan(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (values === "" || destination === "" || duration === "") {
      alert("Please do not leave required fields empty");
    } else {
      planItinerary();
      setValues("");
      setDestination("");
      setDuration("");
      setActivities("");
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
                      <MaterialIcons
                        name="family-restroom"
                        size={20}
                        color="black"
                        style={styles.itineraryIcon}
                      />
                      <Text style={styles.itineraryText}>Family</Text>
                    </Radio>
                    <Radio value="friends">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <FontAwesome5
                        name="user-friends"
                        size={15}
                        color="black"
                        style={styles.itineraryIcon}
                      />
                      <Text style={styles.itineraryText}>Friends</Text>
                    </Radio>
                    <Radio value="partner">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <FontAwesome
                        name="heart"
                        size={15}
                        color="black"
                        style={styles.itineraryIcon}
                      />
                      <Text style={styles.itineraryText}>Partner</Text>
                    </Radio>
                    <Radio value="alone">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <Ionicons
                        name="person"
                        size={17}
                        color="black"
                        style={styles.itineraryIcon}
                      />
                      <Text style={styles.itineraryText}>Alone</Text>
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
                      placeholder="i.e., 5 days, 1 week, etc.."
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
