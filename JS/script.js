// ========================================
// MECALINK - SHARED JAVASCRIPT
// WEDE5020POE PART 3
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("MecaLink JavaScript loaded successfully!");

    // ========================================
    // HELPER: DISPLAY FORM MESSAGES
    // ========================================

    function showMessage(element, message, isError = false) {
        if (!element) return;

        element.textContent = message;
        element.style.color = isError ? "#d93025" : "#16803c";
    }


    // ========================================
    // HELPER: AJAX FORM SUBMISSION
    // Netlify forms only work after deployment
    // to a correctly configured Netlify site.
    // ========================================

    async function submitNetlifyForm(form, messageElement, successMessage) {

        const submitButton = form.querySelector('[type="submit"]');

        if (!form.reportValidity()) {
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
        }

        showMessage(messageElement, "Submitting your information...");

        try {

            const formData = new FormData(form);

            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) {
                throw new Error("The server could not process your submission.");
            }

            showMessage(messageElement, successMessage);

            form.reset();

        } catch (error) {

            console.error("Form submission error:", error);

            showMessage(
                messageElement,
                "Submission failed. Please try again when the website is connected to Netlify.",
                true
            );

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
            }

        }
    }


    // ========================================
    // 1. REGISTRATION FORM
    // ========================================

    const registrationForm = document.getElementById("registrationform");

    if (registrationForm) {

        registrationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const password = document.getElementById("password");
            const message = document.getElementById("registrationMessage");

            if (!registrationForm.reportValidity()) {
                return;
            }

            if (password && password.value.length < 8) {
                showMessage(
                    message,
                    "Your password must contain at least 8 characters.",
                    true
                );
                return;
            }

            showMessage(
                message,
                "Your details passed validation. This demonstration does not create a login account.",
                false
            );

        });
    }


    // ========================================
    // 2. CONTACT FORM
    // ========================================

    const contactForm = document.getElementById("contactform");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const message = document.getElementById("contactMessageStatus");

            submitNetlifyForm(
                contactForm,
                message,
                "Thank you! Your message has been submitted successfully."
            );

        });
    }


    // ========================================
    // 3. GET HELP FORM
    // ========================================

    const helpForm = document.getElementById("helpForm");

    if (helpForm) {

        helpForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const problem = document.getElementById("problem");
            const location = document.getElementById("location");
            const message = document.getElementById("helpMessage");

            if (!problem || !location || !message) {
                console.error("Help form elements are missing.");
                return;
            }

            if (!helpForm.reportValidity()) {
                return;
            }

            if (problem.value.trim().length < 5 ||
                location.value.trim().length < 3) {

                showMessage(
                    message,
                    "Please provide a valid problem description and location.",
                    true
                );
                return;
            }

            submitNetlifyForm(
                helpForm,
                message,
                "Your assistance request has been submitted successfully."
            );

        });
    }


    // ========================================
    // 4. MECHANIC SEARCH FORM
    // ========================================

    const mechanicSearchForm = document.getElementById("mechanicSearchForm");

    if (mechanicSearchForm) {

        mechanicSearchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const location = document.getElementById("location");
            const service = document.getElementById("service");
            const message = document.getElementById("mechanicSearchMessage");

            if (!location || !service || !message) {
                console.error("Mechanic search elements are missing.");
                return;
            }

            if (!mechanicSearchForm.reportValidity()) {
                return;
            }

            showMessage(
                message,
                "Search details received for " +
                service.value.trim() +
                " in " +
                location.value.trim() +
                ". Live mechanic listings are not connected yet."
            );

        });
    }


    // ========================================
    // 5. LOCATION PAGE
    // ========================================

    const shareLocationButton = document.getElementById("shareLocationButton");

    if (shareLocationButton) {

        shareLocationButton.addEventListener("click", function () {

            const location = document.getElementById("location");
            const message = document.getElementById("locationMessage");

            if (!location || !message) {
                console.error("Location page elements are missing.");
                return;
            }

            if (location.value.trim().length < 3) {

                showMessage(
                    message,
                    "Please enter a valid location.",
                    true
                );
                return;
            }

            showMessage(
                message,
                "Your location has been entered successfully. It has not been shared with a mechanic."
            );

        });
    }


    // ========================================
    // 6. RATINGS AND REVIEWS
    // ========================================

    const reviewForm = document.getElementById("reviewForm");

    if (reviewForm) {

        reviewForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const ratingInput = document.getElementById("rating");
            const reviewInput = document.getElementById("review");
            const message = document.getElementById("reviewMessage");
            const reviewsList = document.getElementById("reviewsList");
            const noReviews = document.getElementById("noReviews");

            if (!ratingInput || !reviewInput || !message || !reviewsList) {
                console.error("Review form elements are missing.");
                return;
            }

            if (!reviewForm.reportValidity()) {
                return;
            }

            const rating = Number(ratingInput.value);
            const reviewText = reviewInput.value.trim();

            if (rating < 1 || rating > 5 || reviewText.length < 10) {

                showMessage(
                    message,
                    "Select a rating and write at least 10 characters.",
                    true
                );
                return;
            }

            const reviewCard = document.createElement("div");
            reviewCard.className = "review-card";

            const heading = document.createElement("h3");
            heading.textContent = "Customer Review";

            const stars = document.createElement("p");
            stars.textContent = "★".repeat(rating) + "☆".repeat(5 - rating);

            const reviewParagraph = document.createElement("p");
            reviewParagraph.textContent = reviewText;

            reviewCard.appendChild(heading);
            reviewCard.appendChild(stars);
            reviewCard.appendChild(reviewParagraph);

            reviewsList.prepend(reviewCard);

            if (noReviews) {
                noReviews.style.display = "none";
            }

            showMessage(
                message,
                "Thank you! Your review has been added to this page. It is not permanently stored."
            );

            reviewForm.reset();

        });
    }


    // ========================================
    // 7. MARKETPLACE SEARCH AND FILTER
    // ========================================

    const marketplaceSearch = document.getElementById("marketplaceSearch");
    const searchButton = document.getElementById("searchButton");

    const filterButtons = document.querySelectorAll(".filter-button");
    const marketplaceCards = document.querySelectorAll(".marketplace-card");

    let activeFilter = "all";

    function filterMarketplace() {

        const searchText = marketplaceSearch
            ? marketplaceSearch.value.toLowerCase().trim()
            : "";

        marketplaceCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();

            const categoryElement = card.querySelector(".marketplace-category");

            const category = categoryElement
                ? categoryElement.textContent.toLowerCase()
                : (card.dataset.category || "").toLowerCase();

            const matchesSearch = cardText.includes(searchText);

            const matchesCategory =
                activeFilter === "all" ||
                category.includes(activeFilter.replace("-", " "));

            card.style.display =
                matchesSearch && matchesCategory ? "" : "none";

        });
    }

    if (marketplaceSearch) {
        marketplaceSearch.addEventListener("input", filterMarketplace);
    }

    if (searchButton) {
        searchButton.addEventListener("click", filterMarketplace);
    }

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            activeFilter = button.dataset.filter || "all";

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            filterMarketplace();

        });
    });


    // ========================================
    // 8. COMMUNITY PAGE
    // ========================================

    const communityButtons = document.querySelectorAll("[data-post]");
    const communityMessage = document.getElementById("communityMessage");

    communityButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const postType = button.dataset.post;

            const messages = {
                vehicle: "Vehicle advice discussions will be available when the community feature is connected.",
                mechanic: "Mechanic tips and advice will be available when community posts are connected.",
                experience: "Sharing experiences will be available when community posts are connected."
            };

            if (communityMessage) {

                communityMessage.textContent =
                    messages[postType] || "Community posts are not available yet.";

                communityMessage.setAttribute("role", "status");

            }

        });
    });


    // ========================================
    // END OF MECALINK JAVASCRIPT
    // ========================================

});