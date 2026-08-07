const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const firstnameInput = document.getElementById('firstname-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');

const loginEmailInput = document.getElementById('login-email-input');
const loginPasswordInput = document.getElementById('login-password-input');

function navigateWithAuthSwap(targetHref, direction) {
    document.body.classList.add('auth-transitioning', direction);
    window.setTimeout(() => {
        window.location.href = targetHref;
    }, 340);
}

function bindAuthLinks() {
    const authLinks = document.querySelectorAll('a[href="index.html"], a[href="login.html"]');

    authLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = link.getAttribute('href');
            const direction = href === 'index.html' ? 'to-signup' : 'to-login';
            navigateWithAuthSwap(href, direction);
        });
    });
}

function getSignupFormErrors(firstname, email, password, repeatPassword) {
    const errors = [];

    if (!firstname.value.trim()) {
        errors.push('First name is required.');
    }

    if (!email.value.trim()) {
        errors.push('Email is required.');
    } else if (!email.value.includes('@')) {
        errors.push('Email must contain @.');
    }

    if (!password.value.trim()) {
        errors.push('Password is required.');
    }

    if (!repeatPassword.value.trim()) {
        errors.push('Repeat password is required.');
    } else if (password.value !== repeatPassword.value) {
        errors.push('Passwords do not match.');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    const errors = [];

    if (!email.value.trim()) {
        errors.push('Email is required.');
    } else if (!email.value.includes('@')) {
        errors.push('Email must contain @.');
    }

    if (!password.value.trim()) {
        errors.push('Password is required.');
    }

    return errors;
}

function clearErrorStates() {
    document.querySelectorAll('form > div').forEach((row) => row.classList.remove('incorrect'));
}

function markIncorrectField(input) {
    const row = input.closest('div');
    if (row) row.classList.add('incorrect');
}

bindAuthLinks();

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrorStates();

        const errors = getSignupFormErrors(
            firstnameInput,
            emailInput,
            passwordInput,
            repeatPasswordInput
        );

        if (errors.length > 0) {
            if (!firstnameInput.value.trim()) markIncorrectField(firstnameInput);
            if (!emailInput.value.trim() || !emailInput.value.includes('@')) markIncorrectField(emailInput);
            if (!passwordInput.value.trim()) markIncorrectField(passwordInput);
            if (!repeatPasswordInput.value.trim() || passwordInput.value !== repeatPasswordInput.value) {
                markIncorrectField(repeatPasswordInput);
            }
            alert(errors.join('\n'));
            return;
        }

        alert('Signup successful!');
        window.location.href = 'index.html';
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrorStates();

        const errors = getLoginFormErrors(loginEmailInput, loginPasswordInput);

        if (errors.length > 0) {
            if (!loginEmailInput.value.trim() || !loginEmailInput.value.includes('@')) markIncorrectField(loginEmailInput);
            if (!loginPasswordInput.value.trim()) markIncorrectField(loginPasswordInput);
            alert(errors.join('\n'));
            return;
        }

        alert('Login successful!');
        // Navigation to the side menu is intentionally disabled for now per user request.
        // window.location.href = 'side-menu.html';
    });
}
