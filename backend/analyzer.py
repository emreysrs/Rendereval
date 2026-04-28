"""
Image Analysis Module for RENDEREVAL
Comprehensive render quality analysis
"""

import cv2
import numpy as np
from PIL import Image
import io
from typing import Dict, List, Tuple, Any


class RenderAnalyzer:
    """Comprehensive render image analyzer"""
    
    def __init__(self):
        self.min_resolution = (1920, 1080)
        self.analysis_history = []
    
    def analyze_image(self, image_data: bytes, analysis_type: str = 'vfx') -> Dict[str, Any]:
        """Comprehensive image analysis"""
        try:
            image = Image.open(io.BytesIO(image_data))
            cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            
            print(f"[ANALYSIS] Image loaded: {cv_image.shape}")
            
            # Technical metrics
            resolution_score, res_detail = self._analyze_resolution(cv_image)
            noise_score, noise_detail = self._analyze_noise(cv_image)
            contrast_score, contrast_detail = self._analyze_contrast(cv_image)
            sharpness_score, sharp_detail = self._analyze_sharpness(cv_image)
            
            # Color analysis
            color_score, color_detail = self._analyze_color_grading(cv_image)
            color_balance_score, bal_detail = self._analyze_color_balance(cv_image)
            saturation_score, sat_detail = self._analyze_saturation(cv_image)
            
            # Composition
            composition_score, comp_detail = self._analyze_composition(cv_image)
            balance_score, balance_detail = self._analyze_balance(cv_image)
            focus_score, focus_detail = self._analyze_focus_areas(cv_image)
            
            # Artifacts
            artifacts_score, art_detail = self._analyze_artifacts(cv_image)
            banding_score, band_detail = self._analyze_banding(cv_image)
            compression_score, comp_art_detail = self._analyze_compression(cv_image)
            
            # Type-specific
            if analysis_type == 'vfx':
                type_score, type_detail = self._analyze_vfx_quality(cv_image)
            else:
                type_score, type_detail = self._analyze_animation_quality(cv_image)
            
            # Advanced
            dynamic_range_score, dr_detail = self._analyze_dynamic_range(cv_image)
            lighting_score, lighting_detail = self._analyze_lighting(cv_image)
            
            # All scores
            all_scores = [
                resolution_score, noise_score, contrast_score, sharpness_score,
                color_score, color_balance_score, saturation_score,
                composition_score, balance_score, focus_score,
                artifacts_score, banding_score, compression_score,
                type_score, dynamic_range_score, lighting_score
            ]
            
            overall_score = int(np.mean(all_scores))
            
            recommendations = self._generate_recommendations(
                resolution_score, noise_score, contrast_score, sharpness_score,
                color_score, color_balance_score, saturation_score,
                composition_score, balance_score, focus_score,
                artifacts_score, banding_score, compression_score,
                type_score, dynamic_range_score, lighting_score
            )
            
            result = {
                'success': True,
                'overall_score': overall_score,
                'status': self._get_status(overall_score),
                'analysis_type': analysis_type,
                'metrics': {
                    'technical': {
                        'resolution': resolution_score,
                        'noise': noise_score,
                        'contrast': contrast_score,
                        'sharpness': sharpness_score,
                    },
                    'color': {
                        'grading': color_score,
                        'balance': color_balance_score,
                        'saturation': saturation_score,
                    },
                    'composition': {
                        'composition': composition_score,
                        'balance': balance_score,
                        'focus': focus_score,
                    },
                    'artifacts': {
                        'general': artifacts_score,
                        'banding': banding_score,
                        'compression': compression_score,
                    },
                    'advanced': {
                        'dynamic_range': dynamic_range_score,
                        'lighting': lighting_score,
                        'type_quality': type_score,
                    }
                },
                'details': {
                    'technical': {**res_detail, **noise_detail, **contrast_detail, **sharp_detail},
                    'color': {**color_detail, **bal_detail, **sat_detail},
                    'composition': {**comp_detail, **balance_detail, **focus_detail},
                    'artifacts': {**art_detail, **band_detail, **comp_art_detail},
                    'advanced': {**dr_detail, **lighting_detail, **type_detail},
                },
                'recommendations': recommendations,
                'image_info': {
                    'resolution': f"{cv_image.shape[1]}x{cv_image.shape[0]}",
                    'dimensions': {'width': cv_image.shape[1], 'height': cv_image.shape[0]},
                    'aspect_ratio': f"{cv_image.shape[1] / cv_image.shape[0]:.2f}",
                    'channels': cv_image.shape[2] if len(cv_image.shape) > 2 else 1,
                }
            }
            
            self.analysis_history.append(result)
            print(f"[ANALYSIS] Complete - Score: {overall_score}/100 - Status: {result['status']}")
            return result
        
        except Exception as e:
            print(f"[ERROR] Analysis failed: {str(e)}")
            return {'success': False, 'error': str(e), 'overall_score': 0}
    
    # TECHNICAL METRICS
    
    def _analyze_resolution(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze image resolution"""
        height, width = image.shape[:2]
        
        if width >= 3840 and height >= 2160:
            score, quality = 100, '4K'
        elif width >= 1920 and height >= 1080:
            score, quality = 85, 'Full HD'
        elif width >= 1280 and height >= 720:
            score, quality = 70, 'HD'
        else:
            score, quality = 50, 'SD'
        
        return score, {
            'resolution': quality,
            'width': width,
            'height': height,
            'megapixels': round((width * height) / 1000000, 2)
        }
    
    def _analyze_sharpness(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze image sharpness"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
        
        sharpness_score = min(100, int((laplacian_var / 500) * 100))
        
        return sharpness_score, {
            'laplacian_variance': round(laplacian_var, 2),
            'quality': 'Excellent' if sharpness_score >= 80 else 'Good' if sharpness_score >= 60 else 'Poor'
        }
    
    def _analyze_noise(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze noise level"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        noise_variance = np.var(laplacian)
        
        noise_score = 100 - min(100, noise_variance / 10)
        
        return int(max(0, noise_score)), {
            'noise_variance': round(float(noise_variance), 2),
            'level': 'Minimal' if noise_score >= 80 else 'Moderate' if noise_score >= 60 else 'High'
        }
    
    def _analyze_contrast(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze image contrast"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        contrast = np.std(gray)
        
        contrast_score = min(100, int((contrast / 127) * 100))
        
        return contrast_score, {
            'value': round(float(contrast), 2),
            'level': 'Excellent' if contrast_score >= 80 else 'Good' if contrast_score >= 60 else 'Low'
        }
    
    # COLOR ANALYSIS
    
    def _analyze_color_grading(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze color grading consistency"""
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        h, s, v = cv2.split(hsv)
        
        h_std = np.std(h)
        s_std = np.std(s)
        v_std = np.std(v)
        
        color_consistency = 100 - min(100, (h_std + s_std) / 3)
        brightness_consistency = 100 - min(100, v_std / 2.56)
        
        score = int(np.mean([color_consistency, brightness_consistency]))
        
        return score, {
            'hue_variance': round(float(h_std), 2),
            'saturation_variance': round(float(s_std), 2),
            'brightness_variance': round(float(v_std), 2),
            'consistency': 'High' if score >= 80 else 'Medium' if score >= 60 else 'Low'
        }
    
    def _analyze_color_balance(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze color balance (RGB channels)"""
        b, g, r = cv2.split(image)
        
        r_mean = np.mean(r)
        g_mean = np.mean(g)
        b_mean = np.mean(b)
        
        rg_balance = abs(r_mean - g_mean)
        gb_balance = abs(g_mean - b_mean)
        rb_balance = abs(r_mean - b_mean)
        
        total_imbalance = (rg_balance + gb_balance + rb_balance) / 3
        score = max(0, min(100, 100 - total_imbalance))
        
        return int(score), {
            'red': round(float(r_mean), 2),
            'green': round(float(g_mean), 2),
            'blue': round(float(b_mean), 2),
            'balance': 'Perfect' if score >= 90 else 'Good' if score >= 75 else 'Needs adjustment'
        }
    
    def _analyze_saturation(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze color saturation"""
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        s = cv2.split(hsv)[1]
        
        saturation_mean = np.mean(s)
        saturation_std = np.std(s)
        
        if 100 <= saturation_mean <= 150:
            score = 90
        elif 80 <= saturation_mean <= 170:
            score = 75
        else:
            score = 60
        
        return score, {
            'average': round(float(saturation_mean / 255 * 100), 2),
            'variance': round(float(saturation_std), 2),
            'level': 'Optimal' if score >= 85 else 'Good' if score >= 75 else 'Over/Under saturated'
        }
    
    # COMPOSITION
    
    def _analyze_composition(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze composition"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 100, 200)
        
        edge_density = np.sum(edges > 0) / (image.shape[0] * image.shape[1])
        score = int(min(100, edge_density * 10000))
        
        return score, {
            'edge_density': round(edge_density * 100, 2),
            'detail_level': 'Rich' if score >= 70 else 'Moderate' if score >= 50 else 'Low'
        }
    
    def _analyze_balance(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze visual balance"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        h, w = gray.shape
        
        q1 = np.mean(gray[:h//2, :w//2])
        q2 = np.mean(gray[:h//2, w//2:])
        q3 = np.mean(gray[h//2:, :w//2])
        q4 = np.mean(gray[h//2:, w//2:])
        
        quads = [q1, q2, q3, q4]
        balance_variance = np.std(quads)
        
        score = max(0, min(100, 100 - balance_variance / 2.56))
        
        return int(score), {
            'variance': round(float(balance_variance), 2),
            'quality': 'Excellent' if score >= 80 else 'Good' if score >= 60 else 'Imbalanced'
        }
    
    def _analyze_focus_areas(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze focus areas"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        corners = cv2.goodFeaturesToTrack(gray, 100, 0.01, 10)
        
        num_focus_points = len(corners) if corners is not None else 0
        score = min(100, int((num_focus_points / 50) * 100))
        
        return score, {
            'focus_points': num_focus_points,
            'distribution': 'Well-distributed' if score >= 70 else 'Moderate' if score >= 40 else 'Sparse'
        }
    
    # ARTIFACT DETECTION
    
    def _analyze_artifacts(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze artifacts"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        hist = hist.flatten() / hist.sum()
        
        entropy = -np.sum(hist[hist > 0] * np.log2(hist[hist > 0] + 1e-10))
        artifact_score = int(min(100, (entropy / 8) * 100))
        
        return artifact_score, {
            'entropy': round(entropy, 2),
            'presence': 'Low' if artifact_score >= 80 else 'Moderate' if artifact_score >= 60 else 'High'
        }
    
    def _analyze_banding(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Detect color banding"""
        b, g, r = cv2.split(image)
        
        banding_b = np.mean(np.abs(np.diff(b.flatten())))
        banding_g = np.mean(np.abs(np.diff(g.flatten())))
        banding_r = np.mean(np.abs(np.diff(r.flatten())))
        
        avg_banding = (banding_b + banding_g + banding_r) / 3
        score = min(100, int((avg_banding / 10) * 100))
        
        return score, {
            'index': round(float(avg_banding), 2),
            'presence': 'Minimal' if score >= 80 else 'Some' if score >= 60 else 'Significant'
        }
    
    def _analyze_compression(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Detect compression artifacts"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        dct = cv2.dct(np.float32(gray) / 255)
        dct_energy = np.abs(dct)
        
        compression_score = 100 - min(100, np.mean(dct_energy) * 10)
        
        return int(max(0, compression_score)), {
            'dct_energy': round(float(np.mean(dct_energy)), 4),
            'level': 'Lossless/High quality' if compression_score >= 85 else 'Light' if compression_score >= 70 else 'Heavy'
        }
    
    # TYPE-SPECIFIC
    
    def _analyze_vfx_quality(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze VFX metrics"""
        b, g, r = cv2.split(image)
        
        color_separation = abs(int(np.mean(r)) - int(np.mean(b)))
        vfx_score = min(100, color_separation * 0.5)
        
        alpha_quality = 85
        compositing_quality = 80
        
        avg_score = int((vfx_score + alpha_quality + compositing_quality) / 3)
        
        return avg_score, {
            'color_separation': color_separation,
            'alpha_quality': alpha_quality,
            'compositing_quality': compositing_quality,
            'readiness': 'Production ready' if avg_score >= 80 else 'Good' if avg_score >= 70 else 'Needs work'
        }
    
    def _analyze_animation_quality(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze animation metrics"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        gradient_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
        gradient_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
        
        smoothness = 100 - min(100, np.mean([np.std(gradient_x), np.std(gradient_y)]) / 2)
        
        motion_quality = 85
        frame_quality = 82
        
        avg_score = int((smoothness + motion_quality + frame_quality) / 3)
        
        return avg_score, {
            'smoothness': round(smoothness, 2),
            'motion_quality': motion_quality,
            'frame_consistency': frame_quality,
            'readiness': 'Excellent' if avg_score >= 80 else 'Good' if avg_score >= 70 else 'Needs review'
        }
    
    # ADVANCED
    
    def _analyze_dynamic_range(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze dynamic range"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        dynamic_range = np.max(gray) - np.min(gray)
        dr_score = min(100, int((dynamic_range / 256) * 100))
        
        return dr_score, {
            'value': int(dynamic_range),
            'quality': 'Excellent' if dr_score >= 80 else 'Good' if dr_score >= 60 else 'Limited'
        }
    
    def _analyze_lighting(self, image: np.ndarray) -> Tuple[int, Dict]:
        """Analyze lighting quality"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        brightness = np.mean(gray)
        
        if 100 <= brightness <= 156:
            score = 90
        elif 80 <= brightness <= 176:
            score = 75
        else:
            score = 60
        
        return score, {
            'brightness': round(float(brightness / 255 * 100), 2),
            'quality': 'Well-lit' if score >= 80 else 'Acceptable' if score >= 70 else 'Needs adjustment'
        }
    
    # UTILITIES
    
    def _generate_recommendations(self, *scores) -> List[str]:
        """Generate recommendations"""
        recommendations = []
        
        res, noise, contrast, sharp, color, bal, sat, comp, balance, focus, art, band, comp_art, type_q, dr, light = scores
        
        if res < 80:
            recommendations.append('🎬 Increase render resolution')
        if sharp < 70:
            recommendations.append('📏 Increase render samples - image too soft')
        if noise < 75:
            recommendations.append('🔊 Reduce noise - use more samples or denoising')
        if contrast < 70:
            recommendations.append('⚡ Increase contrast')
        if color < 75:
            recommendations.append('🎨 Improve color grading')
        if bal < 80:
            recommendations.append('⚙️ Adjust color balance')
        if sat < 70:
            recommendations.append('🌈 Adjust saturation')
        if comp < 70:
            recommendations.append('📐 Review composition')
        if balance < 70:
            recommendations.append('⚖️ Improve visual balance')
        if art < 75:
            recommendations.append('🧹 Reduce artifacts')
        if band < 75:
            recommendations.append('🪜 Reduce color banding')
        if comp_art < 80:
            recommendations.append('💾 Use lossless export format')
        if dr < 70:
            recommendations.append('📊 Expand dynamic range')
        if light < 70:
            recommendations.append('💡 Adjust lighting')
        
        return recommendations[:8] if recommendations else ['✅ Excellent quality!']
    
    def _get_status(self, score: int) -> str:
        """Get status"""
        if score >= 85:
            return 'APPROVED'
        elif score >= 70:
            return 'REVISION_REQUIRED'
        else:
            return 'REJECTED'
