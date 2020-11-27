import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";
import { addPostJSON, getDataJSON, storeDataJSON , addDataJSON } from "./../functions/AsyncStorageFunctions";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const input = React.createRef();

const HomeScreen = (props) => {
  // const netinfo = useNetInfo();
  // if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
  //   alert("No Internet!");
  // }
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentPost, setRecentPost] = useState([""]);
  const loadPosts = async () => {
    setLoading(true);
    alert("working i m ")
  
    let temp_posts = await getDataJSON("Posts");
    setPosts(temp_posts);
    setLoading(false);
  };
  // clearAsyncStorage = async() =>{
  //   AsyncStorage.clear();}

  useEffect(() => {
    // clearAsyncStorage();
    loadPosts();
  }, []);

  if (!loading) {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <Header
              leftComponent={{
                icon: "menu",
                color: "#fff",
                onPress: function () {
                  props.navigation.toggleDrawer();
                },
              }}
              centerComponent={{ text: "The Office", style: { color: "#fff" } }}
              rightComponent={{
                icon: "lock-outline",
                color: "#fff",
                onPress: function () {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                },
              }}
            />
            <Card>
              <Input
              ref = {input}
              clearButtonMode = {'always'}
              clearButtonMode = {'always'}
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={
                function (currentPost) {
                  setRecentPost(currentPost);
                }
              }
            />

              <Button title="Post" type="outline" onPress={function () {
                setLoading(true);
                alert("working i m ")
                let flag = 0;
                if (posts == undefined) {
                  flag = 1;
                }
                else {
                  flag = posts.length + 1;
                }
                let postDetail = {
                  post_ID: flag,
                  author: auth.CurrentUser.name,
                  body: recentPost,
                  created_at: "Posted On " + moment().format("DD MMM, YYYY"),
                  likes: [],
                  comments: []
                }
                if (posts == undefined) {
                  setPosts([postDetail]);
                  storeDataJSON('Posts', [postDetail]);
                } 
                else {
                  //setPosts([...posts, postDetail]);
                  addDataJSON('Posts', postDetail);
                }
                input.current.clear();
                setRecentPost("");
                setLoading(false);
              }} />
              
            </Card>
            <SafeAreaView style={flex=1}>

            <FlatList
              data={posts}
              inverted={true}
              scrollsToTop={true}
              keyExtractor={(item) => item.post_ID}
              renderItem={function ({ item }) {
                return (
                    <PostCard
                      author={item.author}
                      title={item.created_at}
                      body={item.body}
                      navigation={props.navigation}
                      post={item}
                     />
                );
              }}
            />
            </SafeAreaView>
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;
