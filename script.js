// Funkcja asynchroniczna do pobierania danych pogodowych
async function getWeather() {
    // Pobiera nazwę miasta z pola tekstowego
    const cityName = document.getElementById('cityName').value;
    // Pobiera wybrany język z pola wyboru języka
    const language = document.getElementById('language').value;
    // Ustawia klucz API
    const apiKey = 'c8b6885dc4c8c7d15c1ed48775e91e57';
    // Utwórz URL zapytania do API OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=${language}`;

    try {
        // Wykonuje zapytanie HTTP do API OpenWeatherMap
        const response = await fetch(url);
        // Sprawdza, czy odpowiedź jest poprawna
        if (!response.ok) {
            // Jeśli odpowiedź nie jest poprawna, wyświetl komunikat błędu
            throw new Error(`Miasto nie znalezione: ${response.status}`);
        }
        // Jeśli odpowiedź jest poprawna, pobierz dane JSON
        const data = await response.json();
        // Wyświetla dane pogodowe na stronie
        displayWeather(data);
    } catch (error) {
        // Jeśli wystąpił błąd, wyświetl komunikat błędu w konsoli i na stronie
        console.error('Błąd podczas pobierania danych pogodowych:', error);
        document.getElementById('weatherResult').innerText = 'Błąd podczas pobierania danych pogodowych. Sprawdź nazwę miasta.';
    }
    // Wywołaje funkcję do ładowania galerii
    loadGallery(); // Przeniesione wywołanie loadGallery() do getWeather()
}

// Funkcja do wyświetlania danych pogodowych na stronie
function displayWeather(data) {
    // Pobiera potrzebne dane z obiektu danych
    const { name, main, weather } = data;
    // Wyświetla dane pogodowe na stronie
    document.getElementById('weatherResult').innerHTML = `
        <h2>Pogoda w ${name}</h2>
        <p>Temperatura: ${main.temp}°C</p>
        <p>Odczuwalna jako: ${main.feels_like}°C</p>
        <p>Warunki pogodowe: ${weather[0].description}</p>
    `;
}

// Nasłuchuj zdarzenia DOMContentLoaded, aby wykonać kod po załadowaniu struktury HTML
document.addEventListener('DOMContentLoaded', () => {
    // Pobierz element wyboru języka
    const languageSelect = document.getElementById('language');
    // Pobiera kontener galerii
    const gallery = document.getElementById('gallery');

    // Funkcja do ładowania galerii
    function loadGallery() {
        // Pobiera wybrany język z pola wyboru języka
        const selectedLanguage = languageSelect.value;
        // Wyczyśća zawartość galerii przed ponownym załadowaniem
        gallery.innerHTML = '';

        // Tablica zawierająca adresy URL obrazów w galerii
        const images = [
            'images/img1(1).jpg',
            'images/img1(2).jpg',
            'images/img1(3).jpg',
            'images/img1(4).jpg',
            'images/img1(5).jpg',
            'images/img1(6).jpg',
            'images/img1(7).jpg',
            'images/img1(8).jpg',
            'images/img1(9).jpg',
            'images/img1(10).jpg',
            'images/img1(11).jpg',
            'images/img1(12).jpg'
        ];

        // Iteruj przez tablicę obrazów i dodaj je do galerii
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = `Image ${image}`;
            gallery.appendChild(imgElement);
        });

        // Inicjalizuj slider Slick dla galerii
        $('.gallery').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }

    // Nasłuchuj na zmianę języka i ponownie ładować galerię
    languageSelect.addEventListener('change', loadGallery);

    // Załaduje galerię po załadowaniu struktury HTML
    loadGallery();
});
