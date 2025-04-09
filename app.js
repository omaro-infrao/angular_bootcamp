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
    $scope.password = "admin";
    $scope.admin = false;
    $scope.isEditing = false;
    $scope.productToEdit = null;
    $scope.isAdding = false;
    $scope.newProduct = {
        name: '',
        price: 0,
        category: '',
        description: '',
        imageUrl: '',
        isEditing: false
    };

    // Initialisation des produits depuis le localStorage
    $scope.products = JSON.parse(localStorage.getItem('products')) || [
        { id: 1, name: "Pomme", price: 0.5, category: "Fruits", description: "Une belle pomme rouge", imageUrl: "https://media.istockphoto.com/id/185262648/fr/photo/pomme-rouge-avec-feuilles-isol%C3%A9-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=TtNNNtMUUeTKY4ug3KdwnxHxRQMRyIjgZpOChBWycTU=", isEditing: false },
        { id: 2, name: "Coca-Cola", price: 1.2, category: "Boissons", description: "Canette de 33cl", imageUrl : "https://i.ebayimg.com/images/g/vEEAAOSw7L1Zwmg-/s-l1200.png", isEditing: false },
        { id: 3, name: "Clé USB 16Go", price: 8.99, category: "Électronique", description: "USB 3.0 rapide", imageUrl : "https://media.foto-erhardt.de/images/product_images/original_images/732/sandisk-cruzer-blade-32gb-usb-stick-17017752573240304.jpg", isEditing: false }
    ];

    // Variables pour le tri
    $scope.sortField = 'price';
    $scope.sortDirection = false; // false = croissant, true = décroissant

    // Fonction pour changer la direction du tri
    $scope.toggleSortDirection = function() {
        $scope.sortDirection = !$scope.sortDirection;
    };

    $scope.accessAdmin = function() {
        var enteredPassword = window.prompt("Entrez le mot de passe");
        if (enteredPassword === $scope.password) {
            $scope.admin = true;
            alert("Accès administrateur autorisé");
        } else {
            alert("Mot de passe incorrect");
        }
    };

    $scope.startAddingProduct = function() {
        $scope.isAdding = true;
        console.log('isAdding:', $scope.isAdding);
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

    // Fonction pour sauvegarder les produits dans le localStorage
    $scope.saveProductsToLocalStorage = function() {
        localStorage.setItem('products', JSON.stringify($scope.products));
    };

    // Sauvegarder les produits après chaque modification
    $scope.$watch('products', function() {
        $scope.saveProductsToLocalStorage();
    }, true); // Le true indique une surveillance profonde des objets

    $scope.editProduct = function(product) {
        $scope.productToEdit = JSON.parse(JSON.stringify(product));
        product.isEditing = true;
    };

    $scope.cancelEdit = function(product) {
        if ($scope.productToEdit) {
            Object.assign(product, $scope.productToEdit);
        }
        product.isEditing = false;
        $scope.productToEdit = null;
    };

    $scope.deleteProduct = function(product) {
        $scope.products = $scope.products.filter(function(p) {
            if(p.id !== product.id) {
                return p;
            }
        });
    };

    $scope.addNewProduct = function() {
        if ($scope.newProduct.category.length === 0 || $scope.newProduct.name.length === 0 || $scope.newProduct.price === 0 || $scope.newProduct.price <= 0) {
            alert("Veuillez entrer un nom, une catégorie et un prix supérieur à 0.");
            return;
        }
        // Générer un nouvel ID
        var newId = Math.max(...$scope.products.map(p => p.id)) + 1;
        $scope.newProduct.id = newId;
        
        // Ajouter le nouveau produit
        $scope.products.push($scope.newProduct);
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('products', JSON.stringify($scope.products));
        
        // Réinitialiser le formulaire
        $scope.newProduct = {
            name: '',
            price: 0,
            category: '',
            description: '',
            imageUrl: '',
            isEditing: false
        };
        $scope.isAdding = false;
    };

    $scope.cancelAddingProduct = function() {
        $scope.isAdding = false;
    };
});
