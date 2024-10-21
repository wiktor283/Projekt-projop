let selectedCoin = null;
let selectedProduct = '';
let balance = 0;

// Funkcja do wybierania monety
function selectCoin(amount) {
    selectedCoin = amount;
    updateMessage(`Wybrano: ${amount} PLN. Kliknij, aby wrzucić monetę.`);
}

function updateMessage(message) {
    document.getElementById('message').textContent = message;
}


// Funkcja do wrzucenia monety
function resetCoinAnimation() {
    const coin = document.getElementById('coin');
    coin.style.animation = 'none';
    coin.offsetHeight; // Reset animacji
    coin.style.animation = 'dropCoin 1s forwards';
}

function hideCoin() {
    setTimeout(() => {
        document.getElementById('coin').style.opacity = 0;
    }, 1000);
}

function insertCoin() {
    resetCoinAnimation();
    hideCoin();
    // Zwiększenie salda
    balance += selectedCoin;
    
    // Ukrycie monety po zakończeniu animacji
    setTimeout(() => {
        coin.style.opacity = 0; // Moneta znika po animacji
        document.getElementById('message').textContent = `Saldo: ${balance} PLN`;
    }, 1000); // Czas na zakończenie animacji
}

// Funkcja do wprowadzania numeru produktu
function enterNumber(number) {
    if (selectedProduct.length < 2) {  
        selectedProduct += number;
        updateMessage(`Wybrano: ${selectedProduct}`);
        
        // Sprawdzanie produktu tylko po wybraniu 2 cyfr
        if (selectedProduct.length === 2) {
            checkProduct();
        }
    }
}


// Funkcja do sprawdzenia produktu po zakończeniu sekwencji
function checkProduct() {
    // Lista dostępnych produktów z cenami
    const products = {
        '11': { name: 'Snickers', price: 5 },
        '12': { name: 'Mars', price: 4 },
        '13': { name: 'Twix', price: 4 },
        '21': { name: 'Chipsy', price: 3 },
        '22': { name: 'Coca-Cola', price: 6 },
        '23': { name: 'Sprite', price: 6 },
        '31': { name: 'Woda', price: 3 },
        '32': { name: 'Sok', price: 4 },
        '33': { name: 'Kawa', price: 7 },
    };
    
    const selected = products[selectedProduct];

    if (!selected) {
        document.getElementById('message').textContent = `Nie ma takiego produktu. Wybierz ponownie.`;
        selectedProduct = '';
        return;
    }

    // Sprawdzenie, czy saldo jest wystarczające
    if (balance >= selected.price) {
        balance -= selected.price;
        document.getElementById('message').textContent = `Zakupiono ${selected.name}. Saldo: ${balance} PLN.`;
    } else {
        document.getElementById('message').textContent = `Za mało środków na ${selected.name}. Brakuje ${selected.price - balance} PLN.`;
    }

    selectedProduct = ''; // Resetowanie wyboru produktu po zakupie
}

