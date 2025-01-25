/**
* Kalp butonunu tıklatır ve butonun rengini değiştir, bu sayede kalp butonu dolu
* olması  durumunu tersine çevirir.
* @param {HTMLElement} element - Buton elementi
 */
// ---- Sıkça Sorulan Sorular -----

// Tüm soru başlıklarını al

const faqQuestions = document.querySelectorAll('.faq-question');

// Her bir soru başlığına tıklama olayını ekle
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    // Sorunun altında yer alan cevabı al
    const answer = question.nextElementSibling;

    // Cevabı göster/gizle
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }
  });
});

//*Details sayfası *//
// Küçük resme tıklandığında büyük resmin değişmesi
function changeImage(imageUrl) {
  document.getElementById('mainImage').src = imageUrl;
}

// ---- Action Buttons -----

function toggleHeart(element) {
  const isAdding = !element.classList.contains('red');
  element.classList.toggle('red'); // Kırmızı rengi ekle/kaldır
  element.classList.toggle('fa-solid'); // İkon tipi değiştir
  element.classList.toggle('fa-regular'); // İkon tipi değiştir

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: isAdding ? 'Favorilere eklendi!' : 'Favorilerden çıkarıldı',
    showConfirmButton: false,
    timer: 1500,
    toast: true
  });
}

function toggleCompare(element) {
  const isAdding = !element.classList.contains('green');
  element.classList.toggle('green'); // Yeşil rengi ekle/kaldır

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: isAdding ? 'Karşılaştırma listesine eklendi!' : 'Karşılaştırma listesinden çıkarıldı',
    showConfirmButton: false,
    timer: 1500,
    toast: true
  });
}

function toggleShare(element) {
  element.classList.toggle('orange'); // Turuncu rengi ekle/kaldır
  setTimeout(() => element.classList.remove('orange'), 250);

  Swal.fire({
    title: 'Paylaş',
    html: `
      <div class="share-buttons">
        <button class="btn btn-success mb-2 w-100" onclick="shareViaWhatsApp()">
          <i class="bi bi-whatsapp"></i> WhatsApp
        </button>
        <button class="btn btn-info mb-2 w-100" onclick="shareViaTwitter()">
          <i class="bi bi-twitter"></i> Twitter
        </button>
        <button class="btn btn-danger w-100" onclick="shareViaEmail()">
          <i class="bi bi-envelope"></i> Email
        </button>
      </div>
    `,
    showCloseButton: true,
    showConfirmButton: false
  });
}

// Form submission handler
async function handleFormSubmit(event, formId) {
  event.preventDefault();
  const form = document.getElementById(formId);

  try {
    // Form validation simulation
    const isValid = form.checkValidity();
    if (!isValid) {
      throw new Error('Lütfen tüm gerekli alanları doldurun.');
    }

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Form başarıyla gönderildi.',
      confirmButtonText: 'Tamam'
    });

    form.reset();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: error.message,
      confirmButtonText: 'Tamam'
    });
  }
}

// Share functions
function shareViaWhatsApp() {
  const url = window.location.href;
  window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
}

function shareViaTwitter() {
  const url = window.location.href;
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
}

function shareViaEmail() {
  const url = window.location.href;
  window.location.href = `mailto:?body=${encodeURIComponent(url)}`;
}

// Search results handler
let page = 1;
let loading = false;
let hasMore = true;
let totalResults = 0; // Toplam sonuç sayısı

// Arama işlemi
function handleSearchForm(event) {
  event.preventDefault();

  const firstSelect = document.querySelector('#firstChain select');
  
  if (!firstSelect || !firstSelect.value || firstSelect.value === "Hizmet Seçiniz") {
    Swal.fire({
      title: 'Uyarı',
      text: 'Lütfen bir hizmet seçin',
      icon: 'warning',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#3465FD'
    });
    return false;
  }

  const secondSelect = document.querySelector('#secondChain select');

  const params = new URLSearchParams();
  params.append('category', firstSelect.value);
  
  if (secondSelect && secondSelect.value && secondSelect.value !== "İl Seçiniz") {
    params.append('subcategory', secondSelect.value);
  }

  // Örnek veri sayısı (gerçek API'den gelecek)
  totalResults = 25;
  params.append('total', totalResults);

  Swal.fire({
    title: 'Aranıyor...',
    html: 'Sağlık hizmetleri bulunuyor',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading();
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      window.location.href = `/SaglikPusulam/pages/search-results.html?${params.toString()}`;
    }
  });

  return false;
}


