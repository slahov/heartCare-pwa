from flask import Flask, render_template, send_file, request
import numpy as np
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pk1', 'rb'))


@app.route('/')
def index():
    return render_template("index.html")


# registration of manifest file
@app.route('/manifest.json')
def serve_manifest():
    return send_file('manifest.json', mimetype='application/manifest+json')


# registration of file with service workers
@app.route('/sw.js')
def serve_sw():
    return send_file('sw.js', mimetype='application/javascript')


# registration of predict function
@app.route('/predict', methods=['POST', 'GET'])
def predict():
    int_features = [int(x) for x in request.form.values()]
    final = [np.array(int_features)]
    prediction = model.predict_proba(final)
    output = '{0:.{1}f}'.format(prediction[0][1], 2)
    return render_template('index.html', pred='Your risk of heart failure is {}'.format(output))


if __name__ == '__main__':
    app.run()
