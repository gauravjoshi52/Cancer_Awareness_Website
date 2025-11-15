// Real-time Quotes Functionality
const quoteDisplay = document.getElementById('quote-display');
const newQuoteBtn = document.getElementById('new-quote-btn');

// Array of inspirational quotes as fallback
const fallbackQuotes = [
    {
        text: "Hope is being able to see that there is light despite all of the darkness.",
        author: "Desmond Tutu"
    },
    {
        text: "You have to fight through some bad days to earn the best days of your life.",
        author: "Unknown"
    },
    {
        text: "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
        author: "Rikki Rogers"
    },
    {
        text: "Cancer is a word, not a sentence.",
        author: "John Diamond"
    },
    {
        text: "You never know how strong you are until being strong is your only choice.",
        author: "Bob Marley"
    },
    {
        text: "The human spirit is stronger than anything that can happen to it.",
        author: "C.C. Scott"
    },
    {
        text: "Every day is a new beginning. Treat it that way. Stay away from what might have been, and look at what can be.",
        author: "Marsha Petrie Sue"
    }
];

// Function to fetch a random quote from an API
async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        return {
            text: data.content,
            author: data.author
        };
    } catch (error) {
        console.log('API fetch failed, using fallback quote:', error);
        // Return a random fallback quote if API fails
        return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }
}

// Function to display a quote
function displayQuote(quote) {
    const quoteText = quoteDisplay.querySelector('.quote-text');
    const quoteAuthor = quoteDisplay.querySelector('.quote-author');
    
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `- ${quote.author}`;
}

// Event listener for new quote button
newQuoteBtn.addEventListener('click', async () => {
    // Show loading state
    newQuoteBtn.textContent = 'Loading...';
    newQuoteBtn.disabled = true;
    
    const quote = await fetchQuote();
    displayQuote(quote);
    
    // Reset button
    newQuoteBtn.textContent = 'Get New Inspiration';
    newQuoteBtn.disabled = false;
});

// Contact Form Functionality
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields (Name, Email, Message).', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Success message
    showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Function to show form messages
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.classList.remove('hidden');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Smooth scrolling for navigation links
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

// Initialization of the page with a quote when it loads
document.addEventListener('DOMContentLoaded', async () => {
    const initialQuote = await fetchQuote();
    displayQuote(initialQuote);
});