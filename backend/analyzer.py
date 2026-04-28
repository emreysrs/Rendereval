"""
Image Analysis Module for RENDEREVAL
Analyzes render quality, composition, colors, and technical metrics
"""

import cv2
import numpy as np
from PIL import Image
import io
from typing import Dict, List, Tuple, Any
from scipy import stats


class RenderAnalyzer:
    """Analyze render images for VFX/Animation quality"""
    
    def __init__(self):
        self.min_resolution = (1920, 1080)
    
    def analyze_image(self, image_data: bytes, analysis_type: str = 'vfx') -> Dict[str, Any]:
        """
        Analyze render image and return detailed metrics
        
        Args:
            image_data: Image bytes
            analysis_type: 'vfx' or 'animation'
        
        Returns:
            Dictionary with analysis results
        """
        try:
            # Load image
            image = Image.open(io.BytesIO(image_data))
            cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            
            # Analyze different aspects
            resolution_score = self._analyze_resolution(cv_image)
            color_score = self._analyze_color_grading(cv_image)
            noise_score = self._analyze_noise(cv_image)
            contrast_score = self._analyze_contrast(cv_image)
            composition_score = self._analyze_composition(cv_image)
            artifacts_score = self._analyze_artifacts(cv_image)
            
            # Type-specific analysis
            if analysis_type == 'vfx':
                type_score = self._analyze_vfx_quality(cv_image)
            else:
                type_score = self._analyze_animation_quality(cv_image)
            
            # Calculate overall score
            scores = [
                resolution_score,
                color_score,
                noise_score,
                contrast_score,
                composition_score,
                artifacts_score,
                type_score
            ]
            overall_score = int(np.mean(scores))
            
            return {
                'success': True,
                'overall_score': overall_score,
                'metrics': {
                    'resolution': resolution_score,
                    'color_grading': color_score,
                    'noise_level': noise_score,
                    'contrast': contrast_score,
                    'composition': composition_score,
                    'artifacts': artifacts_score,
                    'type_quality': type_score
                },
                'status': self._get_status(overall_score),
                'recommendations': self._get_recommendations(
                    resolution_score, color_score, noise_score, 
                    contrast_score, composition_score, artifacts_score
                ),
                'details': {
                    'image_size': f"{cv_image.shape[1]}x{cv_image.shape[0]}",
                    'channels': cv_image.shape[2] if len(cv_image.shape) > 2 else 1,
                    'color_space': 'BGR'
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'overall_score': 0
            }
    
    def _analyze_resolution(self, image: np.ndarray) -> int:
        """Analyze image resolution quality (0-100)"""
        height, width = image.shape[:2]
        
        # Check against minimum resolution
        if width >= 3840 and height >= 2160:  # 4K
            return 100
        elif width >= 1920 and height >= 1080:  # Full HD
            return 85
        elif width >= 1280 and height >= 720:  # HD
            return 70
        else:
            return 50
    
    def _analyze_color_grading(self, image: np.ndarray) -> int:
        """Analyze color grading consistency (0-100)"""
        # Convert to HSV for better color analysis
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Analyze color distribution
        h, s, v = cv2.split(hsv)
        
        # Calculate standard deviation of each channel
        h_std = np.std(h)
        s_std = np.std(s)
        v_std = np.std(v)
        
        # Calculate score based on color consistency
        color_consistency = 100 - min(100, (h_std + s_std) / 3)
        brightness_consistency = 100 - min(100, v_std / 2.56)
        
        return int(np.mean([color_consistency, brightness_consistency]))
    
    def _analyze_noise(self, image: np.ndarray) -> int:
        """Analyze noise level in image (0-100, higher=less noise)"""
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply Laplacian operator to detect edges
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        noise_variance = np.var(laplacian)
        
        # Calculate noise score (inverse relationship)
        noise_score = 100 - min(100, noise_variance / 10)
        
        return int(max(0, noise_score))
    
    def _analyze_contrast(self, image: np.ndarray) -> int:
        """Analyze image contrast (0-100)"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Calculate contrast using standard deviation
        contrast = np.std(gray)
        
        # Normalize to 0-100 scale
        contrast_score = min(100, int((contrast / 127) * 100))
        
        return contrast_score
    
    def _analyze_composition(self, image: np.ndarray) -> int:
        """Analyze composition quality using edge detection (0-100)"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Detect edges
        edges = cv2.Canny(gray, 100, 200)
        
        # Calculate edge density (more edges = more detail)
        edge_density = np.sum(edges > 0) / (image.shape[0] * image.shape[1])
        
        # Score based on edge distribution
        composition_score = int(min(100, edge_density * 10000))
        
        return composition_score
    
    def _analyze_artifacts(self, image: np.ndarray) -> int:
        """Analyze render artifacts (0-100, higher=fewer artifacts)"""
        # Look for compression artifacts and banding
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Calculate histogram
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        hist = hist.flatten() / hist.sum()
        
        # Calculate entropy (measure of information content)
        entropy = -np.sum(hist[hist > 0] * np.log2(hist[hist > 0] + 1e-10))
        
        # Normalize entropy to 0-100 (8-bit image has max entropy of 8)
        artifact_score = int(min(100, (entropy / 8) * 100))
        
        return artifact_score
    
    def _analyze_vfx_quality(self, image: np.ndarray) -> int:
        """Analyze VFX-specific quality metrics"""
        # Check for compositing quality
        alpha_channel = None
        
        # Analyze color separation (important for VFX)
        b, g, r = cv2.split(image)
        
        color_separation = abs(int(np.mean(r)) - int(np.mean(b)))
        
        # Score based on color separation
        vfx_score = min(100, color_separation * 0.5)
        
        return int(vfx_score)
    
    def _analyze_animation_quality(self, image: np.ndarray) -> int:
        """Analyze animation-specific quality metrics"""
        # For animation, look for smooth color transitions
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Calculate gradient smoothness
        gradient_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
        gradient_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
        
        smoothness = 100 - min(100, np.mean([np.std(gradient_x), np.std(gradient_y)]) / 2)
        
        return int(smoothness)
    
    def _get_status(self, score: int) -> str:
        """Get status based on score"""
        if score >= 85:
            return 'APPROVED'
        elif score >= 70:
            return 'REVISION_REQUIRED'
        else:
            return 'REJECTED'
    
    def _get_recommendations(self, *scores) -> List[str]:
        """Generate recommendations based on scores"""
        recommendations = []
        
        resolution_score, color_score, noise_score, contrast_score, composition_score, artifacts_score = scores[:6]
        
        if resolution_score < 80:
            recommendations.append('Increase render resolution for better quality')
        
        if noise_score < 75:
            recommendations.append('Reduce noise level - consider more samples or denoising')
        
        if color_score < 75:
            recommendations.append('Improve color grading consistency')
        
        if contrast_score < 70:
            recommendations.append('Increase contrast for better visual impact')
        
        if composition_score < 70:
            recommendations.append('Review composition and framing')
        
        if artifacts_score < 75:
            recommendations.append('Reduce compression artifacts and banding')
        
        if not recommendations:
            recommendations.append('Excellent render quality!')
        
        return recommendations
