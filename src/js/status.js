
function updateStatusColor() {
    const statusDiv = document.getElementById('status');
    if (navigator.onLine) {
      statusDiv.style.backgroundColor = 'green';
    } else {
      statusDiv.style.backgroundColor = 'red';
    }
  }
  
  updateStatusColor();
  
  window.addEventListener('online', updateStatusColor);
  window.addEventListener('offline', updateStatusColor);