document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // Optional: for animating the bars
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Scroll animation for sections
    const animateElements = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // EmailJS form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    alert('Message sent successfully!');
                    contactForm.reset(); // Clear the form
                }, function(error) {
                    console.error('Failed to send message:', error);
                    alert('Failed to send message. Please try again later.');
                });
        });
    }

    // Typing Animation functionality
    const typingTextElement = document.querySelector('.typing-text');
    const words = ["a Student", "a Developer", "a Cybersecurity Enthusiast", "a Tech Innovator"]; // Words to type out
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // milliseconds per character
    const deletingSpeed = 60; // milliseconds per character
    const delayBetweenWords = 1500; // milliseconds before typing next word

    function typeWriter() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length + 1) { // +1 to ensure full word is shown for a moment
            isDeleting = true;
            setTimeout(typeWriter, delayBetweenWords); // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to next word
            setTimeout(typeWriter, typingSpeed); // Pause before typing new word
        } else {
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(typeWriter, speed);
        }
    }

    // Start the typing animation when the page loads
    if (typingTextElement) {
        typeWriter();
    }

});