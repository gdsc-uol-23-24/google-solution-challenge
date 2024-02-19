import cv2
import numpy as np
import tensorflow as tf
from io import BytesIO
from PIL import Image
from skimage import io, color
from skimage.util import img_as_ubyte
from skimage.measure import find_contours


class ShapeClassifier:
    def __init__(self):
        # Constants
        self.IMG_WIDTH = 28
        self.IMG_HEIGHT = 28
        self.CLASSES = ["circle", "square", "triangle"]

        # Accuracy:
        self.ACTUAL = {"c": 0, "s": 1, "t": 2}
        self.SHAPE_ACCURACY = 0
        self.RATE_ACCURACY = 0

        # Shapes:
        self.shapes = []
        self.detected = []

        # Load pre-trained models
        self.model = tf.keras.models.load_model('Models/class.h5')
        self.model_c = tf.keras.models.load_model('Models/circle.h5')
        self.model_s = tf.keras.models.load_model('Models/square.h5')
        self.model_t = tf.keras.models.load_model('Models/triangle.h5')

    def extraction(self, image_path, target_size=(28, 28)):

        # loading the image
        image = io.imread(image_path)

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

            # Make predictions using the selected model
            predictions = model.predict(image)
            predicted_class_index = np.argmax(predictions)

            return predicted_class_index
        else:
            return -1

    def calculate_accuracy(self, image_name, shape_index, grade_index):
        # Calculate accuracy based on the actual class and predicted class
        for s, i in self.ACTUAL.items():
            if s in image_name:
                self.SHAPE_ACCURACY += 1 if i == shape_index else 0

        # Calculate accuracy based on the actual grade and predicted grade
        for s, i in self.ACTUAL.items():
            if str(i) in image_name:
                self.RATE_ACCURACY += 1 if i == grade_index else 0

    def main(self, shapes_path="path/to/your/shapes", confidence_threshold=0.5):

        self.extraction(shapes_path)

        # Process each image
        for i, image in enumerate(self.shapes):
            # Convert PIL Image to PNG format in-memory
            png_buffer = BytesIO()
            image.save(png_buffer, format="PNG")

            # Read the PNG image from the buffer and preprocess it
            png_image = Image.open(png_buffer)
            preprocessed = self.preprocess_image(png_image)

            # Make predictions using the main model
            predictions = self.model.predict(preprocessed)
            predicted_class_index = np.argmax(predictions)

            if np.max(predictions) < confidence_threshold:
                print(f"Image {i + 1}: Rejected - Low confidence in all classes.")
                continue  # Skip further processing for this image

            if self.CLASSES[predicted_class_index] not in self.detected:
                # Grade the drawing based on the predicted class
                graded_index = self.grade(predicted_class_index, preprocessed)

                # Add to the list of detected shapes:
                self.detected.append(self.CLASSES[predicted_class_index])

                # Calculate accuracy and print results
                if graded_index != -1:
                    print(
                        f"Image {i + 1}: \n"
                        f"Predicted Shape: {self.CLASSES[predicted_class_index].title()}.\n"
                        f"Predicted Grade: {graded_index}.")
            else:
                print(f"Shape: {self.CLASSES[predicted_class_index]} already detected.")

        # # Print final accuracy results
        # print(f"\n Shape Correctness: {self.SHAPE_ACCURACY} / {len(os.listdir(shapes_path))}")
        # print(f"\n Shape Accuracy: {round(self.SHAPE_ACCURACY / len(os.listdir(shapes_path)) * 100)} %")
        #
        # print(f"\n Grade Correctness: {self.RATE_ACCURACY} / {len(os.listdir(shapes_path))}")
        # print(f"\n Grade Accuracy: {round(self.RATE_ACCURACY / len(os.listdir(shapes_path)) * 100)} %")


if __name__ == "__main__":
    # Create an instance of the ShapeClassifier class and run the main method
    shape_classifier = ShapeClassifier()
    shape_classifier.main("sketch_hd_2.jpg", confidence_threshold=0.7)
