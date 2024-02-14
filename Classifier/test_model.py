import os
import tensorflow as tf
import numpy as np
import cv2
import matplotlib

IMG_WIDTH = 28  # Adjusted to match the expected input size
IMG_HEIGHT = 28  # Adjusted to match the expected input size
CLASSES = ["circle", "square", "triangle"]
ACTUAL = {"c": 0, "s": 1, "t": 2}


def preprocess_image(image_path):
    # Read the image in grayscale
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Resize to the input size expected by the model (e.g., 28x28)
    centered_image = cv2.resize(image, (28, 28), interpolation=cv2.INTER_AREA)

    # Invert colors if necessary
    centered_image = cv2.bitwise_not(centered_image)

    # Normalize the pixel values to match the model's expected input
    centered_image = centered_image.astype('float32') / 255.0

    # Reshape the image to include a batch dimension
    centered_image = centered_image.reshape((1, 28, 28, 1))

    return centered_image


def main():
    # Number of images correctly classified.
    ACCURACY = 0

    # Load the pre-trained model in SavedModel format.
    model = tf.keras.models.load_model('Model/my_model.h5')

    # Path to where the shapes are stored.
    shapes_path = "HD_Shapes"

    # Read the images
    for image in os.listdir(shapes_path):

        path = os.path.join(shapes_path, image)

        # Preprocess Image
        preprocessed = preprocess_image(path)

        # Make predictions
        predictions = model.predict(preprocessed)
        predicted_class_index = np.argmax(predictions)

        # Calculate Accuracy:
        for i, s in enumerate(ACTUAL):

            if s in image:
                ACCURACY += 1 if ACTUAL[s] == predicted_class_index else 0

                print(f"Image of {CLASSES[i].title()}, detected: {CLASSES[predicted_class_index]}. (File: {image})")

    print(f"\n Correct: {ACCURACY} / {len(os.listdir(shapes_path))}")
    print(f"\n Accuracy: {round(ACCURACY / len(os.listdir(shapes_path)) * 100)} %")

    # # Corrected plt.imshow() to display the image correctly
    # plt.imshow(image_array[0, :, :, 0], cmap='gray')
    # plt.show()


if __name__ == "__main__":
    main()
