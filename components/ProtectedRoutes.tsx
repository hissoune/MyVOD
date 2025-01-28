import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

type AuthState = {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  token:string;
  isLoading: boolean;
};

type RootState = {
  auth: AuthState;
};

 const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/auth/login');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});


export default ProtectedRoutes;