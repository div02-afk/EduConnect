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
    zIndex:-1,
    
  },
  buttonSignup:{
    bottom: 50,
  }
});

export default styles;
