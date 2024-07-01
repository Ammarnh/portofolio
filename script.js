document.addEventListener('DOMContentLoaded', function() {
    const twitterLink = document.querySelector('.fa-twitter');
    const facebookLink = document.querySelector('.fa-facebook');
    const AUTHORIZED_USER = "toya"; // Replace with the actual authorized username

    twitterLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Coming Soon!');
    });

    facebookLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Coming Soon!');
    });

    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('click', function() {
            const details = this.querySelector('.project-details');
            const isVisible = details.style.display === 'block';
            details.style.display = isVisible ? 'none' : 'block';
            this.style.width = isVisible ? '200px' : '400px';
            this.style.height = isVisible ? '200px' : 'auto';
            const linkOptions = this.querySelector('.link-options');
            if (linkOptions) linkOptions.style.display = 'none';

            // Add animation when clicking project link button
            if (this.querySelector('.project-link')) {
                this.querySelector('.project-link').classList.add('button-click');
                setTimeout(() => {
                    this.querySelector('.project-link').classList.remove('button-click');
                }, 300);
            }
        });
    });

    const project1LinkBtn = document.getElementById('project1-link-btn');
    const project1Links = document.getElementById('project1-links');
    project1LinkBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        project1Links.style.display = project1Links.style.display === 'block' ? 'none' : 'block';
    });

    const feedbackForm = document.getElementById('feedback-form');
    const feedbackResults = document.getElementById('feedback-results');

    // Load feedback from localStorage
    const storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
    storedFeedback.forEach(feedback => {
        addFeedback(feedback.name, feedback.message);
    });

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        
        if (name === "" || message.length < 10) {
            alert("Nama harus diisi dan pesan harus minimal 10 karakter!");
            return;
        }
        
        const feedbackData = { name, message };
        addFeedback(name, message, true);

        // Save feedback to localStorage
        storedFeedback.push(feedbackData);
        localStorage.setItem('feedback', JSON.stringify(storedFeedback));

        feedbackForm.reset();
    });

    function addFeedback(name, message, saveToStorage = false) {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.innerHTML = `
            <h4>${name}</h4>
            <p>${message}</p>
            <button class="delete-feedback">Hapus</button>
        `;
        feedbackResults.appendChild(feedbackItem);

        const deleteButton = feedbackItem.querySelector('.delete-feedback');
        deleteButton.addEventListener('click', function() {
            const username = prompt("Enter your username to delete this feedback:");
            if (username !== AUTHORIZED_USER) {
                alert("Unauthorized! Only specific users can delete feedback.");
                return;
            }
            feedbackResults.removeChild(feedbackItem);
            if (saveToStorage) {
                const updatedFeedback = storedFeedback.filter(feedback => feedback.name !== name || feedback.message !== message);
                localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
            }
        });
    }
});
