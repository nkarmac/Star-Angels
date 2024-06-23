document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling
    const navLinks = document.querySelectorAll('nav ul li a, .cta-button');

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // GSAP animations setup and Intersection Observer setup
    const tl = gsap.timeline({ defaults: { duration: 1, opacity: 0, ease: 'power2.out' } });

    tl.from('.hero-text h1', { y: -50 })
      .from('.hero-text p', { y: -30 }, '-=0.5')
      .from('.cta-button', { y: -20 }, '-=0.5');

    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.fade-in-initial').forEach(element => {
                    gsap.to(element, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
                });
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.querySelectorAll('.fade-in-initial').forEach(element => {
            element.classList.add('fade-in-initial');
        });
        observer.observe(section);
    });

    // Three.js 3D space background setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    function addStar() {
        const colors = [0xffffff, 0xffcc66, 0xff6666, 0x6699ff];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const geometry = new THREE.SphereGeometry(0.1, 24, 24);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const star = new THREE.Mesh(geometry, material);
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
        star.position.set(x, y, z);
        scene.add(star);
    }

    Array(1200).fill().forEach(addStar);

    function animate() {
        requestAnimationFrame(animate);
        camera.rotation.x += 0.0005;
        camera.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }

    camera.position.z = 30;
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    window.addEventListener('scroll', () => {
        const t = document.body.getBoundingClientRect().top;
        camera.position.z = t * -0.05;
        camera.position.x = t * -0.0002;
        camera.position.y = t * -0.0002;
    });
});
