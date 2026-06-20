document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Scroll Effect for Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '0.5rem 0';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.padding = '1rem 0';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }

    // 3. Terminal Time Update
    const timeDisplay = document.getElementById('terminal-time');
    if (timeDisplay) {
        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            timeDisplay.innerText = timeString;
        }, 1000);
    }

    // 5. Scroll Animations
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    console.log('Hotosevents system initialized.');




    const wizardForm = document.getElementById('hotosevents-form');
    if (wizardForm) {
        const steps = wizardForm.querySelectorAll('.form-wizard-step');
        const dots = document.querySelectorAll('.form-wizard-dot');
        const next1 = document.getElementById('next-1');
        const next2 = document.getElementById('next-2');
        const back2 = document.getElementById('back-2');
        const back3 = document.getElementById('back-3');
        const pills = wizardForm.querySelectorAll('.form-wizard-pill');
        const roleInput = document.getElementById('selected-role');
        const storyTextarea = document.getElementById('story-input');
        const charCount = document.getElementById('char-count');
        const successState = document.getElementById('success-state');

        let currentStep = 0;

        const updateStep = (index) => {
            steps.forEach((step, i) => {
                step.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i <= index);
            });
            currentStep = index;
        };

        // Pill Selection
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                if (roleInput) roleInput.value = pill.getAttribute('data-role');
                const roleError = wizardForm.querySelector('.form-wizard-role-error');
                if (roleError) roleError.style.display = 'none';
            });
        });

        // Step 1 -> 2
        if (next1) {
            next1.addEventListener('click', () => {
                const firstName = wizardForm.querySelector('input[name="first_name"]');
                const lastName = wizardForm.querySelector('input[name="last_name"]');
                const email = wizardForm.querySelector('input[name="email"]');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                const firstNameField = firstName ? firstName.closest('.form-wizard-field') : null;
                const lastNameField = lastName ? lastName.closest('.form-wizard-field') : null;
                const emailField = email ? email.closest('.form-wizard-field') : null;
                
                let isValid = true;

                if (firstName && !firstName.value.trim()) {
                    firstName.classList.add('form-wizard-error');
                    const err = firstNameField ? firstNameField.querySelector('.form-wizard-error-text') : null;
                    if (err) err.style.display = 'block';
                    isValid = false;
                } else if (firstName) {
                    firstName.classList.remove('form-wizard-error');
                    const err = firstNameField ? firstNameField.querySelector('.form-wizard-error-text') : null;
                    if (err) err.style.display = 'none';
                }

                if (lastName && !lastName.value.trim()) {
                    lastName.classList.add('form-wizard-error');
                    const err = lastNameField ? lastNameField.querySelector('.form-wizard-error-text') : null;
                    if (err) err.style.display = 'block';
                    isValid = false;
                } else if (lastName) {
                    lastName.classList.remove('form-wizard-error');
                    const err = lastNameField ? lastNameField.querySelector('.form-wizard-error-text') : null;
                    if (err) err.style.display = 'none';
                }

                if (email && !emailRegex.test(email.value.trim())) {
                    email.classList.add('form-wizard-error');
                    const err = emailField ? emailField.querySelector('.form-wizard-error-text') : null;
                    if (err) err.style.display = 'block';
                    isValid = false;
                } else if (email) {
                    email.classList.remove('form-wizard-error');
                    const err = emailField ? emailField.querySelector('.form-wizard-error-text') : null;
                    if (err) err.style.display = 'none';
                }

                const roleError = wizardForm.querySelector('.form-wizard-role-error');
                if (roleInput && !roleInput.value) {
                    if (roleError) roleError.style.display = 'block';
                    isValid = false;
                }

                if (isValid) updateStep(1);
            });
        }

        // Step 2 -> 3
        if (next2) {
            next2.addEventListener('click', () => {
                if (storyTextarea && !storyTextarea.value.trim()) {
                    storyTextarea.classList.add('form-wizard-error');
                    const storyField = storyTextarea.closest('.form-wizard-field');
                    const storyError = storyField ? storyField.querySelector('.form-wizard-error-text') : null;
                    if (storyError) storyError.style.display = 'block';
                } else {
                    if (storyTextarea) storyTextarea.classList.remove('form-wizard-error');
                    const storyField = storyTextarea.closest('.form-wizard-field');
                    const storyError = storyField ? storyField.querySelector('.form-wizard-error-text') : null;
                    if (storyError) storyError.style.display = 'none';
                    updateStep(2);
                }
            });
        }

        // Navigation Back
        if (back2) back2.addEventListener('click', () => updateStep(0));
        if (back3) back3.addEventListener('click', () => updateStep(1));

        // Character Counter
        if (storyTextarea && charCount) {
            storyTextarea.addEventListener('input', () => {
                const length = storyTextarea.value.length;
                charCount.innerText = length;
                if (length > 0) {
                    storyTextarea.classList.remove('form-wizard-error');
                    const storyError = wizardForm.querySelector('#step-2 .form-wizard-error-text');
                    if (storyError) storyError.style.display = 'none';
                }
            });
        }

        // Form Submission
        wizardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const termsBox = wizardForm.querySelector('input[name="terms"]');
            if (termsBox && !termsBox.checked) {
                const termsError = wizardForm.querySelector('#step-3 .form-wizard-error-text');
                if (termsError) termsError.style.display = 'block';
                return;
            }

            // Collect form data
            const payload = {
                first_name : (wizardForm.querySelector('input[name="first_name"]') || {}).value || '',
                last_name  : (wizardForm.querySelector('input[name="last_name"]')  || {}).value || '',
                email      : (wizardForm.querySelector('input[name="email"]')       || {}).value || '',
                phone      : (wizardForm.querySelector('input[name="phone"]')       || {}).value || '',
                role       : (document.getElementById('selected-role')             || {}).value || '',
                story      : (document.getElementById('story-input')               || {}).value || '',
                source     : window.location.pathname  // e.g. /fr/redlock.html
            };

            // Disable submit button to prevent double-send
            const submitBtn = wizardForm.querySelector('.form-wizard-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';
            }

            const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwoH0xcmrdmE2HzztVqk69U5kIe4r7DvgqcNT5xOoYi5xZ7Mxj6zwPt7HP8TOuSMIQUtw/exec';

            fetch(SHEET_URL, {
                method : 'POST',
                mode   : 'no-cors',   // Apps Script requires no-cors
                headers: { 'Content-Type': 'application/json' },
                body   : JSON.stringify(payload)
            })
            .then(() => {
                // no-cors means we can't read the response body — treat as success
                wizardForm.style.transition = 'opacity 0.3s ease';
                wizardForm.style.opacity = '0';
                setTimeout(() => {
                    wizardForm.style.display = 'none';
                    const container = wizardForm.closest('.form-wizard-container');
                    const progress = container ? container.querySelector('.form-wizard-progress') : null;
                    if (progress) progress.style.display = 'none';
                    if (successState) successState.classList.add('visible');
                }, 300);
            })
            .catch((err) => {
                console.error('Submission error:', err);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Try Again';
                }
                alert('Something went wrong. Please try again or contact us directly.');
            });
        });
    }
});
