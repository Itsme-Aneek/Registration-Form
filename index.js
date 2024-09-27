document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const termsAccepted = document.getElementById("terms").checked;

  // Validate date of birth (18-55 years old)
  const dobDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const ageMonthDiff = today.getMonth() - dobDate.getMonth();
  const ageDayDiff = today.getDate() - dobDate.getDate();

  if (age < 18 || age > 55 || (age === 18 && ageMonthDiff < 0) || (age === 18 && ageMonthDiff === 0 && ageDayDiff < 0)) {
      alert("Age must be between 18 and 55 years.");
      return;
  }

  // Get existing data from localStorage or initialize an empty array
  let entries = JSON.parse(localStorage.getItem("entries")) || [];

  // Create a new entry object
  const formData = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      termsAccepted: termsAccepted
  };

  // Add new entry to the entries array
  entries.push(formData);

  // Save the updated entries array to localStorage
  localStorage.setItem("entries", JSON.stringify(entries));

  // Clear the form
  document.getElementById("registrationForm").reset();

  // Reload the table data
  loadTableData();
});

function loadTableData() {
  const storedData = JSON.parse(localStorage.getItem("entries")) || [];
  const table = document.getElementById("dataTable");
  
  // Clear the existing table rows
  table.innerHTML = '';

  // Add each entry to the table
  storedData.forEach((entry) => {
      const row = `
          <tr>
              <td>${entry.name}</td>
              <td>${entry.email}</td>
              <td>${entry.password}</td>
              <td>${entry.dob}</td>
              <td>${entry.termsAccepted}</td>
          </tr>
      `;
      table.innerHTML += row;
  });
}

// Load table data on page load
window.onload = function() {
  loadTableData();
};