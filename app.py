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


# registration of subpage contact
@app.route('/contact.html')
def contact():
    return render_template("contact.html")


# registration of subpage installation
@app.route('/installation.html')
def installation():
    return render_template("installation.html")


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
    if request.method == 'POST':
        form = request.form

    diffWalk = 1 if 'DiffWalk' in form else 0
    highBP = 1 if 'HighBP' in form else 0
    highChol = 1 if 'HighChol' in form else 0
    smoker = 1 if 'smoker' in form else 0
    stroke = 1 if 'stroke' in form else 0
    diabetes = float(form['diabetes'])
    genHealth = float(form['GenHlth'])
    physHealth = float(form['PhysHlth'])
    age = form['age']
    income = float(form['Income'])

    age_ordinal = convert_age(age)
    features = np.array([
        [diffWalk, highBP, highChol, smoker, stroke, diabetes, genHealth, physHealth, age_ordinal, income]
    ])

    final = scaler.transform(features)
    prediction = model.predict_proba(final)
    output = '{0:.{1}f}'.format(prediction[0][1], 2)
    # return render_template('index.html', pred='Your risk of heart failure is {}'.format(output))
    output = int(round(prediction[0][1] * 100))
    return render_template('predict.html', pred='Your risk of heart failure is {}%'.format(output), age_class=age_ordinal)


if __name__ == '__main__':
    app.run()
