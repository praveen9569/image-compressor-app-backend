from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Flask server is running!"

@app.route('/api/compress', methods=['POST'])
def compress_image():
    file = request.files['image']
    quality = int(request.form['quality'])

    img = Image.open(file.stream)

    # Convert RGBA to RGB to avoid JPEG crash
    if img.mode == 'RGBA':
        img = img.convert('RGB')

    img_io = io.BytesIO()
    img.save(img_io, 'JPEG', quality=quality)
    img_io.seek(0)

    return send_file(img_io, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
# To run the Flask server, use the command:
# python app.py
# Ensure you have Flask, Flask-CORS, and Pillow installed in your Python environment.
# You can install them using pip:
# pip install Flask Flask-CORS Pillow
# The server will run on http://