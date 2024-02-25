import { StyleSheet } from "react-native";

// Define styles
const styles = StyleSheet.create({
  // Splash screen styles
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FD',
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
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 10,
  },
  body: {
    fontSize: 18,
    fontFamily: 'DMSans_400Regular',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    marginBottom: 10,
    color: 'gray',
    textAlign: 'center'
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
    marginTop: 10,
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
  houseImage: {
    width: 290,
    height: 221,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
  stepContainer: {
    padding: 10,
  },
  // ***
  // Results styles
  resultsContainer: {
    padding: 20,
    backgroundColor: '#fff', // Assuming a light theme
  },
  resultsTitle: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    color: '#333',
    marginBottom: 10,
  },
  resultItem: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9', // Light background for each item
    borderRadius: 10, // Rounded corners for a modern look
    shadowColor: "#000", // Simple shadow for depth (optional)
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shapeName: {
    fontSize: 20,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 5, // Space between the shape name and its rating/feedback
  },
  rating: {
    fontSize: 18,
    fontFamily: 'DMSans_400Regular',
    color: '#666',
    marginBottom: 5,
  },
  feedback: {
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    color: '#444',
  },
});

export default styles;