// Filtre değişikliği bildirimi
function notifyFilterChange(element) {
  let filterName = '';
  let filterTitle = '';
  
  // Input tipine göre filtre ismini belirle
  if (element.type === 'radio') {
    // Yıldız sayısını bul
    const stars = element.closest('.form-check').getAttribute('data-stars');
    filterName = `${stars} Yıldız ve Üzeri`;
    filterTitle = 'Puan Filtresi';
  } else if (element.type === 'checkbox') {
    // Checkbox label'ını bul
    const label = element.nextElementSibling;
    filterName = label ? label.textContent.trim() : 'Filtre';
    filterTitle = element.closest('.filter-section').querySelector('.filter-title').textContent;
  } else if (element.type === 'range') {
    // Mesafe slider'ı
    filterName = `${element.value}km`;
    filterTitle = 'Mesafe Filtresi';
  } else if (element.type === 'text') {
    // Hizmet arama
    filterName = element.value;
    filterTitle = 'Hizmet Arama';
  } else if (element.tagName === 'SELECT') {
    // Select option text'ini bul
    const selectedOption = element.options[element.selectedIndex];
    filterName = selectedOption ? selectedOption.text : 'Filtre';
    filterTitle = element.closest('.filter-section').querySelector('.filter-title').textContent;
  }

  Swal.fire({
    title: filterTitle,
    text: `"${filterName}" seçildi`,
    icon: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
}

// Filtre değişikliklerini dinle
document.addEventListener('DOMContentLoaded', function() {
  // Tüm select ve input elementlerini seç
  const filterInputs = document.querySelectorAll('.filter-section input, .filter-section select');
  
  // Mesafe slider'ı için özel işleyici
  const distanceRange = document.getElementById('distanceRange');
  if (distanceRange) {
    distanceRange.addEventListener('input', function() {
      // Range değerini güncelle
      document.getElementById('rangeValue').textContent = this.value + 'km';
    });

    distanceRange.addEventListener('change', function() {
      notifyFilterChange(this);
    });
  }

  // Hizmet arama input'u için özel işleyici
  const serviceInput = document.getElementById('serviceName');
  if (serviceInput) {
    let timeout = null;
    serviceInput.addEventListener('input', function() {
      // Önceki timeout'u temizle
      clearTimeout(timeout);
      
      // 500ms bekle ve sonra bildirim göster
      timeout = setTimeout(() => {
        if (this.value.trim() !== '') {
          notifyFilterChange(this);
        }
      }, 500);
    });
  }
  
  filterInputs.forEach(input => {
    if (input.id !== 'distanceRange' && input.id !== 'serviceName') {
      input.addEventListener('change', function() {
        notifyFilterChange(this);
      });
    }
  });
});

// Service status filter event listener
document.addEventListener('DOMContentLoaded', () => {
  const serviceStatusCheckbox = document.getElementById('serviceStatus');
  if (serviceStatusCheckbox) {
    serviceStatusCheckbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const filterTitle = 'Hizmet Durumu';
      const filterName = isChecked ? 'Şuan da açık filtresi seçildi' : 'Şuan da kapalı filtresi seçildi';
      
      Swal.fire({
        title: filterTitle,
        text: filterName,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      });
    });
  }
});

