import React, { ReactEventHandler, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
interface SubscriptionTypeSelectorProps {
    subscriptionType:string;
    setSubscriptionType:any
}
const SubscriptionTypeSelector = ({subscriptionType,setSubscriptionType}:SubscriptionTypeSelectorProps) => {

  return (
    <View style={styles.inputGroup}>
      <Ionicons name="card-outline" size={24} color="#4c669f" style={styles.icon} />
      
      <Picker
        selectedValue={subscriptionType}
        style={styles.picker}
        onValueChange={(itemValue) => setSubscriptionType(itemValue)}
      >
        <Picker.Item label="Basic" value="basic" />
        <Picker.Item label="Payed" value="Payed" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 60,
    padding:10,
  },
});

export default SubscriptionTypeSelector;
