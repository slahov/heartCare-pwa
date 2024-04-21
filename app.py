from flask import Flask, render_template, send_file, request
import numpy as np
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))


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


def convert_age(age):
    if age <= 24:
        return 1
    elif age >= 80:
        return 13
    else:
        return ((age - 24) // 5) + 2


# registration of predict function
@app.route('/predict', methods=['POST', 'GET'])
def predict():
    diffWalk = float(request.form['DiffWalk'])
    highBP = float(request.form['HighBP'])
    highChol = float(request.form['HighChol'])
    smoker = float(request.form['Smoker'])
    stroke = float(request.form['Stroke'])
    diabetes = float(request.form['Diabetes'])
    genHealth = float(request.form['GenHlth'])
    physHealth = float(request.form['PhysHlth'])
    age = float(request.form['Age'])
    income = float(request.form['Income'])

    age_ordinal = convert_age(age)
    features = np.array([
        [diffWalk, highBP, highChol, smoker, stroke, diabetes, genHealth, physHealth, age_ordinal, income]
    ])

    final = scaler.transform(features)
    prediction = model.predict_proba(final)
    output = int(round(prediction[0][1] * 100))
    return render_template('index.html', pred='Your risk of heart failure is {}%'.format(output), age_class=age_ordinal)


if __name__ == '__main__':
    app.run()
