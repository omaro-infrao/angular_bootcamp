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

app.controller('mainCtrl', function($scope){

    $scope.selectedCategory = "";
    
    $scope.products = [
        { id: 1, name: "Pomme", price: 0.5, category: "Fruits", description: "Une belle pomme rouge" },
        { id: 2, name: "Coca-Cola", price: 1.2, category: "Boissons", description: "Canette de 33cl" },
        { id: 3, name: "Clé USB 16Go", price: 8.99, category: "Électronique", description: "USB 3.0 rapide" }
      ];

    $scope.cart = [];
      
    // Function to save contacts to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('contacts', JSON.stringify($scope.contacts));
    }

    // Function to generate a unique ID
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    $scope.addProduct = function(product) {
        console.log('Produit ajouté:', product);
    }
});
