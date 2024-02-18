import { StyleSheet } from "react-native";

// Define styles
const styles = StyleSheet.create({
  // Splash screen styles
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A4BBF4',
    padding: 20,
  },
  splashLogo: {
    width: 250, 
    height: 250, 
    resizeMode: 'contain',
    marginBottom: -5,
  },
  // ***
  // App header styles
  headerItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 50,
    height: 50,
    marginRight: 8,
    resizeMode: 'contain'
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'DMSans_700Bold',
    color: 'black',
  },
  // ***
  // Home screen styles
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  section: {
    marginTop: 5,
    marginBottom: 10,
  },
  // ***
  // Text styles
  h1: {
    fontSize: 36,
    fontFamily: 'DMSans_700Bold',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 5,
  },
  h2: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  body: {
    fontSize: 18,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
    marginBottom: 5,
  },
  // ***
  // Button styles
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
    fontSize: 18,
    fontFamily: 'DMSans_700Bold',
    color: 'white',
  },
  // ***
  // Image styles
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