// Arama işlemi
function handleSearchForm(event) {
  // Form submit olayını engelle
  event.preventDefault();

  // Dropdown değerlerini al
  const firstSelect = document.querySelector('#firstChain select');
  
  // İlk dropdown kontrolü
  if (!firstSelect || !firstSelect.value || firstSelect.value === "Hizmet Seçiniz") {
    Swal.fire({
      title: 'Uyarı',
      text: 'Lütfen bir hizmet seçin',
      icon: 'warning',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#3465FD'
    });
    return false;
  }

  // İkinci dropdown'ı al
  const secondSelect = document.querySelector('#secondChain select');

  // URL parametrelerini oluştur
  const params = new URLSearchParams();
  params.append('category', firstSelect.value);
  
  // İkinci dropdown seçili ve geçerli bir değer ise ekle
  if (secondSelect && secondSelect.value && secondSelect.value !== "İl Seçiniz") {
    params.append('subcategory', secondSelect.value);
  }

  // Yükleniyor göster
  Swal.fire({
    title: 'Aranıyor...',
    html: 'Sağlık hizmetleri bulunuyor',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading();
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      // Arama sayfasına yönlendir
      window.location.href = `/SaglikPusulam/pages/search-results.html?${params.toString()}`;
    }
  });

  return false;
}

// Form submit olayını dinle
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  if (form) {
    form.addEventListener('submit', handleSearchForm);
  }
});

// Ana Sayfa Section 1 Multi Dropdown
var chainedData1 = {};
var chainedData2 = {};

async function loadJson() {
  try {
    // İlk JSON dosyasını yükle
    const doctorResponse = await fetch('./data/healthservices.json');
    const doctorJson = await doctorResponse.json();

    // İkinci JSON dosyasını yükle
    const citiesResponse = await fetch('./data/cities.json');
    const citiesJson = await citiesResponse.json();

    // Remove any existing selects
    $("form select").remove();

    // Create wrapper for first select
    const firstWrapper = $('<div>', {
      style: 'position: relative;'
    });
    
    // Create icon for first select
    const firstIcon = $('<i>', {
      class: 'bi bi-search',
      css: {
        'position': 'absolute',
        'left': '15px',
        'top': '50%',
        'transform': 'translateY(-50%)',
        'color': '#6c757d',
        'z-index': '1'
      }
    });

    const firstSelect = $("<select>", {
      name: "example1",
      id: "example1",
      class: "form-select px-5",
      style: "height: 45px; width: 100%"
    });

    firstWrapper.append(firstIcon).append(firstSelect);
    $("#firstChain").append(firstWrapper);

    // Create wrapper for second select
    const secondWrapper = $('<div>', {
      style: 'position: relative;'
    });
    
    // Create icon for second select
    const secondIcon = $('<i>', {
      class: 'bi bi-geo-alt',
      css: {
        'position': 'absolute',
        'left': '15px',
        'top': '50%',
        'transform': 'translateY(-50%)',
        'color': '#6c757d',
        'z-index': '1'
      }
    });

    const secondSelect = $("<select>", {
      name: "example2",
      id: "example2",
      class: "form-select px-5",
      style: "height: 45px; width: 100%"
    });

    secondWrapper.append(secondIcon).append(secondSelect);
    $("#secondChain").append(secondWrapper);

    // Select container'ı için style ekleme
    $("#firstChain, #secondChain").css({
      'position': 'relative',
      'min-height': '250px'
    });

    // İkinci select için dropdown yönünü ayarla
    $("#secondChain select").css({
      'transform-origin': 'top',
      'transform': 'scaleY(1)'
    });

    // Select elementlerine position relative ekle
    $("#firstChain select, #secondChain select").css('position', 'relative');

    $('#example1').chainedSelects({
      data: doctorJson,
      loggingEnabled: true,
      maxLevels: 5,
      onSelectedCallback: function(id) {
      }
    });

    $('#example2').chainedSelects({
      data: citiesJson,
      loggingEnabled: true,
      maxLevels: 5,
      onSelectedCallback: function(id) {
      }
    });
  } catch (error) {
    console.error('JSON verisi yüklenirken hata oluştu:', error);
  }
}

$(document).ready(function() {
  $("#load_json").on('click', loadJson);
  loadJson();
});

// Form bildirimleri için fonksiyonlar
function showSuccessAlert(title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    confirmButtonText: 'Tamam',
    confirmButtonColor: '#3465FD'
  });
}

function showErrorAlert(title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    confirmButtonText: 'Tamam',
    confirmButtonColor: '#3465FD'
  });
}

