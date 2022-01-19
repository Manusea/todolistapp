import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {useContext, useEffect} from 'react';
import {
  Button, SafeAreaView, StyleSheet, Modal,
  View, TextInput, Dimensions, Text, TouchableOpacity,   Alert
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProviders';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.

import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

import GetTaskData from '../firestore/getTaskData';

const {width} = Dimensions.get('window');

export default function TaskPage({navigation}) {
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  // This is to manage TextInput State
  const [topic, topicInput] = useState("");
  const [detailTask, detailTaskInput] = useState("");

  // This is user data from firebase
  const { user, logout } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [getDownloadURL, setUrl] = useState("");

  const selectImage = () => {

    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
      console.log('Response = ', response.assets[0].uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const  uri = response.assets[0].uri;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;
        const placeUrl = user.uid+'/'+'task'+'/'+filename
        console.log(placeUrl)
        
        setUploading(true);
        setTransferred(0);
        const task = storage()
          .ref(placeUrl)
          .putFile(uploadUri);
        // set progress state

        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            urlUser = downloadURL;
            setUrl(urlUser)
            console.log("Checkkkk  ",urlUser)
          });
        });
        setUploading(false);
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setImage(null);

      }
    });
  }


  // This call firestore collection for store Tasklist 
  let usersCollectionRef = firestore().collection("user").doc(user.uid).collection("Task");

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    if (topic != "" && detailTask != "") {
      usersCollectionRef
        .add({
          timestamp: firestore.FieldValue.serverTimestamp(),
          topic: topic,
          taskDetail: detailTask,
          urlPhoto: urlUser
        })

      topicInput("");
      detailTaskInput("");
    }
  };




  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      {/**  Displays Task Data */}
      <GetTaskData />

      {/**  We are going to create a Modal with Text Input. */}
      <Button title="ADD TASk" onPress={toggleModalVisibility} />

      {/** This is our modal component containing textinput and a button */}
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text>Topic</Text>
            <TextInput
              placeholder="Enter something..."
              value={topic}
              style={styles.textInput}
              onChangeText={topic => topicInput(topic)}
            />
            <Text>Detail Task</Text>
            <TextInput
              placeholder="Enter something..."
              value={detailTask}
              style={styles.textInput}
              onChangeText={detailTask => detailTaskInput(detailTask)}
            />


            <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
              <Text style={styles.buttonText}>Pick an image</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {image !== null ? (
                <Image source={{ uri: image.uri }} style={styles.imageBox} />
              ) : null}
              {uploading ? (
                <View style={styles.progressBarContainer}>
                  <Progress.Bar progress={transferred} width={300} />
                </View>
              ) : null
              }
            </View>

            {/** This button is responsible to close the modal */}
            <Button title="Done" onPress={toggleModalVisibility} />

          </View>
        </View>
      </Modal>


      {/*This is Button Log out*/}
      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.loginButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('getTaskData')}>
        <Text style={styles.loginButtonText}>GetData</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// These are user defined styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 400,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  }
});
