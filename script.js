// Import necessary libraries
const AOS = window.AOS
const Typed = window.Typed
const bootstrap = window.bootstrap

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false,
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".glass-nav")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(74, 157, 95, 0.2)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active")
    }
  })
})

// Skills animation
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width + "%"
  })
}

// Intersection Observer for skills animation
const skillsSection = document.querySelector("#skills")
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills()
        skillsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.3 },
)

if (skillsSection) {
  skillsObserver.observe(skillsSection)
}

// Enhanced parallax effect for floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".floating-shape")

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.3
    const yPos = -(scrolled * speed)
    shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`
  })
})

// Mouse movement effect for hero section
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  const profileImg = document.querySelector(".profile-img")
  if (profileImg) {
    const moveX = (mouseX - 0.5) * 15
    const moveY = (mouseY - 0.5) * 15
    profileImg.style.transform = `translate(${moveX}px, ${moveY}px)`
  }

  // Add subtle glow effect to floating shapes
  const shapes = document.querySelectorAll(".floating-shape")
  shapes.forEach((shape, index) => {
    const moveX = (mouseX - 0.5) * (10 + index * 2)
    const moveY = (mouseY - 0.5) * (10 + index * 2)
    shape.style.filter = `brightness(${1 + mouseX * 0.1})`
  })
})

// Initialize tooltips
document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
    }
  })
}, observerOptions)

// Observe all elements with animate-on-scroll class
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".animate-on-scroll")
  animateElements.forEach((el) => observer.observe(el))
})

// Performance optimization - Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  const lazyImages = document.querySelectorAll("img[data-src]")
  lazyImages.forEach((img) => imageObserver.observe(img))
}

// Add custom cursor effect with green theme
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor")
  if (!cursor) {
    const newCursor = document.createElement("div")
    newCursor.className = "custom-cursor"
    newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(74,157,95,0.8) 0%, rgba(125,211,192,0.4) 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: multiply;
        `
    document.body.appendChild(newCursor)
  }

  const customCursor = document.querySelector(".custom-cursor")
  customCursor.style.left = e.clientX - 10 + "px"
  customCursor.style.top = e.clientY - 10 + "px"
})

// Add hover effects for interactive elements
document.querySelectorAll("a, button, .project-card, .skill-card").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const cursor = document.querySelector(".custom-cursor")
    if (cursor) {
      cursor.style.transform = "scale(2.5)"
      cursor.style.background = "radial-gradient(circle, rgba(74,157,95,1) 0%, rgba(125,211,192,0.6) 100%)"
    }
  })

  element.addEventListener("mouseleave", () => {
    const cursor = document.querySelector(".custom-cursor")
    if (cursor) {
      cursor.style.transform = "scale(1)"
      cursor.style.background = "radial-gradient(circle, rgba(74,157,95,0.8) 0%, rgba(125,211,192,0.4) 100%)"
    }
  })
})

// Add breathing animation to profile image
const profileImg = document.querySelector(".profile-img")
if (profileImg) {
  profileImg.addEventListener("mouseenter", function () {
    this.style.animation = "breathe 2s ease-in-out infinite"
  })

  profileImg.addEventListener("mouseleave", function () {
    this.style.animation = "bounce-slow 3s ease-in-out infinite"
  })
}

// Add breathing animation styles
const breatheStyles = document.createElement("style")
breatheStyles.textContent = `
    @keyframes breathe {
        0%, 100% {
            transform: scale(1);
            filter: brightness(1);
        }
        50% {
            transform: scale(1.05);
            filter: brightness(1.1);
        }
    }
`
document.head.appendChild(breatheStyles)

// Console welcome message with green theme
console.log(`
🌿 Welcome to Hafizul Hafiz's Portfolio! 🌿
🌱 Built with love for technology and clean code
🍃 Enjoy exploring this professional digital portfolio!
🌳 Optimized for performance and accessibility
`)

// Add performance monitoring
const performanceData = {
  loadTime: 0,
  scrollEvents: 0,
  clickEvents: 0,
}

window.addEventListener("load", () => {
  performanceData.loadTime = performance.now()
  console.log(`🚀 Page loaded in ${performanceData.loadTime.toFixed(2)}ms`)
})

document.addEventListener("scroll", () => {
  performanceData.scrollEvents++
})

document.addEventListener("click", () => {
  performanceData.clickEvents++
})

// Accessibility enhancements
document.addEventListener("keydown", (e) => {
  // Skip to main content with Tab key
  if (e.key === "Tab" && !e.shiftKey) {
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )

    // Add focus indicators
    focusableElements.forEach((element) => {
      element.addEventListener("focus", function () {
        this.style.outline = "3px solid rgba(74, 157, 95, 0.8)"
        this.style.outlineOffset = "2px"
      })

      element.addEventListener("blur", function () {
        this.style.outline = ""
        this.style.outlineOffset = ""
      })
    })
  }
})

// Add reduced motion support
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Disable animations for users who prefer reduced motion
  const style = document.createElement("style")
  style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `
  document.head.appendChild(style)
  console.log("♿ Reduced motion mode activated for accessibility")
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎨 Portfolio initialized successfully!")
})
