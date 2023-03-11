from turtle import title
from flask import(
    Flask, render_template, request,
    redirect, url_for, session
)
import numpy as np
from tensorflow import keras
import cv2
app = Flask(__name__)


def translate(pred):
    keywords = {0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F", 16: "G", 17: "H", 18: "I", 19: "J", 20: "K", 21: "L", 22: "M", 23: "N", 24: "O", 25: "P", 26: "Q", 27: "R", 28: "S", 29: "T", 30: "U",
                31: "V", 32: "W", 33: "X", 34: "Y", 35: "Z", 36: "a", 37: "b", 38: "c", 39: "d", 40: "e", 41: "f", 42: "g", 43: "h", 44: "i", 45: "j", 46: "k", 47: "l", 48: "m", 49: "n", 50: "o", 51: "p", 52: "q", 53: "r", 54: "s", 55: "t", 56: "u", 57: "v", 58: "w", 59: "x", 60: "y", 61: "z", }
    return keywords[pred]


@ app.route("/Can")
def canvas():
    return render_template("Canvas.html", title="Canvas", letter='')


@ app.route("/Can", methods=['POST'])
def CANpost():
    try:
        imglist = []
        pixels = []
        fin = []
        pixels = request.form['pixels']
        print("is of type", type(pixels))
        print("############################")
        pixels = pixels.split(',')
        for i in range(len(pixels)):
            pixels[i] = int(pixels[i])
        print("is of type", type(pixels))
        print(len(pixels))

        for i in range(8):
            n = 784*i
            l = n+784
            pixels1 = pixels[n:l]
            pixels1 = np.array(pixels1)
            if np.sum(pixels1) == 0:
                continue
            im = pixels1.reshape(28, 28, 1)
            imglist.append(im)

        imglist = np.array(imglist)

        imglist = imglist/255
        model = keras.models.load_model('model1_85-94.h5')
        predict = model.predict(imglist)
        for i in range(len(imglist)):
            prediction = predict[i].argmax()
            fin.append(translate(prediction))

        concatfin = ''.join(map(str, fin))
        print(concatfin)
        return render_template("Canvas.html", title="Canvas", letter=concatfin)
    except Exception as e:
        print(e)
        return render_template('Error.html')


@ app.route("/")
def guide():
    return render_template("Guide.html", title="Guide")


app.run(debug=True, port=5030)

# pixels1=pixels[:784]
# pixels2=pixels[784:1568]
# pixels3=pixels[1568:2352]
# pixels4=pixels[2352:3136]
# pixels5=pixels[3136:3920]
# pixels6=pixels[3920:4704]
# pixels7=pixels[4704:5488]
# pixels8=pixels[5488:6272]
# pixels1=np.array(pixels1)
# pixels2=np.array(pixels2)
# pixels3=np.array(pixels3)
# pixels4=np.array(pixels4)
# pixels5=np.array(pixels5)
# pixels6=np.array(pixels6)
# pixels7=np.array(pixels7)
# pixels8=np.array(pixels8)
# im1 = pixels1.reshape(28,28,1)
# im2 = pixels2.reshape(28,28,1)
# im3 = pixels3.reshape(28,28,1)
# im4 = pixels4.reshape(28,28,1)
# im5 = pixels5.reshape(28,28,1)
# im6 = pixels6.reshape(28,28,1)
# im7 = pixels7.reshape(28,28,1)
# im8 = pixels8.reshape(28,28,1)

# imglist.append(im1)
# imglist.append(im2)
# imglist.append(im3)
# imglist.append(im4)
# imglist.append(im5)
# imglist.append(im6)
# imglist.append(im7)
# imglist.append(im8)
