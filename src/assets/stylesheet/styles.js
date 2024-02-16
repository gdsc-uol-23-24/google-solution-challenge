import { StyleSheet } from "react-native";

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLarge: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
    marginBottom: -30,
  },
  logoSmall: {
    // pending
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  section: {
    marginTop: 5,
    marginBottom: 10,
  },
  h1: {
    fontSize: 36,
    fontFamily: 'RobotoCondensed_700Bold',
    textAlign: 'center',
  },
  h2: {
    fontSize: 26,
    fontFamily: 'RobotoCondensed_700Bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  button: {
    backgroundColor: '#3652AD',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    fontWeight: 'bold',
  },
  imageContainer: { 
    marginTop: 20,
  }, 
  image: { 
    width: 200, 
    height: 200, 
    resizeMode: 'cover',
  }, 
  errorText: { 
    color: "red", 
    marginTop: 16, 
  },
});
  
export default styles;