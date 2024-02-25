import numpy as np
from keras import layers, models
from sklearn.model_selection import train_test_split
from keras.utils import to_categorical
import os
import cv2

# https://console.cloud.google.com/storage/browser/_details/quickdraw_dataset/full/numpy_bitmap/triangle.npy;tab=live_object

def preprocess_image(image_path):
    # Read the image in grayscale
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Resize to the input size expected by the model (e.g., 28x28)
    centered_image = cv2.resize(image, (28, 28), interpolation=cv2.INTER_AREA)

    # Normalize the pixel values to match the model's expected input
    centered_image = centered_image.astype('float32') / 255.0

    # Reshape the image to include a batch dimension
    centered_image = centered_image.reshape((28, 28, 1))

    return centered_image


# Function to load and process data
def load_and_process_data(directory, shapes, limit=None, img_size=(28, 28)):
    data = []
    labels = []

    for index, shape in enumerate(shapes):
        subdirectory = os.path.join(directory, f't_{index}')
        if os.path.exists(subdirectory):
            for filename in os.listdir(subdirectory):
                if filename.endswith(".png"):
                    image_path = os.path.join(subdirectory, filename)
                    shape_data = preprocess_image(image_path)
                    data.append(shape_data)
                    labels.append(index)
                    if limit and len(data) >= limit:
                        break
        else:
            print(f"Directory for t_{index} not found in {directory}")

    if not data:
        raise ValueError("No data loaded. Check the directory and shape names.")

    X = np.array(data)
    y = np.array(labels)
    y = to_categorical(y, len(shapes))

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, X_test, y_train, y_test


# Load the data
directory = "UPDATE THE PATH TO .NPY FILE"  # Update this path
shapes = ['0', '1', '2']
X_train, X_test, y_train, y_test = load_and_process_data(directory, shapes, img_size=(28, 28))

# Define the CNN model
model = models.Sequential([
    layers.Conv2D(64, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(3, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
history = model.fit(X_train, y_train, epochs=15, validation_data=(X_test, y_test))

# Evaluate the model
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
print(f"Test accuracy: {test_acc}")

model.save("Model/triangle.h5")
