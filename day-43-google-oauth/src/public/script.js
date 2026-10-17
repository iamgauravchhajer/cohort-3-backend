const statusMsg = document.getElementById('status-msg');
const guestView = document.getElementById('guest-view');
const userView = document.getElementById('user-view');

function showMsg(text, type = 'error') {
  statusMsg.textContent = text;
  statusMsg.className = `status-msg ${type}`;
}

// 1. Check URL redirect query parameters
const params = new URLSearchParams(window.location.search);
if (params.get('login') === 'success') {
  showMsg('Signed in successfully.', 'success');
  window.history.replaceState({}, '', '/');
} else if (params.get('error')) {
  showMsg('Sign in failed or was cancelled.', 'error');
  window.history.replaceState({}, '', '/');
}

// 2. Fetch current user session
async function getProfile() {
  try {
    const res = await fetch('/auth/me', { credentials: 'include' });
    if (!res.ok) throw new Error();

    const { user } = await res.json();
    document.getElementById('user-name').textContent = user.name || 'Google User';
    document.getElementById('user-email').textContent = user.email || '';
    document.getElementById('user-google-id').textContent = user.googleId || '-';
    document.getElementById('user-avatar').src =
      user.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=1a73e8&color=fff`;

    guestView.classList.add('hidden');
    userView.classList.remove('hidden');
  } catch {
    guestView.classList.remove('hidden');
    userView.classList.add('hidden');
  }
}

// 3. Handle Sign Out
document.getElementById('logout-btn').addEventListener('click', async () => {
  try {
    await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
    showMsg('Signed out successfully.', 'success');
    getProfile();
  } catch {
    showMsg('Failed to sign out.');
  }
});

getProfile();
