"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { isValidCardNumber } from "@/hooks/helpers"
import CustomAlert from "@/components/custumAllert"
import { useLocalSearchParams, useRouter } from "expo-router"
import SubscriptionTypeSelector from "@/components/SubscriptionTypeSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { createsubscription } from "../(redux)/subscriptionSlice"
import { issubscriped } from "../(redux)/authSlice"

export default function PaymentScreen() {
    const { movieData } = useLocalSearchParams();
    const [subscriptionType, setSubscriptionType] = useState("basic");

    
  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111")
  const [expiryDate, setExpiryDate] = useState(new Date())
  const [cvv, setCvv] = useState("123")
  const [cardHolder, setCardHolder] = useState("John Doe")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [errors, setErrors] = useState({
    cardNumber: false,
    expiryDate: false,
    cvv: false,
    cardHolder: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
const dispatch = useAppDispatch()

  const handlePayment = async () => {
    setIsLoading(true)

    const newErrors = {
      cardNumber: !isValidCardNumber(cardNumber),
      expiryDate: expiryDate <= new Date(),
      cvv: cvv.length !== 3,
      cardHolder: cardHolder.trim().length === 0,
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      setAlertTitle("Error")
      setAlertMessage("Please correct the highlighted fields.")
      setShowAlert(true)
      setIsLoading(false)
      return
    }

    try {
      
      await dispatch(createsubscription(subscriptionType)).unwrap();    
       await   dispatch(issubscriped())
      setAlertTitle("Success")
      setAlertMessage("Payment processed successfully!")
      setShowAlert(true)
    } catch (error) {
      setAlertTitle("Error")
      setAlertMessage("Payment processing failed. Please try again.")
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCardNumber = (input: string) => {
    const cleaned = input.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = cleaned.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return input
    }
  }

  const renderDatePicker = () => {
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (
      <Modal visible={showDatePicker} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Expiry Date</Text>
            <View style={styles.pickerContainer}>
              <ScrollView style={styles.pickerColumn}>
                {months.map((month, index) => (
                  <TouchableOpacity
                    key={month}
                    style={styles.pickerItem}
                    onPress={() => {
                      const newDate = new Date(expiryDate)
                      newDate.setMonth(index)
                      setExpiryDate(newDate)
                    }}
                  >
                    <Text style={[styles.pickerText, expiryDate.getMonth() === index && styles.pickerTextSelected]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={styles.pickerColumn}>
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={styles.pickerItem}
                    onPress={() => {
                      const newDate = new Date(expiryDate)
                      newDate.setFullYear(year)
                      setExpiryDate(newDate)
                    }}
                  >
                    <Text style={[styles.pickerText, expiryDate.getFullYear() === year && styles.pickerTextSelected]}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowDatePicker(false)}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.gradientBackground}>
          <View style={styles.card}>
            <Text style={styles.title}>Payment Details</Text>

            <View style={styles.inputGroup}>
              <Ionicons name="person-outline" size={24} color="#4c669f" style={styles.icon} />
              <TextInput
                style={[styles.input, errors.cardHolder && styles.inputError]}
                placeholder="Card Holder Name"
                placeholderTextColor="#999"
                onChangeText={(text) => {
                  setCardHolder(text)
                  setErrors({ ...errors, cardHolder: false })
                }}
                value={cardHolder}
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons name="card-outline" size={24} color="#4c669f" style={styles.icon} />
              <TextInput
                style={[styles.input, errors.cardNumber && styles.inputError]}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#999"
                keyboardType="numeric"
                onChangeText={(text) => {
                  const formatted = formatCardNumber(text)
                  setCardNumber(formatted)
                  setErrors({ ...errors, cardNumber: false })
                }}
                value={cardNumber}
                maxLength={19}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Ionicons name="calendar-outline" size={24} color="#4c669f" style={styles.icon} />
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                  <Text style={[styles.datePickerText, errors.expiryDate && styles.inputError]}>
                    {expiryDate.toLocaleDateString("en-US", { month: "2-digit", year: "2-digit" })}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Ionicons name="lock-closed-outline" size={24} color="#4c669f" style={styles.icon} />
                <TextInput
                  style={[styles.input, errors.cvv && styles.inputError]}
                  placeholder="CVV"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  secureTextEntry
                  onChangeText={(text) => {
                    setCvv(text)
                    setErrors({ ...errors, cvv: false })
                  }}
                  value={cvv}
                  maxLength={3}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
            <SubscriptionTypeSelector subscriptionType={subscriptionType} setSubscriptionType={setSubscriptionType}/>
            </View>

            <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.payButtonText}>Pay Now</Text>}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
      {renderDatePicker()}
      <CustomAlert
        visible={showAlert}
        title={alertTitle}
        message={alertMessage}
        onClose={() => {
          setShowAlert(false)
          if (alertTitle === "Success") {
            router.push(`/details/moviesDetails?movieData=${movieData}`)
          }
        }}
      /> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4c669f",
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
  },
  inputError: {
    borderBottomColor: "red",
    color: "red",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  payButton: {
    backgroundColor: "#4c669f",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  datePickerButton: {
    flex: 1,
    justifyContent: "center",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  pickerColumn: {
    flex: 1,
    height: 200,
  },
  pickerItem: {
    padding: 10,
    alignItems: "center",
  },
  pickerText: {
    fontSize: 18,
  },
  pickerTextSelected: {
    fontWeight: "bold",
    color: "#4c669f",
  },
  modalButton: {
    backgroundColor: "#4c669f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

