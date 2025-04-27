// Toggle mobile menu open/close on clicking menu button
const mobileMenu = document.querySelector('.mobile-menu')
const mobileMenuLinks = document.querySelector('.nav-links-container')
const menuButton = document.querySelector('.btn-container')
const menuLinks = document.querySelectorAll('.nav-links li a')
mobileMenu.addEventListener('click', () => {
  mobileMenuLinks.classList.toggle('active')
  menuButton.classList.toggle('btn-active')
  if(window.innerWidth < 768){
    menuLinks.forEach(link=>{
      link.addEventListener('click',()=>{
        mobileMenuLinks.classList.toggle('active')
        menuButton.classList.toggle('btn-active')
      })
    })
  }
})

// Brand logos array with id and image path
const brandLogo = [
  { id: 1, logo: './assests/brandImg/b1.png' },
  { id: 2, logo: './assests/brandImg/b2.png' },
  { id: 3, logo: './assests/brandImg/b3.png' },
  { id: 4, logo: './assests/brandImg/b4.png' },
  { id: 5, logo: './assests/brandImg/b5.png' },
  { id: 6, logo: './assests/brandImg/b6.png' },
  { id: 7, logo: './assests/brandImg/b7.png' },
  { id: 8, logo: './assests/brandImg/b8.png' },
  { id: 9, logo: './assests/brandImg/b9.png' },
  { id: 10, logo: './assests/brandImg/b10.png' },
  { id: 11, logo: './assests/brandImg/b11.png' }
]

// Dynamically create and append brand logos to brand container
const brandContainer = document.querySelector('.brand-container')
brandLogo.map((brand) => {
  const brandDiv = document.createElement('div')
  brandDiv.classList.add('brand-div')

  const brandImg = document.createElement('img')
  brandImg.src = brand.logo
  brandImg.classList.add('brand-img')

  brandDiv.appendChild(brandImg)
  brandContainer.appendChild(brandDiv)
})

// Fetch and render feature cards dynamically from features.json
const fetchFeature = () =>{
  fetch('/features.json')
  .then(response => response.json())
  .then(data => {
    const featureContainer = document.querySelector('.feature-container')

    data.forEach(feature => {
      const featureHTML = `
        <div class="feature-div">
          <div class="feature-img-container">
            <img class="feature-img" src="${feature.featureImg}" alt="${feature.featuredTitle}">
          </div>
          <h3>${feature.featuredTitle}</h3>
          <p>${feature.featuredPara}</p>
        </div>
      `
      featureContainer.innerHTML += featureHTML
    })
  })
}
fetchFeature()

// Helper function to generate stars based on rating (not used currently)
const generateStars = (rating) => {
  const starContainer = document.querySelector('.star-container')
  for (let i = 0; i < 5; i++) {
    const starSVG = `<div class="star-rating" data-rating="${rating}">
      <div class="star-wrapper">
        <svg viewBox="0 0 24 24" class="star-bg">
          <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#ccc"></path>
        </svg>
        <svg viewBox="0 0 24 24" class="star-fill" style="width: 86%;">
          <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#FFD700"></path>
        </svg>
      </div>
    </div>`
    starContainer.innerHTML += starSVG
  }
}

// Variables and logic to handle customer reviews
let startIndex = 0
let endIndex = 4 // Initial number of reviews to show on mobile
let reviews = []

const reviewContainer = document.querySelector('.review-container')
const loadMoreBtn = document.querySelector('.load-more-btn')

// Fetch reviews from reviews.json
const handleReviews = async () => {
  const response = await fetch('/reviews.json')
  const data = await response.json()
  reviews = data
  reviewRenderer()
}

