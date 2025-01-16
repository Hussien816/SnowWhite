// Initialize EmailJS with your public key
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
})();

function sendEmail(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // EmailJS template parameters
    const templateParams = {
        to_name: 'Admin',
        to_email: 'hussienarfat816@gmail.com',
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    // Send email using EmailJS
    emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams
    )
    .then(function() {
        // Show success message
        const successMsg = document.getElementById('successMessage');
        successMsg.style.display = 'block';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    })
    .catch(function(error) {
        // Show error message
        const errorMsg = document.getElementById('errorMessage');
        errorMsg.style.display = 'block';
        
        // Hide error message after 3 seconds
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 3000);
        
        console.error('Email error:', error);
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });

    return false;
}
