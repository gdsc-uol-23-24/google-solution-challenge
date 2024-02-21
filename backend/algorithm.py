import cv2
import base64
import numpy as np
import tensorflow as tf
import io
from io import BytesIO
from PIL import Image
from skimage import io as sio
from skimage import color
from skimage.util import img_as_ubyte
from skimage.measure import find_contours


class ShapeClassifier:
    def __init__(self):
        # Constants
        self.IMG_WIDTH = 28
        self.IMG_HEIGHT = 28
        self.CLASSES = ["circle", "square", "triangle"]

        # Contours:
        self.shapes = []

        # Shape name (key) : Rating (value)
        self.detected = {}

        # Age:
        self.age = {
            "3-4": self.CLASSES[0],
            "4-5": self.CLASSES[:2],
            "5-6": self.CLASSES[:],
            "6-7": self.CLASSES[:],
            "7-8": self.CLASSES[:],
            "8-9": self.CLASSES[:],
            "9-10": self.CLASSES[:]
        }

        # Load pre-trained models
        self.model = tf.keras.models.load_model('Models/class.h5')
        self.model_c = tf.keras.models.load_model('Models/circle.h5')
        self.model_s = tf.keras.models.load_model('Models/square.h5')
        self.model_t = tf.keras.models.load_model('Models/triangle.h5')

    def base64_to_png(self, base64_string):
        try:
            
            # Split the base64 string
            _, image_data = base64_string.split(',')

            # Decode the Base64 string to bytes
            image_bytes = base64.b64decode(image_data)

            # Create a BytesIO object from the decoded bytes
            image_buffer = io.BytesIO(image_bytes)

            # Open the image using PIL
            image = Image.open(image_buffer)

            image.show()

            return image
        except Exception as e:
            print(f"Error: {e}")
            return None

    def extraction(self, image_path, target_size=(28, 28)):

        # loading the image
        image = np.array(image_path)

        # check if the image has an alpha channel and remove it
        if image.shape[2] == 4:
            # removing alpha channel
            image = image[..., :3]

        # Convert the image to grayscale
        gray_image = color.rgb2gray(image)

        # invert the grayscale image to get black background and white lines
        inverted_image = 1 - gray_image

        # define a threshold to distinguish lines from the background
        threshold = 0.5

        # find contours at a constant value of 0.8
        contours = find_contours(inverted_image, level=threshold)

        # filter contours to avoid saving noise or very small artifacts as separate images
        filtered_contours = [contour for contour in contours if len(contour) > 100]

        print(len(filtered_contours))

        for n, contour in enumerate(filtered_contours):
            # find the bounding box around the contour
            min_row, max_row, min_col, max_col = (
                int(np.min(contour[:, 0])),
                int(np.max(contour[:, 0])),
                int(np.min(contour[:, 1])),
                int(np.max(contour[:, 1])),
            )

            # add a margin to the bounding box
            margin = 15
            min_row = max(0, min_row - margin)
            max_row = min(inverted_image.shape[0], max_row + margin)
            min_col = max(0, min_col - margin)
            max_col = min(inverted_image.shape[1], max_col + margin)

            # create a blank canvas with the same dimensions as the original image
            canvas = np.zeros_like(inverted_image, dtype=np.uint8)

            # rounding the contour coordinates and convert them to integer
            contour = np.round(contour).astype(int)

            # drawing the contour on the canvas in white
            canvas[contour[:, 0], contour[:, 1]] = 255

            # crop the region around the contour from the original inverted image
            cropped_contour = inverted_image[min_row:max_row, min_col:max_col]

            # resize the cropped region to the target size (28 by 28)
            resized_contour = Image.fromarray(img_as_ubyte(cropped_contour)).resize(target_size)

            # saving the resized contour as an image
            self.shapes.append(resized_contour)

    def preprocess_image(self, image_path):

        # Convert PIL Image to NumPy array
        image_array = np.array(image_path)

        # Resize to the input size expected by the model (e.g., 28x28)
        centered_image = cv2.resize(image_array, (self.IMG_WIDTH, self.IMG_HEIGHT), interpolation=cv2.INTER_AREA)

        # Normalize pixel values
        centered_image = centered_image.astype('float32') / 255.0

        # Reshape the image to include a batch dimension
        centered_image = centered_image.reshape((1, self.IMG_WIDTH, self.IMG_HEIGHT, 1))

        return centered_image

    def grade(self, index, image):

        # Initialise model
        model = None

        # Grading Model selection based on the class
        if self.CLASSES[index] in self.CLASSES:
            if self.CLASSES[index] == "circle":
                model = self.model_c
            elif self.CLASSES[index] == "square":
                model = self.model_s
            elif self.CLASSES[index] == "triangle":
                model = self.model_t

            # Make predictions using the selected model for rating:
            predictions = model.predict(image)
            predicted_class_index = np.argmax(predictions)

            return predicted_class_index

    def populate_json(self, age_group):

        # Initializing the JSON output
        json_output = {
            "age_group": age_group,
            "requirements_met": [],
            "additional_info": []
        }

        # Feedback for each shape (I will add new ones, let it be like this for now)
        feedback_dicts = {
            "circle": {
                0: "Circle 0",
                1: "Circle 1",
                2: "Circle 2"
            },
            "square": {
                0: "square 0",
                1: "square 1",
                2: "square 2"
            },
            "triangle": {
                0: "triangle 0",
                1: "triangle 1",
                2: "triangle 2"
            }
        }

        # Retrieving the shapes required for the specified age group
        required_shapes = self.age.get(age_group, [])

        # Loop over all the detected shapes
        for shape, rating in self.detected.items():
            feedback_dict = feedback_dicts[
                shape]  # Directly access the dictionary, assuming that our model rejected others
            entry = {
                "shape_name": shape,
                "rating": str(rating),
                "feedback": feedback_dict[rating]
            }

            if shape in required_shapes:
                json_output["requirements_met"].append(entry)
            else:
                json_output["additional_info"].append(entry)

        # Add shapes that are not detected:
        for shape in self.CLASSES:
            if shape not in self.detected:
                feedback_dict = feedback_dicts[
                    shape]
                entry = {
                    "shape_name": shape,
                    "rating": "0",
                    "feedback": feedback_dict[0]
                }

                if shape in required_shapes:
                    json_output["requirements_met"].append(entry)
                else:
                    json_output["additional_info"].append(entry)

        # Return the JSON output
        print(json_output)
        return json_output

    def main(self, shapes_path="path/to/your/shapes", age_group="3-4", confidence_threshold=0.6):

        # Step 0: Convert Base-64 to PNG:
        png = self.base64_to_png(shapes_path)

        # Step 1: Extract shapes from drawing:
        self.extraction(png)

        # Process each shape:
        for i, image in enumerate(self.shapes):
            # Convert PIL Image to PNG format in-memory
            png_buffer = BytesIO()
            image.save(png_buffer, format="PNG")

            # Read the PNG image from the buffer and preprocess it
            png_image = Image.open(png_buffer)
            preprocessed = self.preprocess_image(png_image)

            # Step 2: Make predictions using the main model to classify the shape:
            predictions = self.model.predict(preprocessed)
            predicted_class_index = np.argmax(predictions)

            if np.max(predictions) < confidence_threshold:
                continue  # Skip further processing for this image

            # Step 3: Make a grading prediction for the current shape:
            if self.CLASSES[predicted_class_index] not in self.detected:
                # Grade the drawing based on the predicted class
                graded_index = self.grade(predicted_class_index, preprocessed)

                # Add to the list of detected shapes:
                # Add shapes name as key, and the value as its rating:
                self.detected[self.CLASSES[predicted_class_index]] = graded_index

        # Return JSON:
        return self.populate_json(age_group)


if __name__ == "__main__":
    # Create an instance of the ShapeClassifier class and run the main method
    shape_classifier = ShapeClassifier()
    shape_classifier.main("sketch.png", "6-7")