// Render reviews dynamically based on screen width
const reviewRenderer = () => {
  reviewContainer.innerHTML = ''
  if (window.innerWidth < 768) {
    // For mobile: show limited number of reviews
    reviews.slice(startIndex, endIndex).forEach(review => {
      reviewContainer.innerHTML += createReviewCard(review)
    })
  } else {
    // For desktop: show all reviews
    reviews.forEach(review => {
      reviewContainer.innerHTML += createReviewCard(review)
    })
  }
}

// Generate stars with gold (filled) and lightgray (empty) based on rating
const generateStar = (rating) => {
  let starsHTML = ''
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      starsHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="rgba(245, 158, 11, 1)" viewBox="0 0 24 24">
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.849L19.335 24 12 20.202 4.665 24 6 15.597 0 9.748l8.332-1.73z"/>
      </svg>`
    } else if (rating > i - 1 && rating < i) {
      // Partial star
      const percentage = (rating - (i - 1)) * 100
      starsHTML += `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="grad${i}">
            <stop offset="${percentage}%" stop-color="rgba(245, 158, 11, 1)"/>
            <stop offset="${percentage}%" stop-color="lightgray"/>
          </linearGradient>
        </defs>
        <path fill="url(#grad${i})" d="M12 .587l3.668 7.431L24 9.748l-6 5.849L19.335 24 12 20.202 4.665 24 6 15.597 0 9.748l8.332-1.73z"/>
      </svg>`
    } else {
      // Empty star
      starsHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="lightgray" viewBox="0 0 24 24">
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.849L19.335 24 12 20.202 4.665 24 6 15.597 0 9.748l8.332-1.73z"/>
      </svg>`
    }
  }
  return starsHTML
}

// Create HTML structure for each review card
const createReviewCard = (review) => {
  const starsHTML = generateStar(review.rating)
  return `<div class="review-card">
            <div class="star-container">
              ${starsHTML}
            </div>
            <p>${review.review}</p>
            <div class="reviewer-info">
              <div class="reviewer-img-container">
                <img src="${review.reviewerImage}" alt="reviewer image">
              </div>
              <div>
                <p class="reviewer-name">${review.reviewerName}</p>
                <p>${review.reviewerDesignation}</p>
              </div>
            </div>
          </div>`
}

// Re-render reviews on window resize (responsive design)
window.addEventListener('resize', () => {
  reviewRenderer()
})

// Load more reviews when 'Load More' button clicked (only on mobile)
loadMoreBtn.addEventListener('click', () => {
  if (window.innerWidth < 768 && reviews.length >= endIndex) {
    endIndex += 1 // Load 1 more review
    reviewRenderer()
  }
})

// Initialize review loading
handleReviews()

// FAQ dropdown toggle function
const handleDropdown = (id, event) => {
  const faqDiv = document.querySelectorAll('.ans-div')
  const drops = document.querySelectorAll('.fa-chevron-down')
  faqDiv.forEach((div, index) => {
    if (index + 1 === id) {
      div.classList.toggle('activeFaq')
      drops[index].classList.toggle('dropBtnActive')
    } else {
      div.classList.remove('activeFaq')
      drops[index].classList.remove('dropBtnActive')
    }
  })
}

// Fetch and render FAQ section dynamically
const fetchFAQ = () => {
  fetch('/faq.json')
    .then(response => response.json())
    .then(data => {
      const faqContainer = document.querySelector('.faq-contents')
      data.forEach((faq) => {
        const faqDiv = `
        <div class="faq-div">
          <div class="faq">
            <h4><span><i class="fa-regular fa-circle-question"></i></span> ${faq.faq}</h4>
            <p onClick="handleDropdown(${faq.id},event)" class="dropdown">
              <i class="fa-solid fa-chevron-down"></i>
            </p>
          </div>
          <div class="ans-div">
            <p>${faq.ans}</p>
          </div>
        </div>`
        faqContainer.innerHTML += faqDiv
      })
    })
}

// Initialize FAQ fetching
fetchFAQ()

// Scroll to top button functionality
const goUpBtn = document.querySelector('.go-up-btn')
goUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
