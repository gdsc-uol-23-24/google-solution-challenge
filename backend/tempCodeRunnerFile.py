from flask import Flask, request, jsonify
from algorithm import ShapeClassifier

app = Flask(__name__)


@app.route('/api/process_data', methods=['POST'])
def process_data():
    try:
        # Get data from the request
        data = request.get_json()

        # Extract image and age from the received data
        image = data.get('image')
        age = data.get('age')

        # Initiate class:
        model = ShapeClassifier()
        result = model.main(shapes_path=image, age_group=age)

        # Return the result as JSON
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
