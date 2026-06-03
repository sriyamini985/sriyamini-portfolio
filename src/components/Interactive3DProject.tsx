import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

interface Interactive3DProjectProps {
  projectTitle: string;
  description: string;
  techStack: string;
  previewImage?: string;
}

const Interactive3DProject: React.FC<Interactive3DProjectProps> = ({
  projectTitle,
  description,
  techStack,
  previewImage
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef({ x: 0, y: 0, down: false, startX: 0, startY: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(5);
  const targetZoomRef = useRef(5);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = zoomRef.current;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xFF8C00, 1.2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4488ff, 0.6);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create interactive 3D object (complex geometry)
    const geometry = new THREE.IcosahedronGeometry(1.5, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0xFF8C00,
      emissive: 0x333333,
      shininess: 100,
      wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Add wireframe overlay
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.5, 4);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.2,
      linewidth: 1
    });
    const wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(wireframeGeometry),
      wireframeMaterial
    );
    mesh.add(wireframe);

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      mouseRef.current.down = true;
      mouseRef.current.startX = e.clientX;
      mouseRef.current.startY = e.clientY;
      setIsInteracting(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (mouseRef.current.down) {
        const deltaX = e.clientX - mouseRef.current.startX;
        const deltaY = e.clientY - mouseRef.current.startY;

        targetRotationRef.current.y += deltaX * 0.01;
        targetRotationRef.current.x += deltaY * 0.01;

        mouseRef.current.startX = e.clientX;
        mouseRef.current.startY = e.clientY;
      }
    };

    const onMouseUp = () => {
      mouseRef.current.down = false;
      setIsInteracting(false);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoomRef.current += e.deltaY * 0.005;
      targetZoomRef.current = Math.max(2, Math.min(10, targetZoomRef.current));
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        mouseRef.current.down = true;
        mouseRef.current.startX = e.touches[0].clientX;
        mouseRef.current.startY = e.touches[0].clientY;
        setIsInteracting(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !mouseRef.current.down) return;

      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];

      if (e.touches.length === 1) {
        const deltaX = touch.clientX - mouseRef.current.startX;
        const deltaY = touch.clientY - mouseRef.current.startY;

        targetRotationRef.current.y += deltaX * 0.01;
        targetRotationRef.current.x += deltaY * 0.01;

        mouseRef.current.startX = touch.clientX;
        mouseRef.current.startY = touch.clientY;
      } else if (e.touches.length === 2) {
        // Pinch zoom
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const prevDistance = Math.hypot(
          mouseRef.current.startX - touch1.clientX,
          mouseRef.current.startY - touch1.clientY
        );
        const delta = distance - prevDistance;
        targetZoomRef.current -= delta * 0.01;
        targetZoomRef.current = Math.max(2, Math.min(10, targetZoomRef.current));
      }
    };

    const onTouchEnd = () => {
      mouseRef.current.down = false;
      setIsInteracting(false);
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
    renderer.domElement.addEventListener('touchend', onTouchEnd);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth rotation
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;

      // Smooth zoom
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.1;

      if (mesh) {
        mesh.rotation.x = rotationRef.current.x;
        mesh.rotation.y = rotationRef.current.y;

        // Auto-rotate when not interacting
        if (!mouseRef.current.down) {
          targetRotationRef.current.y += 0.001;
        }
      }

      if (camera) {
        camera.position.z = zoomRef.current;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const handleZoomIn = () => {
    targetZoomRef.current = Math.max(2, targetZoomRef.current - 1);
  };

  const handleZoomOut = () => {
    targetZoomRef.current = Math.min(10, targetZoomRef.current + 1);
  };

  const handleReset = () => {
    targetRotationRef.current = { x: 0, y: 0 };
    targetZoomRef.current = 5;
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8">
      {/* 3D Canvas */}
      <div className="flex-1 relative rounded-2xl overflow-hidden glass-panel border border-white/10 bg-deep-charcoal/50 min-h-[500px] lg:min-h-[600px]">
        <div ref={containerRef} className="w-full h-full" />

        {/* Controls Overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
          <div className="text-xs text-foreground/50 font-mono">
            {isInteracting ? 'Rotating...' : 'Drag to rotate • Scroll to zoom'}
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleZoomIn}
              className="p-3 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors text-primary"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleZoomOut}
              className="p-3 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors text-primary"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="p-3 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors text-primary"
              title="Reset View"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex flex-col justify-center space-y-6 lg:pr-4"
      >
        <div>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {projectTitle}
          </h3>
          <p className="text-lg text-foreground/70 leading-relaxed">
            {description}
          </p>
        </div>

        {techStack && (
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-primary mb-3 font-bold">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.split(',').map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-foreground/80 font-medium hover:border-primary/50 transition-colors"
                >
                  {tech.trim()}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-foreground/50 font-mono">
            💡 Tip: Use mouse to rotate, scroll to zoom, or tap and drag on mobile
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Interactive3DProject;
