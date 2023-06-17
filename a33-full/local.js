function initMap() {
    // Cria um novo objeto Geocoder
    var geocoder = new google.maps.Geocoder();

    // Obtém a localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Converte as coordenadas de latitude e longitude em um endereço
            geocoder.geocode({ 'location': location }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        var address = results[0].formatted_address;
                        console.log('Endereço do usuário:', address, location);
                    } else {
                        console.log('Nenhum resultado encontrado.');
                    }
                } else {
                    console.log('Geocoder falhou devido a:', status);
                }
            });
        }, function () {
            console.log('Falha ao obter a localização do usuário.');
        });
    } else {
        console.log('Navegador não suporta geolocalização.');
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Criar um objeto Geocoder
            var geocoder = new google.maps.Geocoder();

            // Criar uma nova LatLng com as coordenadas
            var latLng = new google.maps.LatLng(latitude, longitude);

            // Chamar o método geocode passando a LatLng e uma função de retorno de chamada
            geocoder.geocode({ 'location': latLng }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        var addressComponents = results[0].address_components;
                        var state, country;

                        // Iterar pelos componentes do endereço
                        for (var i = 0; i < addressComponents.length; i++) {
                            var component = addressComponents[i];

                            // Verificar o tipo de componente para obter o estado ou país
                            if (component.types.includes('administrative_area_level_1')) {
                                state = component.long_name; // Obtém o estado
                            }
                            if (component.types.includes('country')) {
                                country = component.long_name; // Obtém o país
                            }
                        }

                        console.log('Estado:', state);
                        console.log('País:', country);

                        // Exibe a localização na div do HTML
                        var locationResult = document.getElementById('locationResult');
                        locationResult.style.display = 'block';
                        locationResult.innerHTML = 'Estado: ' + state + '<br>País: ' + country;
                    } else {
                        console.log('Nenhum resultado encontrado.');
                    }
                } else {
                    console.log('Geocoder falhou devido a:', status);
                }
            });
        }, function () {
            console.log('Falha ao obter a localização do usuário.');
        });
    } else {
        console.log('Geolocalização não é suportada pelo seu navegador.');
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error('Usuário negou a solicitação de geolocalização.');
            // Exibir mensagem de erro para o usuário
            break;
        case error.POSITION_UNAVAILABLE:
            console.error('Localização indisponível.');
            // Exibir mensagem de erro para o usuário
            break;
        case error.TIMEOUT:
            console.error('Tempo esgotado para obter a localização.');
            // Exibir mensagem de erro para o usuário
            break;
        case error.UNKNOWN_ERROR:
            console.error('Erro desconhecido ao obter a localização.');
            // Exibir mensagem de erro para o usuário
            break;
    }
}

// Event listener para o botão de obtenção da localização
var getLocationButton = document.getElementById('getLocationButton');
getLocationButton.addEventListener('click', getLocation);
