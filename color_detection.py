import numpy as np
import cv2 as cv

MIN_BLUE = np.array([100, 100, 20], np.uint8)
MAX_BLUE = np.array([125, 255, 255], np.uint8)

MIN_RED_1 = np.array([0, 100, 20], np.uint8)
MAX_RED_1 = np.array([10, 255, 255], np.uint8)

MIN_RED_2 = np.array([170, 100, 20], np.uint8)
MAX_RED_2 = np.array([180, 255, 255], np.uint8)

MIN_YELLOW = np.array([15, 100, 20], np.uint8)
MAX_YELLOW = np.array([45, 255, 255], np.uint8)


def blue_detection(frame):
    frame_hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
    mask_blue = cv.inRange(frame_hsv, MIN_BLUE, MAX_BLUE)
    contours, _ = cv.findContours(mask_blue,
                                  cv.RETR_EXTERNAL,
                                  cv.CHAIN_APPROX_SIMPLE)
    for i in contours:
        area = cv.contourArea(i)
        if area > 3000:
            x, y, w, h = cv.boundingRect(i)
            cv.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 3)
    # mask_blue_visual = cv.bitwise_and(frame, frame, mask=mask_blue)
    return frame


def red_detection(frame):
    frame_hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
    mask_red_1 = cv.inRange(frame_hsv, MIN_RED_1, MAX_RED_1)
    mask_red_2 = cv.inRange(frame_hsv, MIN_RED_2, MAX_RED_2)
    mask_red = cv.bitwise_or(mask_red_1, mask_red_2)
    contours, _ = cv.findContours(mask_red,
                                  cv.RETR_EXTERNAL,
                                  cv.CHAIN_APPROX_SIMPLE)
    for i in contours:
        area = cv.contourArea(i)
        if area > 3000:
            x, y, w, h = cv.boundingRect(i)
            cv.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 3)
    # mask_red_visual = cv.bitwise_and(frame, frame, mask=mask_red)
    return frame


def yellow_detection(frame):
    frame_hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
    mask_yellow = cv.inRange(frame_hsv, MIN_YELLOW, MAX_YELLOW)
    contours, _ = cv.findContours(mask_yellow,
                                  cv.RETR_EXTERNAL,
                                  cv.CHAIN_APPROX_SIMPLE)
    for i in contours:
        area = cv.contourArea(i)
        if area > 3000:
            x, y, w, h = cv.boundingRect(i)
            cv.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 3)
    return frame
