document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            preference: document.getElementById('travelPreference').value
        };
        
        // Validate form
        if (!document.getElementById('terms').checked) {
            alert('Please agree to the terms and conditions');
            return;
        }
        
        try {
            // Show loading state
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            submitBtn.disabled = true;
            
            // Here you would typically send data to your backend or iqlipse API
            console.log('Form data:', formData);
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For demo purposes, just show success message
            showSuccessMessage();
            
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup. Please try again.');
        } finally {
            // Reset button state
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
            submitBtn.disabled = false;
        }
    });
    
    // Social login buttons
    document.querySelector('.social-btn.google').addEventListener('click', function() {
        // Implement Google OAuth integration with iqlipse
        console.log('Google signup clicked');
        alert('Google signup would be implemented here with iqlipse OAuth');
    });
    
    document.querySelector('.social-btn.facebook').addEventListener('click', function() {
        // Implement Facebook OAuth integration with iqlipse
        console.log('Facebook signup clicked');
        alert('Facebook signup would be implemented here with iqlipse OAuth');
    });
});

function showSuccessMessage() {
    // In a real app, you might redirect to dashboard or show a proper success modal
    alert('Account created successfully! Welcome to TravelEase.');
    // window.location.href = '/dashboard.html';
    
    // For a better UX, you could implement a modal or success message in the UI
    /*
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Account Created Successfully!</h3>
            <p>Welcome to TravelEase. Redirecting to your dashboard...</p>
        </div>
    `;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        window.location.href = '/dashboard.html';
    }, 3000);
    */
}

// iqlipse API integration function
async function signupWithIqlipse(userData) {
    try {
        const response = await fetch('https://api.iqlipse.com/travel/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Iqlipse-API-Key': 'your_api_key_here'
            },
            body: JSON.stringify({
                user: userData,
                source: 'web_signup'
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('iqlipse API error:', error);
        throw error;
    }
}