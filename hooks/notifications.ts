import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import { Alert } from "react-native"
import { setExpoPushToken } from "../app/(redux)/notificationSlice"
import axios from "axios"
import Constants from "expo-constants"

const BACKEND_URL = "http://192.168.8.254:3000"

export async function registerForPushNotificationsAsync(dispatch: any) {
  let token: string

  if (!Device.isDevice) {
    Alert.alert("Error", "Must use a physical device for Push Notifications")
    return
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (finalStatus !== "granted") {
    Alert.alert("Error", "Failed to get push token for push notification!")
    return
  }

  try {
    // Get the projectId from your app.json
    const projectId ="e501925f-1cee-4e51-b8b9-f79f808b6219"

    if (!projectId) {
      throw new Error("Project ID is not defined in app.json")
    }

    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data

    console.log("Expo Push Token:", token)

    if (token) {
      dispatch(setExpoPushToken(token))
      await sendTokenToBackend(token)
    }
  } catch (error) {
    console.error("Error getting push token:", error)
    Alert.alert("Error", "An error occurred while setting up push notifications.")
  }
}

const sendTokenToBackend = async (token: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/notifications/save-token`, {
      expoPushToken: token,
    })
    console.log("Token saved to backend:", response.data)
  } catch (error) {
    console.error("Error saving push token:", error)
  }
}

