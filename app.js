// Array to store valid packages
let packages = [];

// Utility function to generate a tracking code
function generateTrackingCode(packageId, weight) {
  return `0b${(packageId << 4 | weight).toString(2)}`;
}

// Function to validate inputs
function validateInputs(name, packageId, address, weight) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = '';

  // Validate Recipient Name
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    errorMessage.textContent = 'Error: Recipient Name must contain only alphabetic characters.';
    return false;
  }

  // Validate Package ID
  if (!/^\d+$/.test(packageId)) {
    errorMessage.textContent = 'Error: Invalid Package ID. Please enter numeric values only.';
    return false;
  }

  // Validate Delivery Address
  if (!address.trim() || /\d/.test(address)) {
    errorMessage.textContent = 'Error: Invalid Delivery Address.';
    return false;
  }

  // Validate Weight
  if (isNaN(weight) || weight <= 0) {
    errorMessage.textContent = 'Error: Weight must be a positive number.';
    return false;
  }

  return true;
}

// Function to add package
function addPackage() {
  const name = document.getElementById('recipientName').value.trim();
  const packageId = document.getElementById('packageId').value.trim();
  const address = document.getElementById('deliveryAddress').value.trim();
  const weight = parseFloat(document.getElementById('weight').value);

  // Validate inputs
  if (!validateInputs(name, packageId, address, weight)) {
    return;
  }

  // Generate tracking code
  const trackingCode = generateTrackingCode(Number(packageId), weight);

  // Add to packages array
  packages.push({ name, packageId: Number(packageId), address, weight, trackingCode });

  // Clear form
  document.getElementById('packageForm').reset();

  // Update table
  displayPackages();
}

// Function to sort and display packages
function displayPackages() {
  const tableBody = document.querySelector('#packagesTable tbody');
  tableBody.innerHTML = '';

  // Sort packages by weight (lightest to heaviest)
  packages.sort((a, b) => a.weight - b.weight);

  // Populate table
  packages.forEach(pkg => {
    const row = `
      <tr>
        <td>${pkg.name}</td>
        <td>${pkg.packageId}</td>
        <td>${pkg.address}</td>
        <td>${pkg.weight}</td>
        <td>${pkg.trackingCode}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

// Event Listener for Add Package Button
document.getElementById('addPackageButton').addEventListener('click', addPackage);
