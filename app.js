var app = angular.module("contactApp", []);
app.controller('inputCtrl', function($scope){
    // Initialize contacts from localStorage or empty array if none exists
    $scope.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    $scope.firstNameInput = '';
    $scope.lastNameInput = '';
    $scope.emailInput = '';
    $scope.phoneInput = '';
    $scope.searchInput = '';
    $scope.sortDirection = false; // false for ascending, true for descending

    // Function to save contacts to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('contacts', JSON.stringify($scope.contacts));
    }

    // Function to generate a unique ID
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Function to toggle sort direction
    $scope.toggleSortDirection = function() {
        $scope.sortDirection = !$scope.sortDirection;
        console.log('Sort direction changed to:', $scope.sortDirection);
    };

    $scope.handleSubmit = function(){
        $scope.contacts.push({
            id: generateId(), // Add unique ID
            firstName: $scope.firstNameInput,
            lastName: $scope.lastNameInput,
            email: $scope.emailInput,
            phone: $scope.phoneInput,
            isEditing: false
        });    
        // Clear inputs
        $scope.firstNameInput = '';
        $scope.lastNameInput = '';
        $scope.emailInput = '';
        $scope.phoneInput = '';
        
        // Save to localStorage
        saveToLocalStorage();
    }

    $scope.editContact = function(contact){
        // Create a deep copy of the contact object
        $scope.oldContact = JSON.parse(JSON.stringify(contact));
        contact.isEditing = true;
        console.log("OLD CONTACT", $scope.oldContact);
    }

    $scope.cancelEdit = function(contact){
        console.log($scope.oldContact);
        contact.firstName = $scope.oldContact.firstName;
        contact.lastName = $scope.oldContact.lastName;
        contact.email = $scope.oldContact.email;
        contact.phone = $scope.oldContact.phone;
        contact.isEditing = false;
    }

    $scope.deleteContact = function(contact){
        var index = $scope.contacts.indexOf(contact);
        if (index > -1) {
            $scope.contacts.splice(index, 1);
            saveToLocalStorage();
        }
    }

    $scope.saveEdit = function(contact){
        contact.isEditing = false;
        saveToLocalStorage();
    }
});