function showLoadingAlert(title) {
  Swal.fire({
    title: title,
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    }
  });
}

// Register form işlemi
function handleRegisterForm(event) {
  event.preventDefault();
  
  // Form elemanlarını al
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();
  const passwordConfirm = document.getElementById('passwordConfirm').value.trim();
  const terms = document.getElementById('terms').checked;
  const kvkk = document.getElementById('kvkk').checked;
  
  // Boş alan kontrolü
  if (!firstName || !lastName || !email || !phone || !password || !passwordConfirm) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen tüm alanları doldurunuz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Ad ve soyad minimum uzunluk kontrolü
  if (firstName.length < 2 || lastName.length < 2) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Ad ve soyad en az 2 karakter olmalıdır.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Email formatı kontrolü
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen geçerli bir e-posta adresi giriniz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Telefon numarası kontrolü (10 haneli)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen 10 haneli telefon numaranızı giriniz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Şifre uzunluk kontrolü
  if (password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Şifre en az 6 karakter olmalıdır.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Şifre eşleşme kontrolü
  if (password !== passwordConfirm) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Şifreler eşleşmiyor.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Kullanım şartları kontrolü
  if (!terms) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen Kullanım Şartlarını kabul ediniz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }
  if (!kvkk) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen KVKK kabul ediniz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }
  
  // Tüm validasyonlar başarılı ise loading göster
  showLoadingAlert('Kayıt yapılıyor...');
  
  // Simüle edilmiş form işlemi (3 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'Kayıt Başarılı!',
      'Hesabınız başarıyla oluşturuldu. Lütfen e-posta adresinize ve telefonunuza gönderilen kodları kullanarak hesabınızı aktifleştiriniz.'
    );
    
    // Confirmation sayfasına yönlendir
    setTimeout(() => {
      window.location.href = 'confirmation.html';
    }, 2000);
  }, 3000);
}

// Login form işlemi
function handleLoginForm(event) {
  event.preventDefault();
  
  // Form elemanlarını al
  const emailPhone = document.getElementById('emailPhone').value.trim();
  const password = document.getElementById('password').value.trim();
  
  // Boş alan kontrolü
  if (!emailPhone || !password) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen tüm alanları doldurunuz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Email/Telefon formatı kontrolü
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  
  const isValidEmail = emailRegex.test(emailPhone);
  const isValidPhone = phoneRegex.test(emailPhone.replace(/\D/g, ''));
  
  if (!isValidEmail && !isValidPhone) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen geçerli bir e-posta adresi veya 10 haneli telefon numarası giriniz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Şifre uzunluk kontrolü (minimum 6 karakter)
  if (password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Şifre en az 6 karakter olmalıdır.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }
  
  // Tüm validasyonlar başarılı ise loading göster
  showLoadingAlert('Giriş yapılıyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'Giriş Başarılı!',
      'Hoş geldiniz! Ana sayfaya yönlendiriliyorsunuz.'
    );
    
    // Ana sayfaya yönlendir
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 2000);
  }, 2000);
}

// Şifremi unuttum form işlemi
function handleForgotPasswordForm(event) {
  event.preventDefault();
  
  // Form elemanını al
  const emailPhone = document.getElementById('emailPhone').value.trim();
  
  // Boş alan kontrolü
  if (!emailPhone) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen e-posta adresinizi veya telefon numaranızı giriniz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Email/Telefon formatı kontrolü
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  
  const isValidEmail = emailRegex.test(emailPhone);
  const isValidPhone = phoneRegex.test(emailPhone.replace(/\D/g, ''));
  
  if (!isValidEmail && !isValidPhone) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen geçerli bir e-posta adresi veya 10 haneli telefon numarası giriniz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }
  
  // Tüm validasyonlar başarılı ise loading göster
  showLoadingAlert('İşleminiz yapılıyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'İşlem Başarılı!',
      'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol ediniz.'
    );
    
    // Login sayfasına yönlendir
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  }, 2000);
}

