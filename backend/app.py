from flask import Flask, request, jsonify
from flask_cors import CORS
from algorithm import ShapeClassifier

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/process_data', methods=['POST'])
def process_data():
    try:
        # Get data from the request
        data = request.get_json()
        
        # Extract image and age from the received data
        image = data.get('image')
        age = data.get('age')

        ## Un-comment if you're using the web-based expo-verson:
        # image = image["assets"][0]["uri"]

        # Initiate class:
        model = ShapeClassifier()
        result = model.main(shapes_path=image, age_group=age)

        # Return the result as JSON
        return result
    

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port="0.0.0.0", debug=True)
