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
        { id: 1, name: "Pomme", price: 0.5, category: "Fruits", description: "Une belle pomme rouge", imageUrl: "https://media.istockphoto.com/id/185262648/fr/photo/pomme-rouge-avec-feuilles-isol%C3%A9-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=TtNNNtMUUeTKY4ug3KdwnxHxRQMRyIjgZpOChBWycTU=" },
        { id: 2, name: "Coca-Cola", price: 1.2, category: "Boissons", description: "Canette de 33cl", imageUrl : "https://i.ebayimg.com/images/g/vEEAAOSw7L1Zwmg-/s-l1200.png" },
        { id: 3, name: "Clé USB 16Go", price: 8.99, category: "Électronique", description: "USB 3.0 rapide", imageUrl : "https://media.foto-erhardt.de/images/product_images/original_images/732/sandisk-cruzer-blade-32gb-usb-stick-17017752573240304.jpg" }
      ];

    // Variables pour le tri
    $scope.sortField = 'price';
    $scope.sortDirection = false; // false = croissant, true = décroissant

    // Fonction pour changer la direction du tri
    $scope.toggleSortDirection = function() {
        $scope.sortDirection = !$scope.sortDirection;
    };

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
