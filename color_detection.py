import numpy as np
import cv2 as cv

MIN_BLUE = np.array([100, 100, 20], np.uint8)
MAX_BLUE = np.array([125, 255, 255], np.uint8)

def blue_detection(frame):
    frame_hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
    mask_blue = cv.inRange(frame_hsv, MIN_BLUE, MAX_BLUE)
    mask_blue_visual = cv.bitwise_and(frame, frame, mask=mask_blue)
    frame = mask_blue_visual
    return frame