// Yeni şifre oluşturma form işlemi
function handleCreateNewPasswordForm(event) {
  event.preventDefault();
  
  // Form elemanlarını al
  const newPassword = document.getElementById('new-password').value.trim();
  const newPasswordAgain = document.getElementById('new-password-again').value.trim();
  
  // Boş alan kontrolü
  if (!newPassword || !newPasswordAgain) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen tüm alanları doldurunuz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Şifre uzunluk kontrolü (minimum 6 karakter)
  if (newPassword.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Yeni şifre en az 6 karakter olmalıdır.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Şifre eşleşme kontrolü
  if (newPassword !== newPasswordAgain) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Şifreler eşleşmiyor.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }
  
  // Tüm validasyonlar başarılı ise loading göster
  showLoadingAlert('İşleminiz yapılıyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'İşlem Başarılı!',
      'Şifreniz başarıyla değiştirildi. Giriş sayfasına yönlendiriliyorsunuz.'
    );
    
    // Login sayfasına yönlendir
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  }, 2000);
}

// Profil güncelleme form işlemi
function handleProfileUpdateForm(event) {
  event.preventDefault();
  
  // Form elemanlarını al
  const name = document.getElementById('name').value.trim();
  const surname = document.getElementById('surname').value.trim();
  const email = document.getElementById('profile-email').value.trim();
  const phone = document.getElementById('profile-number').value.trim();
  
  // Boş alan kontrolü
  if (!name || !surname || !email || !phone) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen tüm alanları doldurunuz.',
      confirmButtonColor: '#d33'
    });
    return;
  }

  // Email formatı kontrolü
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen geçerli bir email adresi giriniz.',
      confirmButtonColor: '#d33'
    });
    return;
  }

  // Telefon numarası kontrolü (10 haneli numara)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen geçerli bir telefon numarası giriniz (10 haneli).',
      confirmButtonColor: '#d33'
    });
    return;
  }
  
  // Tüm kontroller başarılıysa
  showLoadingAlert('Profiliniz güncelleniyor...');
  
  setTimeout(() => {
    showSuccessAlert(
      'Profil Güncellendi!',
      'Profil bilgileriniz başarıyla güncellendi.'
    );
  }, 2000);
}

// Güvenlik ayarları form işlemi
function handleSecuritySettingsForm(event) {
  event.preventDefault();
  
  // Form elemanlarını al
  const currentPassword = document.getElementById('password').value.trim();
  const newPassword = document.getElementById('new-password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();
  
  // Boş alan kontrolü
  if (!currentPassword || !newPassword || !confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen tüm alanları doldurunuz.',
      confirmButtonColor: '#d33'
    });
    return;
  }

  // Şifre eşleşme kontrolü
  if (newPassword !== confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Yeni şifreler eşleşmiyor.',
      confirmButtonColor: '#d33'
    });
    return;
  }

  // Şifre uzunluk kontrolü
  if (newPassword.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Yeni şifre en az 6 karakter olmalıdır.',
      confirmButtonColor: '#d33'
    });
    return;
  }
  
  // Tüm kontroller başarılıysa
  showLoadingAlert('Güvenlik ayarlarınız güncelleniyor...');
  
  setTimeout(() => {
    showSuccessAlert(
      'Güvenlik Ayarları Güncellendi!',
      'Güvenlik ayarlarınız başarıyla güncellendi.'
    );
  }, 2000);
}

// Hesap onaylama form işlemi
function handleConfirmationForm(event) {
  event.preventDefault();
  
  // Form elemanlarını al
  const emailCode = document.getElementById('email-code').value.trim();
  const phoneCode = document.getElementById('phone-code').value.trim();
  
  // Boş alan kontrolü
  if (!emailCode || !phoneCode) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen tüm alanları doldurunuz.',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  // Kod formatı kontrolü (6 haneli sayısal kod)
  const codeRegex = /^[0-9]{6}$/;
  
  if (!codeRegex.test(emailCode)) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen geçerli bir e-posta onay kodu giriniz (6 haneli).',
      confirmButtonColor: '#3465FD'
    });
    return;
  }

  if (!codeRegex.test(phoneCode)) {
    Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Lütfen geçerli bir telefon onay kodu giriniz (6 haneli).',
      confirmButtonColor: '#3465FD'
    });
    return;
  }
  
  // Tüm validasyonlar başarılı ise loading göster
  showLoadingAlert('Hesabınız onaylanıyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'Hesap Onaylandı!',
      'Hesabınız başarıyla onaylandı. Giriş sayfasına yönlendiriliyorsunuz.'
    );
    
    // Login sayfasına yönlendir
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  }, 2000);
}

