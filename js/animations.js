document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if GSAP is loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Reveal animations for elements with .gsap-reveal class
        const revealElements = document.querySelectorAll('.gsap-reveal');
        
        revealElements.forEach((el) => {
            gsap.fromTo(el, 
                { 
                    y: 50, 
                    opacity: 0,
                    autoAlpha: 0 
                },
                {
                    y: 0,
                    opacity: 1,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Animation starts when element is 85% from top of viewport
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Stagger reveals for elements inside a container (like grids)
        const staggerContainers = document.querySelectorAll('.gsap-stagger-container');
        
        staggerContainers.forEach((container) => {
            const items = container.children;
            gsap.fromTo(items,
                {
                    y: 30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        // Counter animations for statistics
        const counters = document.querySelectorAll('.counter-val');
        
        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || 0);
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        ease: "power1.out",
                        snap: { innerHTML: 1 },
                        onUpdate: function() {
                            counter.innerHTML = Math.round(this.targets()[0].innerHTML);
                        }
                    });
                }
            });
        });
    }
});
