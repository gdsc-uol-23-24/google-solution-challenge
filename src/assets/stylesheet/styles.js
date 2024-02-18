import { StyleSheet } from "react-native";

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6EDFD',
    padding: 20,
  },
  splashLogo: {
    width: 250, 
    height: 250, 
    resizeMode: 'contain',
    marginBottom: -5,
  },
  navLogo: {
    // pending
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6EDFD',
  },
  section: {
    marginTop: 5,
    marginBottom: 10,
  },
  h1: {
    fontSize: 36,
    fontFamily: 'DMSans_700Bold',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 5,
  },
  h2: {
    fontSize: 26,
    // fontFamily: 'RobotoCondensed_700Bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  body: {
    fontSize: 18,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2D4278',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'DMSans_700Bold',
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