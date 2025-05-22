let users = JSON.parse(localStorage.getItem('users')) || {};
let books = ["1984", "Brave New World", "The Great Gatsby","The Secret","To kill a MockingBird","Harry Potter","Pride and Prejudice"];
let loggedInUser = localStorage.getItem('loggedInUser');

// Ensure users is an object
if (typeof users !== 'object' || users === null || Array.isArray(users)) {
  users = {};
  localStorage.setItem('users', JSON.stringify(users));
}

// Register
if (document.getElementById("register-form")) {
  document.getElementById("register-form").onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    if (users[username]) {
      alert("Username already exists!");
    } else {
      users[username] = { password, borrowed: [], returned: [] };
      localStorage.setItem('users', JSON.stringify(users));
      alert("Registered Successfully!");
      window.location.href = "login.html";
    }
  };
}

// Login
if (document.getElementById("login-form")) {
  document.getElementById("login-form").onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById("log-username").value.trim();
    const password = document.getElementById("log-password").value;
    const localUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (localUsers[username] && localUsers[username].password === password) {
      localStorage.setItem('loggedInUser', username);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid login!");
    }
  };
}

// Book list
if (document.getElementById("book-list")) {
  const ul = document.getElementById("book-list");
  books.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });
}

// Borrow book
if (document.getElementById("borrow-list")) {
  const ul = document.getElementById("borrow-list");
  books.forEach(b => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = "Borrow";
    btn.onclick = function() {
      if (!users[loggedInUser].borrowed.includes(b)) {
        users[loggedInUser].borrowed.push(b);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Book borrowed!");
      } else {
        alert("You already borrowed this book.");
      }
    };
    li.textContent = b + " ";
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

// Return book
if (document.getElementById("return-list")) {
  const ul = document.getElementById("return-list");
  (users[loggedInUser]?.borrowed || []).forEach(b => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = "Return";
    btn.onclick = function() {
      users[loggedInUser].borrowed = users[loggedInUser].borrowed.filter(book => book !== b);
      users[loggedInUser].returned.push(b);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Book returned!");
      location.reload();
    };
    li.textContent = b + " ";
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

// Admin panel
if (document.getElementById("user-table-body")) {
  const tbody = document.getElementById("user-table-body");
  Object.entries(users).forEach(([username, data]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${username}</td><td>${data.borrowed.join(', ')}</td><td>${data.returned.join(', ')}</td>`;
    tbody.appendChild(tr);
  });
}
