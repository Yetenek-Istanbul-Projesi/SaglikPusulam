# SağlıkPusulam 🏥
**Version 1.2.1**

Sağlık kuruluşlarını kolayca bulmanızı ve karşılaştırmanızı sağlayan modern bir web uygulaması şablonu.

**[Canlı Demo](https://yetenek-istanbul-projesi.github.io/SaglikPusulam/)** 

## 🚀 Özellikler

### Arama ve Filtreleme
- 🔍 Hastane türüne göre arama
- 📍 Şehir bazlı filtreleme
- 👨‍⚕️ Uzmanlık alanına göre doktor arama
- 🏥 Klinik türüne göre filtreleme

### Hastane Yönetimi
- ⭐ 5 yıldızlı puanlama sistemi
- 📊 Detaylı hastane karşılaştırma
- ❤️ Favori hastaneleri kaydetme
- 📱 Sosyal medya paylaşımı

### Kullanıcı Sistemi
- 👤 Kullanıcı profil yönetimi
- 🔒 Güvenli giriş sistemi
- 📧 E-posta/SMS doğrulama
- 🔑 Şifre sıfırlama

### Blog Sistemi
- 📝 12 farklı blog yazısı
- 🔍 Blog arama
- 📱 Responsive blog tasarımı

### Teknik Özellikler
- 📱 Responsive tasarım
- 💻 Modern web teknolojileri (HTML5, CSS3, JavaScript, Bootstrap 5.3)
- 🖼️ Gelişmiş görsel sunum (Font Awesome, SweetAlert2, Hover Css)

---

## 📂 Proje Yapısı
```
SaglikPusulam/
├── account/               # Kullanıcı hesap işlemleri sayfaları
│   ├── login.html         # Giriş
│   ├── register.html      # Kayıt
│   ├── forgot-password.html # Şifre sıfırlama
│   ├── confirmation.html  # Hesap onaylama
│   ├── create-new-password.html  # Yeni şifre oluşturma
│   └── profile/           # Profil sayfaları
├── assets/               # Statik dosyalar (resimler, ikonlar vb.)
│   ├── img/              # Görseller
│   └── fonts/            # Yazı tipleri
├── css/                  # Stil dosyaları
│   ├── style.css         # Ana stil dosyası
│   ├── profile.css       # Profil sayfası stilleri
│   ├── hover-min.css       # Hover stilleri
│   └── sweetalert2.min.css
├── data/                 # JSON veri dosyaları
├── js/                   # JavaScript dosyaları
│   ├── main.js           # Ana JavaScript dosyası
│   ├── loader.js         # Loader
│   ├── jquery-3.7.1.min.js    # Jquery
│   ├── jquery.chained.selects.js  # Jquery Multi Dropdown
│   └── sweetalert2.min.js # SweetAlert2
├── pages/                # Temel sayfalar
│   ├── about-us.html     # Hakkımızda
│   ├── blog.html         # Blog
│   ├── contact.html      # İletişim
│   ├── kvkk.html      # Kişisel Verilerin Korunması Kanunu (KVKK)
│   ├── details.html      # Sağlık hizmeti detay
│   ├── 404.html      # Sayfa bulunamadı
│   ├── terms-of-use.html      # Kullanım Şartları
│   ├── sss.html      # Sıkça Sorulan Sorular
│   ├── search-results.html # Arama sonuçları
│   └── blog/          # Blog sayfaları
├── index.html            # Ana sayfa
├── LICENSE.txt           # Lisans dosyası
└── README.md             # Proje dökümanı
```

---

## 📌 Sayfalar ve Rotalar

### Ana Sayfalar
- `/index.html` - Ana sayfa
- `/pages/about-us.html` - Hakkımızda
- `/pages/contact.html` - İletişim
- `/pages/sss.html` - Sıkça Sorulan Sorular
- `/pages/search-results.html` - Arama Sonuçları
- `/pages/details.html` - Hizmet Detayları

### Hesap Yönetimi
- `/account/login.html` - Giriş
- `/account/register.html` - Kayıt
- `/account/forgot-password.html` - Şifre Sıfırlama
- `/account/confirmation.html` - Hesap Onaylama

### Profil Yönetimi
- `/account/profile/index.html` - Profil Ana Sayfa
- `/account/profile/security.html` - Güvenlik Ayarları
- `/account/profile/favorite-list.html` - Favoriler
- `/account/profile/compare-list.html` - Karşılaştırma Listesi

### Yasal
- `/pages/terms-of-use.html` - Kullanım Şartları
- `/pages/kvkk.html` - KVKK

---

## 🆕 v1.2 Güncellemeler

### Yeni Özellikler
- ✨ SweetAlert2 ile geliştirilmiş kullanıcı bildirimleri
- 🔄 Modernize edilmiş form tasarımı
- 📱 İyileştirilmiş responsive tasarım
- 🔍 Hizmet Ara filtrelemesi
- 📝 Blog Sayfaları

### Teknik İyileştirmeler
- 📊 JavaScript ve CSS optimizasyonları
- 🗺️ Görsel varlık güncellemeleri
- ⚡ Performans geliştirmeleri
- 📱 Mobil Görünüm iyileştirmeleri

---

## 🆕 v1.1 Güncellemeler  

### Yeni Özellikler  
- ✨ Sağlık temalı yükleme animasyonu  
- 🔄 İyileştirilmiş navigasyon  
- 📱 Optimize edilmiş kullanıcı arayüzü  
- 🔍 Geliştirilmiş arama fonksiyonu  

### Teknik İyileştirmeler  
- 📊 JSON veri yapısı optimizasyonu  
- 🗺️ Güncellenmiş il/ilçe verileri  
- 🎯 Dinamik form geliştirmeleri  
- ⚡ Performans iyileştirmeleri  

## 📋 Yapılacaklar  
- [ ] Mobil görünüm iyileştirmeleri  
- [ ] Form validasyonları  
- [ ] Performans optimizasyonları  
- [ ] Kullanıcı deneyimi geliştirmeleri  


## 🔧 Kurulum

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/SaglikPusulam.git
   ```
2. Proje dizinine gidin:
   ```bash
   cd SaglikPusulam
   ```
3. Bağımlılıklar CDN üzerinden yüklendiği için ek kurulum gerekmez.
4. Projeyi bir web sunucusu ile çalıştırın.

---

## 🤝 Katkıda Bulunma
1. Fork edin.
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`).
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`).
4. Branch'inizi push edin (`git push origin feature/amazing-feature`).
5. Pull Request açın.

---

## 📝 Lisans
Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için LICENSE.txt dosyasına bakınız.

---

## 📞 İletişim  
Proje Sahibi - **teams -> @yetenekistka**  
Proje Linki: [[https://github.com/Yetenek-Istanbul-Projesi/SaglikPusulam](https://github.com/Yetenek-Istanbul-Projesi/SaglikPusulam)] 

⭐ Yetenek İstanbul Ekibi tarafından geliştirilmiştir  

---

## 🙏 Teşekkürler
- Bootstrap ekibine
- Font Awesome ekibine
- Istanbul Gedik üniversitesine
- Yetenek ISTKA ekibine
- SweetAlert2 geliştiricilerine
- Tüm katkıda bulunanlara
