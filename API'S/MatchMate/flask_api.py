from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from action_api import analyze_with_mediapipe
from flask_cors import CORS

app = Flask(__name__)
UPLOAD_FOLDER = 'Uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB limit
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return '✅ Flask is running!'

@app.route('/Uploads/<filename>', methods=['GET'])
def serve_uploaded_file(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    print(f"📤 Attempting to serve file: {file_path}")
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return jsonify({'error': 'File not found'}), 404
    print(f"📬 Serving file: {file_path}")
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/analyze', methods=['POST'])
def analyze_video():
    if 'video' not in request.files:
        print("❌ No video uploaded")
        return jsonify({'error': 'No video uploaded'}), 400

    video = request.files['video']
    bowler_type = request.form.get('bowler_type', 'fast')
    filename = secure_filename(video.filename)
    if not filename.endswith('.mp4'):
        print("❌ Invalid file format")
        return jsonify({'error': 'Only MP4 videos are supported'}), 400

    filepath = os.path.join(UPLOAD_FOLDER, filename)
    print(f"💾 Saving video to: {filepath}")

    try:
        video.save(filepath)
        result, output_path, max_angle = analyze_with_mediapipe(filepath, bowler_type)
        response = {
            'result': result,
            'max_angle': max_angle
        }
        if output_path and os.path.exists(output_path):
            video_url = f"/Uploads/{os.path.basename(output_path)}"
            response['video_url'] = video_url
            print(f"📬 Returning video_url: {video_url}")
        else:
            print("❌ No processed video generated")
            response['video_url'] = None
        return jsonify(response), 200
    except Exception as e:
        print(f"🔥 Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(filepath):
            print(f"🗑️ Removing uploaded file: {filepath}")
            os.remove(filepath)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)