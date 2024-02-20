import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    color: "#C6C6C6",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    padding: 20,
  },
  topicButton: {
    width: "80%",
    marginTop: 20,
    backgroundColor: "#000",
    borderBottomColor: "#C6C6C6",
    borderBottomWidth: 1,
    height: 50,
  },
  topicText: {
    color: "#C6C6C6",
    fontSize: 20,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#171717",
    fontSize: 16,
    width: 300,
    padding: 15,
    margin: 10,
    color: "#C6C6C6",
    borderRadius: 10,
  },
  buttonSignin: {
    bottom: 120,
  },
  button: {
    padding: 20,
    backgroundColor: "#0036C1",
    width: "80%",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
  },
  buttonSignup: {
    bottom: 50,
  },
  subTopicList: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  navbarIcon: {
    color: "#C9C9C9",
    fontSize: 30,
    width: "100%",
    height: "100%",
  },
  navbarButton: {
    height: "100%",
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
