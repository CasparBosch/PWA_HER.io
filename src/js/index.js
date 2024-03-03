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

// Online Status
if (document.getElementById('status')) {
    function updateStatusColor() {
        const status = document.getElementById('status');
        if (navigator.onLine) {
            status.classList.add('bg-green-500');
            status.classList.remove('bg-red-500');
        } else {
            status.classList.add('bg-red-500');
            status.classList.remove('bg-green-500');
        }
    }
    updateStatusColor();

    window.addEventListener('online', updateStatusColor);
    window.addEventListener('offline', updateStatusColor);
}
