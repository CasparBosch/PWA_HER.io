// Projects
if (document.getElementById("projectsIndex")) {
    fetch('https://cmgt.hr.nl/api/projects')
        .then(response => response.json())
        .then(data => {
            const projectsIndex = document.getElementById('projectsIndex');

            // Project Card
            data.data.forEach(project => {
                const id = project.project.id;
                const title = project.project.title;
                const headerImage = project.project.header_image;
                const tagline = project.project.tagline;

                const projectCard = document.createElement('div');
                projectCard.classList.add('p-3', 'w-1/4');
                projectCard.innerHTML = `
                    <a class="hover:opacity-80" href="project.html?id=${id}">
                        <div class="rounded-md h-full bg-white shadow">
                            <div class="">
                                <img class="w-full h-auto" src="${headerImage}" alt="${title}">
                            </div>
                            <div class="p-4">
                                <h2 class="text-xl font-semibold">${title}</h2>
                                <p class="text-sm">${tagline}</p>
                            </div>
                        </div>
                    </a>
                `;

                projectsIndex.appendChild(projectCard);
            });
        })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Project Details
if (document.getElementById("projectDetails")) {
    // Get the project ID from the URL query parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectId = urlParams.get('id');

    // Fetch project details based on the project ID
    fetch('https://cmgt.hr.nl/api/projects')
        .then(response => response.json())
        .then(data => {
            // Find the project with the matching ID
            const project = data.data.find(item => item.project.id == projectId);
            if (project) {
                // Display the project details on the page
                const projectDetails = document.getElementById('projectDetails');
                if (projectDetails) {
                    // Extract project title and display it
                    const title = project.project.title;
                    // const headerImage = project.project.header_image;
                    const tagline = project.project.tagline;
                    const description = project.project.description;
                    // const author = project.project.author;

                    projectDetails.innerHTML = `
                        <div class="my-32">
                            <h2 class="mb-6 text-3xl font-semibold text-neutral-700">${title}</h2>
                            <p class="mb-2 text-lg italic font-light text-neutral-700">${tagline}</p>
                            <p class="text-lg font-light text-neutral-700">${description}</p>
                        </div>
                    `;
                }
            } else {
                console.error('Project not found.');
            }
        })
    .catch(error => {
        console.error('Error fetching project details:', error);
    });
}

