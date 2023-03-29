import cv2 as cv
import color_detection

global switch, negative, grey, blue
switch = 1
negative = 0
grey = 0
blue = 0

CAM_ID = 0

cap = cv.VideoCapture(CAM_ID)

def gen_frames():
    while True:
        success, frame = cap.read()
        if success:
            if grey:
                frame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
            if negative:
                frame = cv.bitwise_not(frame)
            if blue:
                frame = color_detection.blue_detection(frame=frame)
                
            try:
                ret, buffer = cv.imencode('.jpg', cv.flip(frame, 1))
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            except Exception as e:
                pass
        else:
            pass