// Yorum gönderme işlemi
function handleCommentForm(event) {
  event.preventDefault();
  
  const rating = document.querySelector('input[name="rating"]:checked');
  const comment = document.querySelector('textarea').value;
  
  if (!rating) {
    showErrorAlert(
      'Hata!',
      'Lütfen bir puan seçiniz.'
    );
    return;
  }
  
  if (!comment.trim()) {
    showErrorAlert(
      'Hata!',
      'Lütfen bir yorum yazınız.'
    );
    return;
  }
  
  showLoadingAlert('Yorumunuz gönderiliyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'Yorum Gönderildi!',
      'Değerlendirmeniz için teşekkür ederiz.'
    );
    
    // Formu temizle
    document.querySelector('textarea').value = '';
    document.querySelector('#anonimCheck').checked = false;
    // Radio inputları ve yıldızları temizle
    const stars = document.querySelectorAll('.star-rating');
    stars.forEach(star => {
      star.classList.remove('fa-solid');
      star.classList.add('fa-regular');
    });
    rating.checked = false;
  }, 2000);
}

// Daha önce yorum yapıldığını kontrol et
function checkPreviousComment() {
  // Simüle edilmiş kontrol
  const hasComment = true; // Bu değer backend'den gelecek
  
  if (hasComment) {
    Swal.fire({
      title: 'Daha Önce Yorum Yaptınız',
      text: 'Bu hastane için daha önce bir değerlendirme yapmışsınız.',
      icon: 'warning',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#3465FD'
    });
  }
}


// Örnek hastane verisi oluşturma fonksiyonu
function createHospitalData(index) {
  return {
    name: `Memorial ${index}`,
    image: '/SaglikPusulam/assets/img/Memori.jpg',
    status: 'Kapalı',
    address: 'Adres',
    department: 'Bölümü',
    description: 'Lorem ipsum dolor sit amet consectetur. Ut non diam a ut nunc pulvinar massa.',
    rating: 5,
    reviews: 137
  };
}

