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
function handleSearchResults(results) {
  if (results.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Sonuç Bulunamadı',
      text: 'Aramanızla eşleşen sonuç bulunamadı. Lütfen farklı anahtar kelimeler deneyin.',
      confirmButtonText: 'Tamam'
    });
  } else if (results.length > 20) {
    Swal.fire({
      icon: 'info',
      title: 'Çok Fazla Sonuç',
      text: 'Aramanız çok fazla sonuç döndürdü. Daha spesifik aramak ister misiniz?',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır'
    }).then((result) => {
      if (result.isConfirmed) {
        // Focus on search input
        document.querySelector('#searchInput').focus();
      }
    });
  }
}

// Search results notification
function showSearchResults() {
  console.log('showSearchResults fonksiyonu başladı');
  // Arama sonuçlarını say
  const searchResults = document.querySelectorAll('.hospital-card').length;
  console.log('Bulunan sonuç sayısı:', searchResults);
  
  Swal.fire({
    title: 'Arama Sonuçları',
    text: `${searchResults} adet sonuç bulundu`,
    icon: 'info',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 7000,
    timerProgressBar: true
  });
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
        console.log("chain1 selected option", id);
      }
    });

    $('#example2').chainedSelects({
      data: citiesJson,
      loggingEnabled: true,
      maxLevels: 5,
      onSelectedCallback: function(id) {
        console.log("chain2 selected option", id);
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
  
  showLoadingAlert('İşleminiz yapılıyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'E-posta Gönderildi!',
      'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.'
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
  
  showLoadingAlert('Şifreniz güncelleniyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
  setTimeout(() => {
    showSuccessAlert(
      'Şifre Güncellendi!',
      'Şifreniz başarıyla güncellendi. Giriş sayfasına yönlendiriliyorsunuz.'
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
  
  showLoadingAlert('Profiliniz güncelleniyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
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
  
  showLoadingAlert('Güvenlik ayarlarınız güncelleniyor...');
  
  // Simüle edilmiş form işlemi (2 saniye)
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
  
  const emailCode = document.getElementById('emailCode').value;
  const phoneCode = document.getElementById('phoneCode').value;
  
  if (!emailCode || !phoneCode) {
    showErrorAlert(
      'Hata!',
      'Lütfen hem e-posta hem de telefon onay kodlarını giriniz.'
    );
    return;
  }
  
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
    document.querySelector('input[name="rating"]:checked').checked = false;
    document.querySelector('#anonimCheck').checked = false;
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

// Sayfa değişkenleri
let page = 1;
let loading = false;
let hasMore = true;

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
  `;
}

// Arama sonuçlarını gösterme
async function showSearchResults() {
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer) return;

  // URL'den parametreleri al
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const subcategory = urlParams.get('subcategory');

  // İlk yüklemede 4 sonuç göster
  await loadMoreResults();

  // Scroll event listener ekle
  window.addEventListener('scroll', handleScroll);
}

// Scroll olayını yönetme
function handleScroll() {
  const loadingMore = document.getElementById('loadingMore');
  if (!loadingMore || loading || !hasMore) return;

  const rect = loadingMore.getBoundingClientRect();
  const isNearBottom = rect.top <= window.innerHeight + 100;

  if (isNearBottom) {
    loadMoreResults();
  }
}

// Daha fazla sonuç yükleme
async function loadMoreResults() {
  if (loading || !hasMore) return;
  loading = true;

  // Yükleniyor göstergesini göster
  const loadingMore = document.getElementById('loadingMore');
  loadingMore.classList.remove('d-none');

  try {
    // API çağrısı simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Her seferinde 4 yeni sonuç ekle
    const resultsContainer = document.getElementById('searchResults');
    const startIndex = (page - 1) * 4;
    
    // Örnek veri - normalde API'den gelecek
    for (let i = 0; i < 4; i++) {
      const hospital = createHospitalData(startIndex + i + 1);
      const cardHtml = createHospitalCard(hospital);
      resultsContainer.insertAdjacentHTML('beforeend', cardHtml);
    }

    // Sayfa numarasını artır
    page++;

    // 5 sayfadan sonra daha fazla veri olmadığını varsayalım
    if (page > 5) {
      hasMore = false;
      loadingMore.classList.add('d-none');
    }
  } catch (error) {
    console.error('Sonuçlar yüklenirken hata:', error);
  } finally {
    loading = false;
    if (hasMore) {
      loadingMore.classList.add('d-none');
    }
  }
}

// Yıldız tıklama olayını yönet
function handleStarClick(rating, clickedStar) {
  // Tüm yıldızları seç
  const stars = document.querySelectorAll('.star-rating');
  
  // Tüm yıldızları boş yap
  stars.forEach(star => {
    star.classList.remove('fa-solid');
    star.classList.add('fa-regular');
  });
  
  // Seçilen yıldıza kadar doldur (soldan sağa)
  for (let i = 0; i < rating; i++) {
    stars[i].classList.remove('fa-regular');
    stars[i].classList.add('fa-solid');
  }
  
  // Puanı kaydet ve bildirim göster
  Swal.fire({
    title: 'Başarılı!',
    text: `Puanınız (${rating} yıldız) başarıyla kaydedildi.`,
    icon: 'success',
    confirmButtonText: 'Tamam',
    confirmButtonColor: '#3465FD'
  });
}

// Yıldız hover efekti
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star-rating');
  
  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
      // Hover yapılan yıldıza kadar doldur (soldan sağa)
      for (let i = 0; i <= index; i++) {
        stars[i].classList.remove('fa-regular');
        stars[i].classList.add('fa-solid');
      }
    });

    star.addEventListener('mouseout', () => {
      // Seçili olmayan yıldızları boşalt
      stars.forEach(s => {
        if (!s.classList.contains('selected')) {
          s.classList.remove('fa-solid');
          s.classList.add('fa-regular');
        }
      });
    });
  });
});
