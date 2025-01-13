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


