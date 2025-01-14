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
  // İkonun kırmızı olup olmadığını kontrol et
  element.classList.toggle('red'); // Kırmızı rengi ekle/kaldır
  element.classList.toggle('fa-solid'); // İkon tipi değiştir
  element.classList.toggle('fa-regular'); // İkon tipi değiştir
}
function toggleCompare(element) {
  element.classList.toggle('green');
}
function toggleShare(element) {
  element.classList.toggle('orange');
}


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
