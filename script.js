  document.addEventListener('DOMContentLoaded', () => {
            // Smooth Scroll for Navigation
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile nav after clicking a link
                    const navList = document.getElementById('navList');
                    if (navList.classList.contains('nav-active')) {
                        navList.classList.remove('nav-active');
                    }
                });
            });

            // Mobile Navigation Toggle
            const navToggle = document.getElementById('navToggle');
            const navList = document.getElementById('navList');
            navToggle.addEventListener('click', () => {
                navList.classList.toggle('nav-active');
            });

            // Glitch Text Animation Trigger
            const glitchTexts = document.querySelectorAll('.glitch-text');
            glitchTexts.forEach(glitchText => {
                glitchText.addEventListener('mouseenter', () => {
                    glitchText.classList.add('glitch-active');
                });
                glitchText.addEventListener('mouseleave', () => {
                    glitchText.classList.remove('glitch-active');
                });
               
                setTimeout(() => {
                    glitchText.classList.add('glitch-active');
                    setTimeout(() => {
                        glitchText.classList.remove('glitch-active');
                    }, 1000); 
                }, Math.random() * 2000); 
                setInterval(() => {
                    glitchText.classList.add('glitch-active');
                    setTimeout(() => {
                        glitchText.classList.remove('glitch-active');
                    }, 1000);
                }, 5000 + Math.random() * 5000); // Repeat every 5-10 seconds
            });

            
            const faders = document.querySelectorAll('.fade-in');
            const appearOptions = {
                threshold: 0.2, 
                rootMargin: "0px 0px -50px 0px" 
            };

            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    } else {
                        entry.target.classList.add('active');
                        appearOnScroll.unobserve(entry.target); // Stop observing once animated
                    }
                });
            }, appearOptions);

            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });

            // Form Submission 
            const contactForm = document.querySelector('.contact-form');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
               
                console.log('Form Submitted!');
                console.log('Name:', document.getElementById('name').value);
                console.log('Email:', document.getElementById('email').value);
                console.log('Message:', document.getElementById('message').value);
                this.reset();
                showMessageBox("Transmission received! I'll get back to you soon.", "success");
            });

            //Message Box
            function showMessageBox(message, type) {
                let messageBox = document.getElementById('customMessageBox');
                if (!messageBox) {
                    messageBox = document.createElement('div');
                    messageBox.id = 'customMessageBox';
                    document.body.appendChild(messageBox);
                }

                messageBox.textContent = message;
                messageBox.className = 'message-box ' + type;
                messageBox.style.display = 'block';
                messageBox.style.opacity = '1';

                setTimeout(() => {
                    messageBox.style.opacity = '0';
                    setTimeout(() => {
                        messageBox.style.display = 'none';
                    }, 300); // Hide after fade out
                }, 3000); // Display for 3 seconds
            }

            // Append custom message box style to head
            const style = document.createElement('style');
            style.textContent = `
                .message-box {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(30, 30, 40, 0.95);
                    color: var(--text-light);
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    display: none;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                    border: 1px solid var(--neon-blue);
                    text-shadow: 0 0 5px var(--neon-blue);
                }
                .message-box.success {
                    border-color: var(--neon-green);
                    box-shadow: 0 0 10px var(--neon-green);
                    text-shadow: 0 0 5px var(--neon-green);
                }
                .message-box.error {
                    border-color: var(--neon-magenta);
                    box-shadow: 0 0 10px var(--neon-magenta);
                    text-shadow: 0 0 5px var(--neon-magenta);
                }
                .message-box.info { /* New style for info messages */
                    border-color: var(--neon-blue);
                    box-shadow: 0 0 10px var(--neon-blue);
                    text-shadow: 0 0 5px var(--neon-blue);
                }
            `;
            document.head.appendChild(style);

         
          
            const statusUpdateButtons = document.querySelectorAll('.status-update-btn');
            statusUpdateButtons.forEach(button => {
                button.addEventListener('click', () => {
                    showMessageBox("This project is currently a work in progress. More updates coming soon!", "info");
                });
            });

            // Global Glitch Effect Activation
            const glitchOverlay = document.getElementById('glitchOverlay');
            const body = document.body;
            const glitchStrength = 5; // Pixels for glitch translation

            function triggerGlobalGlitch() {
                body.classList.add('glitch-active-body');
                // Randomize glitch properties slightly
                glitchOverlay.style.setProperty('--glitch-strength', `${Math.random() * (glitchStrength - 2) + 2}px`);

                setTimeout(() => {
                    body.classList.remove('glitch-active-body');
                }, 100 + Math.random() * 50); // Glitch duration between 100ms and 150ms
            }

            
            setTimeout(triggerGlobalGlitch, 1000 + Math.random() * 2000); // 1-3 seconds initial delay

            
            setInterval(() => {
                triggerGlobalGlitch();
            }, 5000 + Math.random() * 10000); // Glitch every 5-15 seconds


            // Skill Bar Animation on Scroll
            const skillCards = document.querySelectorAll('.skill-card');
            const skillBarOptions = {
                threshold: 0.7 
            };

            const fillSkillBars = new IntersectionObserver(function(entries, fillSkillBars) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillCard = entry.target;
                        const percentage = skillCard.dataset.percentage;
                        const skillBar = skillCard.querySelector('.skill-bar');
                        skillBar.style.width = percentage + '%';
                        skillCard.classList.add('active'); 
                        fillSkillBars.unobserve(skillCard); 
                    }
                });
            }, skillBarOptions);

            skillCards.forEach(card => {
                fillSkillBars.observe(card);
            });
        });