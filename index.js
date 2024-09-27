document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const dobError = document.getElementById('dobError');
    const userTableBody = document.getElementById('userTableBody');
  
    loadSavedData();
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const termsAccepted = document.getElementById('terms').checked;
  
      if (!isValidDob(dob)) {
        dobError.textContent = 'Age must be between 18 and 55 years.';
        return;
      } else {
        dobError.textContent = '';
      }
  
      const user = {
        name,
        email,
        password,
        dob,
        termsAccepted
      };
  
      saveUser(user);
  
      addUserToTable(user);
  
      form.reset();
    });
  
    function isValidDob(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age >= 18 && age <= 55;
    }
  
    function saveUser(user) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    function loadSavedData() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.forEach(user => addUserToTable(user));
    }
  
    function addUserToTable(user) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.termsAccepted ? 'true' : 'false'}</td>
      `;
      userTableBody.appendChild(row);
    }
  });  