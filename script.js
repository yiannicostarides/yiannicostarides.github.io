// Animated wave background using D3.js
function createWaveBackground() {
    const svg = d3.select("#wave-background")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create multiple wave layers
    const waves = [
        { amplitude: 60, frequency: 0.02, speed: 0.01, opacity: 0.3 },
        { amplitude: 40, frequency: 0.03, speed: 0.015, opacity: 0.2 },
        { amplitude: 80, frequency: 0.015, speed: 0.008, opacity: 0.1 }
    ];

    waves.forEach((wave, index) => {
        const path = svg.append("path")
            .attr("fill", `rgba(255, 255, 255, ${wave.opacity})`)
            .attr("d", generateWavePath(width, height, wave, 0));

        animateWave(path, width, height, wave);
    });

    // Resize handler
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        svg.attr("width", newWidth).attr("height", newHeight);
    });
}

function generateWavePath(width, height, wave, time) {
    const points = [];
    const step = width / 100;
    
    for (let x = 0; x <= width; x += step) {
        const y = height * 0.7 + Math.sin(x * wave.frequency + time) * wave.amplitude;
        points.push([x, y]);
    }
    
    const line = d3.line()
        .x(d => d[0])
        .y(d => d[1])
        .curve(d3.curveBasis);
    
    return line(points) + `L${width},${height}L0,${height}Z`;
}

function animateWave(path, width, height, wave) {
    let time = 0;
    
    function update() {
        time += wave.speed;
        path.attr("d", generateWavePath(width, height, wave, time));
        requestAnimationFrame(update);
    }
    
    update();
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createWaveBackground();
    initSmoothScrolling();
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});