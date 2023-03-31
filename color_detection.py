import numpy as np
import cv2 as cv

MIN_BLUE = np.array([100, 100, 20], np.uint8)
MAX_BLUE = np.array([125, 255, 255], np.uint8)

MIN_RED_1 = np.array([0, 100, 20], np.uint8)
MAX_RED_1 = np.array([10, 255, 255], np.uint8)

MIN_RED_2 = np.array([170, 100, 20], np.uint8)
MAX_RED_2 = np.array([180, 255, 255], np.uint8)

MIN_YELLOW = np.array([28, 100, 20], np.uint8)
MAX_YELLOW = np.array([32, 255, 255], np.uint8)


def blue_detection(frame):
    frame_hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
    mask_blue = cv.inRange(frame_hsv, MIN_BLUE, MAX_BLUE)
    mask_blue_visual = cv.bitwise_and(frame, frame, mask=mask_blue)
    frame = mask_blue_visual
    return frame


def red_detection(frame):
    frame_hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
    mask_red_1 = cv.inRange(frame_hsv, MIN_RED_1, MAX_RED_1)
    mask_red_2 = cv.inRange(frame_hsv, MIN_RED_2, MAX_RED_2)
    mask_red = cv.add(mask_red_1, mask_red_2)
    mask_red_visual = cv.bitwise_and(frame, frame, mask=mask_red)
    frame = mask_red_visual
    return frame


def yellow_detection(frame):
    frame_hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
    mask_yellow = cv.inRange(frame_hsv, MIN_YELLOW, MAX_YELLOW)
    contours, hierarchy = cv.findContours(
        mask_yellow, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    cv.drawContours(frame, contours, -1, (255, 0, 0), 3)
    return frame
