// Get the modal
var modal = document.getElementById("orderModal");

// Get the <span> element that closes the modal
var span = document.getElementById("closeModal");

// When the user clicks on an order button, open the modal and set the title
document.querySelectorAll('.order-button').forEach(button => {
    button.onclick = function() {
        const itemName = this.getAttribute('data-name');
        modal.style.display = "block";
        document.getElementById("modalTitle").innerText = `Order for ${itemName}`;

        // Reset quantities and enable checkboxes
        document.querySelectorAll('.specialty-checkbox').forEach(checkbox => {
            checkbox.checked = false; // Uncheck all checkboxes
            checkbox.disabled = false; // Enable all checkboxes
        });

        // Reset quantity inputs and total price
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = 1; // Reset to 1
            input.disabled = true; // Disable all inputs initially
        });
        
        document.getElementById('totalPrice').innerText = '₱0.00'; // Reset total price
    };
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Manage enabling/disabling quantity inputs based on checkbox selections
const specialtyCheckboxes = document.querySelectorAll('.specialty-checkbox');
const quantityInputs = document.querySelectorAll('input[type="number"]');
const totalPriceElement = document.getElementById('totalPrice');

specialtyCheckboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function() {
        quantityInputs[index].disabled = !this.checked; // Enable/disable the corresponding quantity input
        if (!this.checked) {
            quantityInputs[index].value = 1; // Reset quantity if unchecked
        }
        updateTotalPrice(); // Update total whenever checkbox state changes
    });
});

// Listen for quantity input changes to update total price
quantityInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        updateTotalPrice(); // Update total price on quantity input change
    });
});

// Update total price based on selected specialties and quantities
function updateTotalPrice() {
    let total = 0;
    specialtyCheckboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const quantity = parseInt(quantityInputs[index].value);
            const price = parseFloat(checkbox.getAttribute('data-price')); // Get the price from the checkbox
            total += quantity * price;
        }
    });
    totalPriceElement.innerText = `₱${total.toFixed(2)}`; // Update total price display
}

// Handle the order submission
document.getElementById('orderForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent form submission to server

    let orderSummary = "Order Summary:\n";
    let total = 0;

    specialtyCheckboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const quantity = parseInt(quantityInputs[index].value);
            const price = parseFloat(checkbox.getAttribute('data-price')); // Get the price from the checkbox
            total += quantity * price;
            orderSummary += `${checkbox.value} x${quantity} - ₱${(quantity * price).toFixed(2)}\n`;
        }
    });

    orderSummary += `Total: ₱${total.toFixed(2)}`;

    alert(orderSummary); // Display order summary
    modal.style.display = "none"; // Close the modal
};

document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");

    // Function to add a new comment
    function addComment(text) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        const commentText = document.createElement("p");
        commentText.textContent = text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-comment");

        // Append text and delete button to the comment div
        commentDiv.appendChild(commentText);
        commentDiv.appendChild(deleteButton);

        // Append the new comment to the list
        commentList.appendChild(commentDiv);

        // Clear the input field
        commentInput.value = "";

        // Add event listener to the delete button
        deleteButton.addEventListener("click", function() {
            commentList.removeChild(commentDiv);
        });
    }

    // Event listener for comment submission
    document.getElementById("submitComment").addEventListener("click", function() {
        const text = commentInput.value.trim();
        if (text) {
            addComment(text); // Add the comment to the list
        } else {
            alert("Please type a comment before submitting.");
        }
    });
});
