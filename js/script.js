document.addEventListener("DOMContentLoaded", () => {

    // Sidebar navigation
    document.querySelectorAll(".sidebar-menu li[data-route]").forEach(item => {
        item.addEventListener("click", () => {
            item.classList.add("loading");
            setTimeout(() => {
                window.location.href = item.dataset.route;
            }, 200);
        });
    });

    // Highlight active route
    const path = window.location.pathname;
    document.querySelectorAll(".sidebar-menu li[data-route]").forEach(li => {
        if (li.dataset.route === path) {
            li.classList.add("active");
        }
    });
});

// Sidebar toggle
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

// Logout
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        alert("Logging out...");
    }
}
function toggleProfileDropdown(event) {
    event.stopPropagation(); // prevent closing immediately
    document.getElementById("profileMenu").classList.toggle("show");
}

// Close dropdown when clicking outside
document.addEventListener("click", () => {
    const menu = document.getElementById("profileMenu");
    if (menu) {
        menu.classList.remove("show");
    }

});
function toggleProfileDropdown(event) {
    event.stopPropagation();
    document.getElementById('profileMenu').classList.toggle('show');
}

document.addEventListener('click', () => {
    document.getElementById('profileMenu').classList.remove('show');
});

function enableEdit(index) {
  document.getElementById(`text-${index}`).style.display = "none";
  document.getElementById(`input-${index}`).style.display = "inline";
}

function saveEdit(index) {
  const input = document.getElementById(`input-${index}`);
  const newValue = input.value;

  fetch("/listings/edit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index, newValue })
  })
  .then(res => {
    if (res.ok) location.reload();
  });
}

function deleteListing(index) {
  fetch("/listings/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index })
  })
  .then(res => {
    if (res.ok) location.reload();
  });
}

function addListing() {
  const input = document.getElementById("new-listing-input");
  const value = input.value.trim();

  if (value === "") {
    alert("Listing cannot be empty");
    return;
  }

  fetch("/listings/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value })
  })
  .then(res => {
    if (res.ok) {
      input.value = "";
      showPopup("Listing added successfully ✅");
      setTimeout(() => location.reload(), 800);
    }
  });
}
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.innerText = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

function enableReviewEdit(index) {
  document.getElementById(`review-text-${index}`).style.display = "none";
  document.getElementById(`review-input-${index}`).style.display = "inline";
}

function saveReviewEdit(index) {
  const input = document.getElementById(`review-input-${index}`);
  const newValue = input.value.trim();

  fetch("/reviews/edit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index, newValue })
  }).then(res => {
    if (res.ok) location.reload();
  });
}

function deleteReview(index) {
  if (!confirm("Delete this review?")) return;

  fetch("/reviews/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index })
  }).then(res => {
    if (res.ok) location.reload();
  });
}