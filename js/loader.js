document.addEventListener('DOMContentLoaded', function() {
    // Show loader
    const loader = document.querySelector('.loader-container');
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500); // Half second delay to ensure smooth transition
    });
});


// sayfa ilk yüklendiğinde kaydırma işlemi otomatik olarak yapılacak

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
  // Sayfanın yüklenmesini bekle ve sonra .start elementine git
  setTimeout(() => {
      scrollToStart();
  }, 100);
});

// .start elementine scroll yapan fonksiyon
function scrollToStart() {
  const startElement = document.querySelector('.start');
  if (startElement) {
      startElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
      });
  }
}

// Genel scroll fonksiyonu
function go(selector) {
  const element = document.querySelector(selector);
  if (element) {
      element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
      });
  }
}
