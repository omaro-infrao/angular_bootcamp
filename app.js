var app = angular.module("catalogApp", []);

// Ajout du filtre unique
app.filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});

app.controller('mainCtrl', function($scope) {
    $scope.products = [
        { id: 1, name: "Pomme", price: 0.5, category: "Fruits", description: "Une belle pomme rouge" },
        { id: 2, name: "Coca-Cola", price: 1.2, category: "Boissons", description: "Canette de 33cl" },
        { id: 3, name: "Clé USB 16Go", price: 8.99, category: "Électronique", description: "USB 3.0 rapide" }
      ];

    // Initialisation du panier depuis le localStorage
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.selectedCategory = '';

    // Fonction pour sauvegarder le panier dans le localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    }

    $scope.addProduct = function(product) {
        $scope.cart.push(product);
        saveCartToLocalStorage(); // Sauvegarde après ajout
        console.log('Produit ajouté:', product);
        console.log('Panier:', $scope.cart);
    };

    $scope.removeFromCart = function(index) {
        $scope.cart.splice(index, 1);
        saveCartToLocalStorage(); // Sauvegarde après suppression
    };

    $scope.clearCart = function() {
        $scope.cart = [];
        saveCartToLocalStorage(); // Sauvegarde après vidage
    };

    $scope.getTotal = function() {
        return $scope.cart.reduce(function(total, item) {
            return total + item.price;
        }, 0);
    };
});
