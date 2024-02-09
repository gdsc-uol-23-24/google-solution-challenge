import cv2
import numpy as np

def calculate_angle(pt1, pt2, pt0):
    dx1 = pt1[0] - pt0[0]
    dy1 = pt1[1] - pt0[1]
    dx2 = pt2[0] - pt0[0]
    dy2 = pt2[1] - pt0[1]
    angle = (dx1*dx2 + dy1*dy2) / (np.sqrt((dx1*dx1 + dy1*dy1) * (dx2*dx2 + dy2*dy2)) + 1e-10)
    return angle

def calculate_angle_precision(image_path, shape):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150, apertureSize=3)

    contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Loop through contours and calculate angle precision for each
    for cnt in contours:
        epsilon = 0.02 * cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, epsilon, True)

        if (shape == 'square' and len(approx) == 4) or (shape == 'triangle' and len(approx) == 3):
            angles = []
            for i in range(len(approx)):
                pt1 = approx[i][0]
                pt2 = approx[(i + 1) % len(approx)][0]
                pt0 = approx[(i - 1) % len(approx)][0]

                cosine_angle = calculate_angle(pt1, pt2, pt0)
                angle = np.arccos(cosine_angle)
                angle = np.degrees(angle)
                angles.append(angle)

            # Calculate how precise the angles are to 90 degrees
            if shape == 'square':
                precision = np.mean([abs(90 - angle) for angle in angles])
            elif shape == 'triangle':
                # For triangles, we can't assume the angles are close to 90 degrees.
                # Here you might define precision differently, perhaps based on equilateral triangle angles (60 degrees).
                precision = np.mean([abs(60 - angle) for angle in angles])
            else:
                precision = None

            return precision
    return None

# Example usage:
precision = calculate_angle_precision('path/to/image.jpg', 'square')
if precision is not None:
    print(f"The precision of the square is: {precision} degrees from 90")
else:
    print("No square detected")
