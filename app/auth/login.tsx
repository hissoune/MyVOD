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
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Formik } from "formik"
import * as yup from "yup"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query";
import { login } from '../(services)/api/api';
const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Enter a valid email').label('Email'),
  password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters').label('Password'),
})

export default function LoginScreen() {
    const router =useRouter()

    const loginMutation = useMutation(login, {
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
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/7c2d20bbb14eac6d2e02a3360632cb4b.jpg")} style={styles.logo} />
        <Text style={styles.title}>CinemaWorld</Text>
      </View>
      <Formik
        initialValues={{ email: "pixes@mailinator.com", password: "pixes@mailinator.com" }}
        validationSchema={validationSchema}

        onSubmit={(values) => {
            loginMutation.mutate(values);
          }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.inputContainer}>
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
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={()=> router.push('/auth/register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
    marginBottom: 10,
  },
  registerText: {
    color: "#fff",
    marginTop: 20,
  },
})