// Hastane kartı HTML'i oluşturma
function createHospitalCard(hospital) {
  return `
    <div class="col-12">
      <div class="hospital-card card mb-4 border rounded-3 shadow-sm">
        <div class="row g-0">
          <div class="col-md-3">
            <img src="${hospital.image}" class="img-fluid rounded-start h-100 object-fit-cover" alt="${hospital.name}">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <div class="d-flex flex-wrap justify-content-between align-items-start mb-3">
                <h5 class="card-title mb-2 mb-md-0">${hospital.name}</h5>
                <div class="action-buttons d-flex gap-3">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="no-style d-flex gap-2">
                      <a href="javascript:void(0);" class="toggle-container">
                        <i class="fa-regular fa-heart toggle-heart action-buttons" onclick="toggleHeart(this)"></i>
                      </a>
                      <a href="javascript:void(0);" class="toggle-container">
                        <i class="fa-solid fa-shuffle toggle-compare action-buttons" onclick="toggleCompare(this)"></i>
                      </a>
                      <a href="javascript:void(0);" class="toggle-container">
                        <i class="fa-solid fa-share-nodes toggle-share action-buttons" onclick="toggleShare(this)"></i>
                      </a>
                    </div>
                  </div>
                <div class="hospital-info d-flex flex-wrap gap-4 mb-3">
                  <span><i class="fa-regular fa-calendar"></i> ${hospital.status}</span>
                  <span><i class="fa-solid fa-location-dot"></i> ${hospital.address}</span>
                  <span><i class="fa-solid fa-user-doctor"></i> ${hospital.department}</span>
                </div>
                <p class="card-text mb-3">${hospital.description}</p>
                <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div class="rating">
                    ${Array(hospital.rating).fill('<i class="fa-solid fa-star text-warning"></i>').join('')}
                    <span class="ms-2 text-muted">(${hospital.reviews} Değerlendirme)</span>
                  </div>
                  <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary rounded-pill" onclick="location.href='/SaglikPusulam/pages/details.html'">Detay</button>
                    <button class="btn btn-primary rounded-pill">Randevu Al</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Arama sonuçlarını gösterme
async function showSearchResults() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const subcategory = urlParams.get('subcategory');
  totalResults = parseInt(urlParams.get('total')) || 4;
  
  /*
  // API'den ilk sayfa verilerini al
  const response = await fetchSearchResults(category, subcategory, page);
  totalResults = response.total;*/
  
  // Sonuç sayısını göster
  Swal.fire({
    icon: 'info',
    title: 'Arama Sonuçları',
    text: `"${category || 'Tüm Kategoriler'}" kategorisinde ${totalResults} sonuç bulundu.`,
    confirmButtonColor: '#3465FD',
    timer: 3000,
    position: 'top-end',
    toast: true,
    showConfirmButton: false
  });

  // Scroll event listener ekle
  window.addEventListener('scroll', handleScroll);
}

// Scroll olayını yönetme
function handleScroll() {
  if (loading || !hasMore) return;

  const resultsContainer = document.querySelector('.search-results');
  if (!resultsContainer) return;

  // Sayfanın en altına ne kadar yakın olduğumuzu kontrol et
  const scrollPosition = window.innerHeight + window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollThreshold = 200; // Eşik değerini artıralım

  console.log('Scroll Position:', scrollPosition);
  console.log('Document Height:', documentHeight);
  console.log('Threshold:', scrollThreshold);
  console.log('Is Near Bottom:', scrollPosition + scrollThreshold >= documentHeight);

  if (scrollPosition + scrollThreshold >= documentHeight) {
    console.log('Loading more results...'); // Debug için
    loadMoreResults();
  }
}


// Daha fazla sonuç yükleme
async function loadMoreResults() {
  if (loading || !hasMore) return; // hasMore kontrolünü ekleyelim
  loading = true;

  // Yükleniyor göstergesini göster ve kartları blurla
  const loadingMore = document.getElementById('loadingMore');
  const resultsContainer = document.querySelector('.search-results');
  
  if (loadingMore && resultsContainer) {
    // Kartları blurla
    resultsContainer.style.filter = 'blur(2px)';
    resultsContainer.style.opacity = '0.7';
    // Loading spinner'ı göster
    loadingMore.classList.remove('d-none');
  }

  try {
    // API'ye istek at
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');

    const response = await fetch(`/api/loadmore?page=${page}&category=${category}&subcategory=${subcategory}`);
    const data = await response.json();

    // Gelen verileri ekle
    if (resultsContainer && data.results) {
      if (data.results.length === 0) {
        hasMore = false;
        // Sadece scroll ile tetiklendiyse bildirim göster
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
          Swal.fire({
            icon: 'info',
            title: 'Bilgi',
            text: 'Daha fazla sonuç bulunamadı.',
            confirmButtonColor: '#3465FD',
            timer: 3000,
            position: 'top-end',
            toast: true,
            showConfirmButton: false
          });
        }
      } else {
        // Sonuçları ekle
        data.results.forEach(hospital => {
          const card = createHospitalCard(hospital);
          resultsContainer.appendChild(card);
        });
        page++;
      }
    }

    // Mevcut kart sayısını kontrol et
    const currentCards = document.querySelectorAll('.hospital-card').length;
    if (currentCards >= totalResults) {
      hasMore = false;
    }

  } catch (error) {
    console.error('Sonuçlar yüklenirken hata:', error);
    hasMore = false;
    // Sadece scroll ile tetiklendiyse hata bildirimi göster
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Sonuçlar yüklenirken bir hata oluştu.',
        confirmButtonColor: '#3465FD',
        timer: 3000,
        position: 'top-end',
        toast: true,
        showConfirmButton: false
      });
    }
  } finally {
    // Her durumda loading spinner'ı gizle ve blur'ı kaldır
    if (loadingMore && resultsContainer) {
      setTimeout(() => {
        loadingMore.classList.add('d-none');
        resultsContainer.style.filter = 'none';
        resultsContainer.style.opacity = '1';
        loading = false;
      }, 500);
    }
  }
}
// Yıldız tıklama olayını yönet
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star-label input[type="radio"]');
  
  stars.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const rating = parseInt(e.target.value);
      const allStars = document.querySelectorAll('.star-rating');
      
      // Tüm yıldızları boş yap
      allStars.forEach(star => {
        star.classList.remove('fa-solid');
        star.classList.add('fa-regular');
      });
      
      // Seçilen yıldıza kadar doldur
      for (let i = 0; i < rating; i++) {
        allStars[i].classList.remove('fa-regular');
        allStars[i].classList.add('fa-solid');
      }
      
      // Bildirim göster
      Swal.fire({
        title: 'Başarılı!',
        text: `Puanınız (${rating} yıldız) başarıyla kaydedildi.`,
        icon: 'success',
        confirmButtonText: 'Tamam',
        confirmButtonColor: '#3465FD'
      });
    });
  });
  
  // Hover efekti
  const starContainer = document.querySelector('.star-container');
  const starLabels = document.querySelectorAll('.star-label');
  
  starContainer.addEventListener('mousemove', (e) => {
    const containerRect = starContainer.getBoundingClientRect();
    const relativeX = e.clientX - containerRect.left;
    const containerWidth = containerRect.width;
    const starCount = Math.ceil((relativeX / containerWidth) * 5);
    
    const stars = document.querySelectorAll('.star-rating');
    stars.forEach((star, i) => {
      if (i < starCount) {
        star.classList.remove('fa-regular');
        star.classList.add('fa-solid');
      } else {
        star.classList.remove('fa-solid');
        star.classList.add('fa-regular');
      }
    });
  });
  
  starContainer.addEventListener('mouseleave', () => {
    const checkedValue = document.querySelector('input[name="rating"]:checked')?.value || 0;
    const stars = document.querySelectorAll('.star-rating');
    stars.forEach((star, i) => {
      if (i < checkedValue) {
        star.classList.remove('fa-regular');
        star.classList.add('fa-solid');
      } else {
        star.classList.remove('fa-solid');
        star.classList.add('fa-regular');
      }
    });
  });
});

// Yorum gönderme işlemi
function handleCommentForm(event) {
  event.preventDefault();
  
  const rating = document.querySelector('input[name="rating"]:checked');
  const comment = document.querySelector('textarea').value;
  
  if (!rating) {
    showErrorAlert(
      'Hata!',
      'Lütfen bir puan seçiniz.'
    );
    return;
  }
  
  if (!comment.trim()) {
    showErrorAlert(
      'Hata!',
      'Lütfen bir yorum yazınız.'
    );
    return;
  }
  
  showLoadingAlert('Yorumunuz gönderiliyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'Yorum Gönderildi!',
      'Değerlendirmeniz için teşekkür ederiz.'
    );
    
    // Formu temizle
    document.querySelector('textarea').value = '';
    document.querySelector('#anonimCheck').checked = false;
    // Radio inputları ve yıldızları temizle
    const stars = document.querySelectorAll('.star-rating');
    stars.forEach(star => {
      star.classList.remove('fa-solid');
      star.classList.add('fa-regular');
    });
    rating.checked = false;
  }, 2000);
}
function showCommentsLoading() {
  const loader = document.getElementById('commentsLoader');
  const commentsList = document.querySelector('.comments-list');
  
  if (loader && commentsList) {
    // Yorumları gizle
    commentsList.style.opacity = '0.5';
    
    // Loading göster
    loader.classList.remove('d-none');
    
    // 1 saniye sonra gizle ve yorumları göster
    setTimeout(() => {
      loader.classList.add('d-none');
      commentsList.style.opacity = '1';
    }, 1000);
  }
  
  return false; // Sayfanın scroll olmasını engelle
}