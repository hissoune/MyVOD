import React from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Formik } from "formik"
import * as yup from "yup"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"
import { register } from '../(services)/api/authapi';

const validationSchema = yup.object().shape({
  name: yup.string().required("Full Name is required").label("Full Name"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required")
    .label("Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .label("Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required")
    .label("Confirm Password"),
})

export default function RegisterScreen() {
        const router =useRouter()
        const registerMutation = useMutation(register, {
            onSuccess: (data) => {
              console.log("Login Successful:", data);
              router.push("/(tabs)");
            },
            onError: (error:any) => {
              console.error("Login Error:", error.response?.data || error.message);
              
            },
          });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/images/7c2d20bbb14eac6d2e02a3360632cb4b.jpg")} style={styles.logo} />
          <Text style={styles.title}>Join CinemaWorld</Text>
        </View>
        
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            registerMutation.mutate(values);
          }}        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#888"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
              />
              {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
               {registerMutation.isLoading ?(<ActivityIndicator color={'#fff'} />):(
                               <Text style={styles.buttonText}>Register</Text>
               
                               )}
              </TouchableOpacity>
              
            </View>
          )}
        </Formik>
        <TouchableOpacity onPress={()=> router.push('/auth/login')}>
                <Text style={styles.registerText}>Allredy have an account? Log in</Text>
              </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#E50914",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  registerText: {
    color: "#fff",
    marginTop: 20,
  },
})
