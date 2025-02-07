import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { useState, useRef } from "react";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons"; // Import icons
import * as React from 'react';
import {Comment} from '@/app/(redux)/commentsSlice'
import { replaceIp } from "@/hooks/helpers";
const CommentItem = ({ commentobj}:{commentobj:Comment}) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleLike = () => {
    setLiked(!liked);
    Animated.spring(scaleAnim, {
      toValue: liked ? 1 : 1.2,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPressIn={() => setHovered(true)}
      onPressOut={() => setHovered(false)}
    >
      <View style={[styles.commentContainer, hovered && styles.hoverEffect]}>
       
        <Image
          source={{ uri: replaceIp(commentobj?.user?.image, `${process.env.EXPO_PUBLIC_REPLACE}`) }}
          style={styles.profileImage}
        />

        <View style={styles.commentContent}>
          <Text style={styles.userName}>{commentobj.user?.name}</Text>
          <Text style={styles.commentText}>{commentobj.content}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity onPress={toggleLike}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <AntDesign name={liked ? "heart" : "hearto"} size={18} color={liked ? "red" : "gray"} />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name="message-circle" size={18} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialIcons name="edit" size={18} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 10,
    margin: 8,
    elevation: 2, 
  },
  hoverEffect: {
    backgroundColor: "#e9ecef",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontWeight:"400",
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 5,
    gap: 10,
  },
};

export default CommentItem;
