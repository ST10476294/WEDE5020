/* Part 3: vanilla JavaScript, no build step or frameworks.
   Contact emails are delivered by Formspree.  */
const contactRecipient = 'ST10476294@rcconnect.edu.za';

// Navigation remains visible if JavaScript is unavailable.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
if (menuButton && navigation) {
    const mobileScreen = window.matchMedia('(max-width: 768px)');
    function resetMenu() {
        menuButton.hidden = !mobileScreen.matches;
        navigation.classList.toggle('menu-closed', mobileScreen.matches);
        menuButton.setAttribute('aria-expanded', String(!mobileScreen.matches));
    }
    resetMenu();
    mobileScreen.addEventListener('change', resetMenu);
    menuButton.addEventListener('click', function () {
        const closed = navigation.classList.toggle('menu-closed');
        menuButton.setAttribute('aria-expanded', String(!closed));
    });
    navigation.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileScreen.matches) {
            navigation.classList.add('menu-closed');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.focus();
        }
    });
}

const ritualButton = document.querySelector('#ritual-toggle');
if (ritualButton) {
    ritualButton.hidden = false;
    ritualButton.addEventListener('click', function () {
        const steps = document.querySelector('#layering-steps');
        steps.hidden = !steps.hidden;
        ritualButton.setAttribute('aria-expanded', String(!steps.hidden));
        ritualButton.textContent = steps.hidden ? 'Show layering steps' : 'Hide layering steps';
    });
}

// Read the existing cards into an array so there is only one source of content.
const productList = document.querySelector('#product-list');
if (productList) {
    const products = [];
    productList.querySelectorAll('article').forEach(function (card) {
        products.push({name: card.querySelector('h3').textContent,
            description: card.querySelector('p').textContent, card: card.cloneNode(true)});
    });
    const search = document.querySelector('#product-search');
    const sort = document.querySelector('#product-sort');
    document.querySelector('#search-tools').hidden = false;
    function renderProducts() {
        const term = search.value.trim().toLowerCase();
        const results = products.filter(function (product) {
            return (product.name + ' ' + product.description).toLowerCase().includes(term);
        });
        if (sort.value !== 'featured') {
            results.sort(function (a, b) {
                return sort.value === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            });
        }
        productList.replaceChildren();
        results.forEach(function (product) { productList.append(product.card.cloneNode(true)); });
        document.querySelector('#search-status').textContent = results.length ?
            results.length + ' fragrance' + (results.length === 1 ? '' : 's') + ' found.' :
            'No fragrances found. Try vanilla, plum or Cheirosa.';
        prepareGallery();
    }
    search.addEventListener('input', renderProducts);
    sort.addEventListener('change', renderProducts);
    renderProducts();
}

