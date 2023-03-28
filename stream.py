import cv2 as cv
import numpy as np

global switch, negative, grey, blue
switch = 1
negative = 0
grey = 0
blue = 0

CAM_ID = 0

cap = cv.VideoCapture(CAM_ID)

MIN_BLUE = np.array([100, 100, 20], np.uint8)
MAX_BLUE = np.array([125, 255, 255], np.uint8)


def gen_frames():
    while True:
        success, frame = cap.read()
        if success:
            if grey:
                frame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
            if negative:
                frame = cv.bitwise_not(frame)
            if blue:
                frame_hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
                mask_blue = cv.inRange(frame_hsv, MIN_BLUE, MAX_BLUE)
                mask_blue_visual = cv.bitwise_and(frame, frame, mask=mask_blue)
                frame = mask_blue_visual

            try:
                ret, buffer = cv.imencode('.jpg', cv.flip(frame, 1))
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            except Exception as e:
                pass
        else:
            pass
