// Fetch API
fetch('https://cmgt.hr.nl/api/projects')
.then(response => response.json())
.then(data => {
    const projectsContainer = document.getElementById('projectsContainer');

    // Assuming the API response has an array named 'data' containing project objects
    // Iterate over each project object
    data.data.forEach(project => {
        // Extract required information
        const title = project.project.title;
        const tagline = project.project.tagline;
        const headerImage = project.project.header_image;

        // Create HTML elements
        const projectElement = document.createElement('div');
        projectElement.classList.add('p-3', 'w-1/4');
        projectElement.innerHTML = `
            <div class="rounded-md h-full bg-white shadow">
                <div class="">
                    <img src="${headerImage}" alt="${title}" class="w-full h-auto">
                </div>
                <div class="p-4">
                    <h2 class="text-xl font-semibold">${title}</h2>
                    <p class="text-sm">${tagline}</p>
                </div>
            </div>
        `;

        // Append project element to container
        projectsContainer.appendChild(projectElement);
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});

// Service Worker
if('serviceWorker' in navigator) {
    console.log('Service Worker is supported')

    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('./../../service-worker.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}