// Native dialog gives modal focus containment and Escape support [README ref. 1].
function prepareGallery() {
    document.querySelectorAll('main img').forEach(function (img) {
        if (img.id === 'lightbox-image' || img.closest('a')) return;
        const link = document.createElement('a');
        link.href = img.getAttribute('src');
        link.className = 'gallery-link';
        link.setAttribute('aria-label', 'Enlarge: ' + img.alt);
        img.before(link);
        link.append(img);
    });
}
const lightbox = document.querySelector('#lightbox');
if (lightbox) {
    prepareGallery();
    let previousFocus;
    document.querySelector('main').addEventListener('click', function (event) {
        const link = event.target.closest('.gallery-link');
        if (!link || typeof lightbox.showModal !== 'function') return;
        event.preventDefault();
        previousFocus = link;
        const original = link.querySelector('img');
        const enlarged = document.querySelector('#lightbox-image');
        enlarged.src = original.src;
        enlarged.alt = original.alt;
        document.querySelector('#lightbox-caption').textContent = original.alt;
        lightbox.showModal();
        document.body.classList.add('modal-open');
    });
    document.querySelector('#lightbox-close').addEventListener('click', function () { lightbox.close(); });
    lightbox.addEventListener('click', function (event) { if (event.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('close', function () {
        document.body.classList.remove('modal-open');
        if (previousFocus) previousFocus.focus();
    });
}

// Share validation between the forms; keep their purposes and processing separate.
function validateField(field) {
    const value = field.value.trim();
    let error = '';
    if (field.required && !value) error = 'Please complete this field.';
    else if (value && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter an email such as name@example.com.';
    else if (value && field.type === 'tel' && (!/^[+\d\s().-]+$/.test(value) || value.replace(/\D/g, '').length < 7 || value.replace(/\D/g, '').length > 15)) error = 'Enter 7–15 digits, with an optional country code.';
    else if (value && field.minLength > 0 && value.length < field.minLength) error = 'Enter at least ' + field.minLength + ' characters.';
    else if (field.maxLength > 0 && value.length > field.maxLength) error = 'Use no more than ' + field.maxLength + ' characters.';
    else if (field.tagName === 'SELECT' && !Array.from(field.options).some(function (option) { return option.value === value && value !== ''; })) error = 'Choose one of the listed options.';
    document.querySelector('#' + field.id + '-error').textContent = error;
    field.setAttribute('aria-invalid', String(Boolean(error)));
    return !error;
}

document.querySelectorAll('#enquiry-form, #contact-form').forEach(function (form) {
    form.noValidate = true;
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = false;
    const fields = form.querySelectorAll('.form-field input, .form-field select, .form-field textarea');
    const status = form.querySelector('[role="status"]');
    fields.forEach(function (field) {
        field.addEventListener('blur', function () { validateField(field); });
        field.addEventListener('input', function () {
            if (field.hasAttribute('aria-invalid')) validateField(field);
            status.textContent = '';
            // Hide an earlier response once the visitor edits the form again
            form.querySelectorAll('.form-result').forEach(function (result) { result.hidden = true; });
        });
        field.addEventListener('change', function () { validateField(field); });
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let firstInvalid;
        fields.forEach(function (field) { if (!validateField(field) && !firstInvalid) firstInvalid = field; });
        if (firstInvalid) {
            status.textContent = 'Please correct the highlighted fields.';
            firstInvalid.focus();
            return;
        }
        if (form.id === 'enquiry-form') {
            processEnquiry(form, status);
        } else {
            sendContact(form, status, submit);
        }
    });
});

// Process the enquiry: build a summary and a response that fits the enquiry type and product
function processEnquiry(form, status) {
    const fields = form.elements;
    const name = fields.fullName.value.trim();
    const type = fields.enquiryType.options[fields.enquiryType.selectedIndex].text;
    const product = fields.product.options[fields.product.selectedIndex].text;
    const isGeneral = fields.product.value === 'general';
    const stockists = 'Selfridges (London) and Harvey Nichols (Manchester)';
    const responses = {
        newsletter: 'Newsletter offers and launch news are published on the official Sol de Janeiro website. ' +
            (isGeneral ? 'Browse our fragrance collection while you wait for new launches.' :
                'Look out for news about ' + product + ', or see it in person at ' + stockists + '.'),
        product: isGeneral ? 'Browse our fragrance collection, then contact one of our stockists, ' + stockists + ', to confirm prices and availability.' :
            product + ' is part of our current range. Prices and stock can change, so please contact ' + stockists +
            ' to confirm the current price and availability before you visit.',
        partnership: 'For a brand partnership or influencer collaboration, prepare your social profile, audience size and collaboration idea. ' +
            'Use our contact form with the message type "General question" to share these details.'
    };
    const nextLink = {
        newsletter: {href: 'fragrance.html', text: 'Explore the fragrance collection'},
        product: {href: 'contact.html', text: 'Find stockist locations and maps'},
        partnership: {href: 'contact.html', text: 'Go to the contact form'}
    }[fields.enquiryType.value];

    // Build the result with textContent so user input is never treated as HTML
    const result = document.querySelector('#enquiry-result');
    result.replaceChildren();
    const heading = document.createElement('h2');
    heading.textContent = 'Your enquiry summary';
    const summary = document.createElement('ul');
    [['Name', name], ['Email', fields.email.value.trim()], ['Enquiry type', type], ['Product', product]].forEach(function (row) {
        const item = document.createElement('li');
        const label = document.createElement('strong');
        label.textContent = row[0] + ': ';
        item.append(label, row[1]);
        summary.append(item);
    });
    const advice = document.createElement('p');
    advice.textContent = responses[fields.enquiryType.value];
    const link = document.createElement('a');
    link.className = 'button-link';
    link.href = nextLink.href;
    link.textContent = nextLink.text;
    result.append(heading, summary, advice, link);
    result.hidden = false;

    status.textContent = 'Thank you, ' + name + '. Your enquiry has been processed — see your response below.';
    status.focus();
}

// Send the contact message to Formspree with fetch (AJAX) and show sending/success/error states
function sendContact(form, status, submit) {
    const fields = form.elements;
    const type = fields.messageType.options[fields.messageType.selectedIndex].text;
    const subject = 'Sol de Janeiro website message: ' + type;
    const body = 'Name: ' + fields.contactName.value.trim() + '\nEmail: ' + fields.contactEmail.value.trim() +
        '\nPhone: ' + (fields.phone.value.trim() || 'Not supplied') + '\nMessage type: ' + type +
        '\n\n' + fields.message.value.trim();
    const copy = document.querySelector('#email-result');
    document.querySelector('#email-preview').value = 'Subject: ' + subject + '\n\n' + body;
    // Fallback: open the visitor's email app with the compiled message for the recipient stated above
    const emailLink = document.querySelector('#email-link');
    emailLink.hidden = !contactRecipient;
    if (contactRecipient) emailLink.href = 'mailto:' + contactRecipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    // Only a real Formspree form ID is accepted; the YOUR_FORM_ID placeholder is not
    if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(form.action)) {
        status.textContent = 'Email sending has not been set up yet, so your message was not sent. A copy is shown below.';
        copy.hidden = false;
        status.focus();
        return;
    }

    status.textContent = 'Sending your message…';
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    const data = new FormData(form);
    data.set('email', fields.contactEmail.value.trim());
    data.set('_subject', subject);
    const controller = new AbortController();
    const timeout = setTimeout(function () { controller.abort(); }, 15000);
    fetch(form.action, {method: 'POST', body: data, headers: {Accept: 'application/json'}, signal: controller.signal})
        .then(function (response) {
            if (!response.ok) throw new Error('Submission failed');
            status.textContent = 'Thank you, ' + fields.contactName.value.trim() + '. Your message has been sent and we will reply to ' +
                fields.contactEmail.value.trim() + '.';
            form.reset();
            form.querySelectorAll('[aria-invalid]').forEach(function (field) { field.removeAttribute('aria-invalid'); });
            copy.hidden = true;
        })
        .catch(function () {
            status.textContent = 'Sorry, your message could not be sent. Check your connection and try again. A copy of your message is shown below.';
            copy.hidden = false;
        })
        .finally(function () {
            clearTimeout(timeout);
            submit.disabled = false;
            form.removeAttribute('aria-busy');
            status.focus();
        });
}
