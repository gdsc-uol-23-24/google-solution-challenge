import numpy as np
import tensorflow as tf
from keras import layers, models
from sklearn.model_selection import train_test_split
from keras.utils import to_categorical
import os

# Dataset used: https://console.cloud.google.com/storage/browser/_details/quickdraw_dataset/full/numpy_bitmap/circle.npy;tab=live_object
# Dataset used: https://console.cloud.google.com/storage/browser/_details/quickdraw_dataset/full/numpy_bitmap/square.npy;tab=live_object
# Dataset used: https://console.cloud.google.com/storage/browser/_details/quickdraw_dataset/full/numpy_bitmap/triangle.npy;tab=live_object


# Function to load and process data
def load_and_process_data(directory, shapes, limit=None, img_size=(28, 28)):
    data = []
    labels = []

    for index, shape in enumerate(shapes):
        file_path = os.path.join(directory, f'{shape}.npy')
        if os.path.exists(file_path):
            shape_data = np.load(file_path)
            if limit:
                shape_data = shape_data[:limit]
            shape_data = shape_data.astype('float32') / 255.0
            shape_data = np.reshape(shape_data, (-1, img_size[0], img_size[1], 1))
            data.append(shape_data)
            labels.append(np.full(shape_data.shape[0], index))
        else:
            print(f"File for {shape} not found in {directory}")

    if not data:
        raise ValueError("No data loaded. Check the directory and shape names.")

    X = np.concatenate(data, axis=0)
    y = np.concatenate(labels, axis=0)
    y = to_categorical(y, len(shapes))

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, X_test, y_train, y_test


# Load the data
directory = "PATH TO .NPY FILE FOR SHAPES"  # Update this path
shapes = ['circle', 'square', 'triangle']
X_train, X_test, y_train, y_test = load_and_process_data(directory, shapes, limit=10000, img_size=(28, 28))

print(len(X_train))

# Define the CNN model
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
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
history = model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))

# Evaluate the model
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
print(f"Test accuracy: {test_acc}")

model.save("Model/my_model.h5")
