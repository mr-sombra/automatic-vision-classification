from flask import Flask, render_template, Response, request
import stream

app = Flask(__name__, template_folder='./templates', static_folder='./templates/static')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    return Response(stream.gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/requests', methods=['POST', 'GET'])
def tasks():
    stream.switch, stream.cap
    if request.method == 'POST':
        if request.form.get('grey') == 'Grey':
            stream.grey
            stream.grey = not stream.grey
        elif request.form.get('negative') == 'Negative':
            stream.negative
            stream.negative = not stream.negative
        elif request.form.get('stop') == 'Stop/Start':
            if (stream.switch == 1):
                stream.switch = 0
                stream.cap.release()
                stream.cv.destroyAllWindows()
            else:
                stream.cap = stream.cv.VideoCapture(stream.CAM_ID)
                stream.switch = 1

    elif request.method == 'GET':
        return render_template('index.html')
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)

stream.cap.release()
stream.cv.destroyAllWindows()
