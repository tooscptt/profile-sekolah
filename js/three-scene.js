// 3D Scene Background for Hero Section
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-canvas-container');
    
    // Only initialize if container exists and ThreeJS is loaded
    if (container && typeof THREE !== 'undefined') {
        
        // Scene Setup
        const scene = new THREE.Scene();
        // Add a subtle fog to blend into background
        scene.fog = new THREE.FogExp2(0xf8fafc, 0.002);

        // Camera Setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // Renderer Setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Objects - TorusKnot (Abstract shape)
        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        
        // Material with glass/modern look
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x2563eb,          // Primary blue
            metalness: 0.1,
            roughness: 0.2,
            transmission: 0.9,        // Glass-like
            thickness: 0.5,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            wireframe: false
        });
        
        const torusKnot = new THREE.Mesh(geometry, material);
        torusKnot.position.set(15, 0, -10); // Offset to the right
        scene.add(torusKnot);

        // Sub-object - Floating spheres
        const sphereGeo = new THREE.SphereGeometry(2, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({ 
            color: 0xf59e0b, // Accent color
            roughness: 0.4,
            metalness: 0.8
        });
        
        const spheres = [];
        for (let i = 0; i < 5; i++) {
            const sphere = new THREE.Mesh(sphereGeo, sphereMat);
            sphere.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20 - 10
            );
            
            // Random scaling
            const scale = Math.random() * 0.5 + 0.5;
            sphere.scale.set(scale, scale, scale);
            
            scene.add(sphere);
            spheres.push({
                mesh: sphere,
                speedY: Math.random() * 0.02 + 0.005,
                speedX: Math.random() * 0.01 + 0.005
            });
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(20, 20, 20);
        scene.add(pointLight);
        
        const pointLight2 = new THREE.PointLight(0x60a5fa, 2); // Blue light
        pointLight2.position.set(-20, -20, 20);
        scene.add(pointLight2);

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Animation Loop
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Rotate main object
            torusKnot.rotation.x += 0.005;
            torusKnot.rotation.y += 0.01;

            // Float spheres
            spheres.forEach((data, index) => {
                data.mesh.position.y += Math.sin(elapsedTime * 2 + index) * 0.02;
                data.mesh.rotation.x += 0.01;
                data.mesh.rotation.y += 0.01;
            });

            // Smooth mouse follow for camera
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;
            
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (-targetY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();
    }
});
