/**
* Kalp butonunu tıklatır ve butonun rengini değiştir, bu sayede kalp butonu dolu
* olması  durumunu tersine çevirir.
* @param {HTMLElement} element - Buton elementi
 */

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

function loadJson() {
  $("form select").remove();

  $("#firstChain").append($("<select name=\"example1\" class=\"form-select px-5\" style=\"height: 45px;\" id=\"example1\" ></select>"));
  $("#secondChain").append($("<select name=\"example2\" class=\"form-select px-5\" style=\"height: 45px;\" id=\"example2\"></select>"));


  json = {
    "Hizmet Seçiniz..": { 
    },
    "Hastaneler": {
    },
    "Kliniklikler": {
    },
    "Doktorlar": {
      "Uzmanlık Seçiniz..": {
      },
      "Fizyoterapist": {
      },
      "Psikoterapist": {
      }
    }
  };
  //     chainedData1 = JSON.parse($("#json").val());
  // chainedData2 = JSON.parse($("#json").val());
  chainedData1 = json;
  chainedData2 = json;

  $('#example1').chainedSelects({
    data: chainedData1,
    loggingEnabled: true,
    'onSelectedCallback': function (id) { if (console !== undefined) { console.log("chain1 selected option", id); } },
  });

  $('#example2').chainedSelects({
    data: chainedData2,
    loggingEnabled: true,
    'onSelectedCallback': function (id) { if (console !== undefined) { console.log("chain2 selected option", id); } },
  });

}

$(function () {
  $("#load_json").on('click', loadJson);
  loadJson();
});
