"""
RENDEREVAL Backend API
Flask server for image analysis and render evaluation
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from analyzer import RenderAnalyzer
from dotenv import load_dotenv
import os
import logging
from werkzeug.utils import secure_filename

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure upload settings
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp', 'tiff', 'exr'}
MAX_FILE_SIZE = 500 * 1024 * 1024  # 500MB

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Initialize analyzer
analyzer = RenderAnalyzer()

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def allowed_file(filename: str) -> bool:
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'RENDEREVAL Backend',
        'version': '1.0.0'
    })


@app.route('/api/analyze', methods=['POST'])
def analyze_image():
    """
    Analyze uploaded image
    
    Request body:
    - image: File upload
    - type: 'vfx' or 'animation'
    - settings: JSON with analysis settings (optional)
    
    Response:
    - overall_score: 0-100
    - metrics: Detailed analysis
    - status: APPROVED/REVISION_REQUIRED/REJECTED
    - recommendations: List of suggestions
    """
    try:
        # Check if image file exists
        if 'image' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No image file provided'
            }), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'error': f'File type not allowed. Allowed: {", ".join(ALLOWED_EXTENSIONS)}'
            }), 400
        
        # Get analysis type (default to 'vfx')
        analysis_type = request.form.get('type', 'vfx')
        if analysis_type not in ['vfx', 'animation']:
            analysis_type = 'vfx'
        
        # Read image data
        image_data = file.read()
        
        # Analyze image
        logger.info(f'Analyzing image: {file.filename} (type: {analysis_type})')
        result = analyzer.analyze_image(image_data, analysis_type)
        
        if result['success']:
            result['filename'] = secure_filename(file.filename)
            logger.info(f'Analysis complete: {result["overall_score"]}/100')
        else:
            logger.error(f'Analysis failed: {result.get("error")}')
        
        return jsonify(result)
    
    except Exception as e:
        logger.error(f'Error in analyze endpoint: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500


@app.route('/api/batch-analyze', methods=['POST'])
def batch_analyze():
    """
    Analyze multiple images
    
    Request body:
    - images: List of file uploads
    - type: 'vfx' or 'animation'
    
    Response:
    - results: List of analysis results
    - summary: Aggregated statistics
    """
    try:
        if 'images' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No images provided'
            }), 400
        
        files = request.files.getlist('images')
        analysis_type = request.form.get('type', 'vfx')
        
        results = []
        scores = []
        
        for file in files:
            if file and allowed_file(file.filename):
                image_data = file.read()
                result = analyzer.analyze_image(image_data, analysis_type)
                
                if result['success']:
                    result['filename'] = secure_filename(file.filename)
                    results.append(result)
                    scores.append(result['overall_score'])
        
        if not results:
            return jsonify({
                'success': False,
                'error': 'No valid images to analyze'
            }), 400
        
        # Calculate summary statistics
        summary = {
            'total_analyzed': len(results),
            'average_score': int(sum(scores) / len(scores)),
            'highest_score': max(scores),
            'lowest_score': min(scores),
            'passed': len([s for s in scores if s >= 85]),
            'needs_revision': len([s for s in scores if 70 <= s < 85]),
            'rejected': len([s for s in scores if s < 70])
        }
        
        logger.info(f'Batch analysis complete: {len(results)} images, avg score: {summary["average_score"]}')
        
        return jsonify({
            'success': True,
            'results': results,
            'summary': summary
        })
    
    except Exception as e:
        logger.error(f'Error in batch-analyze endpoint: {str(e)}')
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500


@app.route('/api/settings', methods=['GET'])
def get_settings():
    """Get analyzer settings and configuration"""
    return jsonify({
        'allowed_formats': list(ALLOWED_EXTENSIONS),
        'max_file_size_mb': MAX_FILE_SIZE / (1024 * 1024),
        'analysis_types': ['vfx', 'animation'],
        'metrics_available': [
            'resolution',
            'color_grading',
            'noise_level',
            'contrast',
            'composition',
            'artifacts',
            'type_quality'
        ]
    })


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large error"""
    return jsonify({
        'success': False,
        'error': f'File too large. Maximum size: {MAX_FILE_SIZE / (1024 * 1024)}MB'
    }), 413


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f'Internal server error: {str(error)}')
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500


if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', False) == 'True'
    
    logger.info(f'Starting RENDEREVAL Backend on port {port}')
    app.run(host='0.0.0.0', port=port, debug=debug)
