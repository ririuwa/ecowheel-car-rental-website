// Javascript for Header \n]=
// functionality - Enhanced for responsiveness
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);

// Update button icon dynamically
const btn = event.target.closest('.btn-primary');
const icon = btn.querySelector('i');
if (isDark) {
    icon.className = 'fas fa-sun'; // Change to sun icon
    btn.innerHTML = '<i class="fas fa-sun" style="margin-right: 0.5rem;"></i> Light Mode';
} else {
} 
}  
    
// Smooth scrolling for nav links with offset for sticky header (skip external links)
document.querySelectorAll ('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault ();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { // Only if it's an internal anchor
            const headerOffset = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}
    });
});

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');

        // Update button icon on load
        const btn = document.querySelector('.btn-primary');
        btn.innerHTML = '<i class="fas fa-sun" style="margin-right: 0.5rem;"></i> Light Mode';
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        navLinks.classList.add('mobile-closed'); // Start closed on mobile
    }

        mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        navLinks.classList.toggle('mobile-closed');
    });

    // Close mobile menu on outside when a link is clicked or resize
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && window.innerWidth <= 768) {
navLinks.classList.remove('mobile-open');
navLinks.classList.add('mobile-closed');
        }   
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-open', 'mobile-closed');
       navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
            navLinks.classList.add('mobile-closed');
        }
    });

    //Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('mobile-open');
                navLinks.classList.add('mobile-closed');
            }
        });
    });

    //Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }       
        });
    });
});

// handle Initial Mobile Menu State
if (window.innerWidth <= 768) {
    document.querySelector('.nav-links').style.display = 'none';
}

//javascript for Hero Section functionality
document.addEventListener('DOMContentLoaded', () => {
    const heroSearchForm = document.getElementById('.heroSearch');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    startDateInput.min = today;
    endDateInput.min = today;

    // Ensure end date is after start date
    startDateInput.addEventListener('change', (e) => {
        endDateInput.min = e.target.value;
        if (endDateInput.value < e.target.value) {
            endDateInput.value = '';
        }
    });

    // Form submission handling

    heroSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation
        if (!startDateInput.value || !endDateInput.value) {
            alert('Please select both pickup and drop-off dates to unleash your search.');
            return;
        }

        if (new Date(endDateInput.value) <= new Date(startDateInput.value)) {
            alert('Drop-off date must be after pickup date. choose wisely.');
            return;
        }

        // scroll to fleet section
        document.getElementById('fleet').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'});

            //trigger fleet filter with form values (integrate with existing filterCars function)
            document.getElementById('fleetStartDate').value = startDateInput.value;
            document.getElementById('fleetEndDate').value = endDateInput.value;
            document.getElementById('searchInput').value = document.getElementById('location').value || '';
            document.getElementById('carType').value = document.getElementById('carType').value || ''; 
            filterCars (); // Assuming carType select has same id in fleet section
    });

    // Parallax effect on scroll
    let hero = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) { // Disable on mobile for performance
            const scrolled = window.pageYOffset;
            hero.style.transform= 'translateY = (${scrolled * 0.5}px)'; // Parallax effect
        }
    });

    //Reset parallax on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) { 
            hero.style.transform = 'translateY(0)';
        }       
    });
}); 

//JavaScript for featured cars carousel functionality
let currentFeaturedIndex = 0;
const featuredCards = document.querySelectorAll('.featured-card');
const totalFeatured = featuredCards.length;

function updateFeaturedCarousel() {
    const grid = document.getElementById('featuredGrid');
    const cardWidth = featuredCards[0].offsetWidth + parseInt(getComputedStyle(grid).gap || 0); //approximate width including gap

    //for responsive: On mobile show 1, tablet 2, desktop 3
    if (window.innerWidth <= 768) {
        // Desktop: Use transform for smooth slide (assumes 3 visible, slide by 1)
const translateX = -currentFeaturedIndex * cardWidth;
grid.style.transform = `translateX(${translateX}px)`;
grid.style.transition = 'transform 0.3s ease';

// Loop Logic
if (currentFeaturedIndex >=  totalFeatured -2) {// show last 2 cards + first
    currentFeaturedIndex = 0;
} 
}else {
    // Mobile: No carousel, all visible in stack; reset transform
    grid.style.transform = 'translateX(0)';
}
    }

    function previousfeatured() {
        if (window.innerWidth > 768) {
            currentFeaturedIndex = Math.max(0, currentFeaturedIndex - 1);
            updateFeaturedCarousel();
        }
    }

    function nextfeatured() {
        if (window.innerWidth > 768) {
            currentFeaturedIndex = Math.min(totalFeatured - 3, currentFeaturedIndex + 1); // Adjust for 3 visible
            updateFeaturedCarousel();
        }
    }
    
    // Auto-rotate on desktop (optional)
    let autoRotateInterval;
    function startAutoRotate() {
        if (window.innerWidth > 768 && 
            !autoRotateInterval)  {
       autoRotateInterval = setInterval(nextFeatured, 5000); // Rotate every 5s
            }
    }

    function stopAutoRotate() {
        if(autoRotateInterval) {
            clearInterval(autoRotateInterval);
        autoRotateInterval = null;
        }
    }

    //initialize carousel on load
    document.addEventListener('DOMContentLoaded', () => {
        updateFeaturedCarousel();
        startAutoRotate();
    

    // Pause auto-rotate on hover
    const featuredSection = document.querySelector('featured');
    featuredSection.addEventListener('mouseenter', stopAutoRotate);
    featuredSection.addEventListener('mouseleave', startAutoRotate);
    });

    // Update carousel on window resize
    window.addEventListener('resize', () => {
        stopAutoRotate(); //reset on resize
        setTimeout(updateFeaturedCarousel, 100); // Debounce
        if (window.innerWidth > 768) {
            startAutoRotate();
        }       
    });

    //JavaScript for Testimonials Carousel functionality
    class TestimonialCarousel {
    constructor(carouselId) {
        this.carousel = document.getElementById(carouselId);
        this.testimonials = this.carousel.querySelectorAll('.testimonial');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.total= this.testimonials.length;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.autoRotateInterval = null;
        this.autoRotateInterval = 4000; // 4 seconds

        this.init();
    }

    init() {
        this.updateCarousel();
        this.bindEvents();
        this.startAutoRotate();

        //Handle responsive resize
        window.addEventListener('resize', () =>
            this.handleResize()); 
    }

    bindEvents() {
        // Touch events for swipe
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.carousel.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        //mouse events for drag (optional)
        this.carousel.addEventListener('mousedown', (e) => this.handleMouseStart(e));
        this.carousel.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.carousel.addEventListener('mouseup', (e) => this.handleMouseEnd());
        this.carousel.addEventListener('mouseleave', (e) => this.handleMouseEnd());

// Indicator clicks
this.indicators.forEach((indicator, index) => {
    indicators.addEventListener('click', () => this.goToSlide(index));
});

// Pause on hover
this.carousel.addEventListener('mouseenter', () => this.stopAutoRotate());
this.carousel.addEventListener('mouseleave', () => this.stopAutoRotate());
    }

handleTouchStart (e) {
    this.startX = e. touches [0].clientX;
    this.isDragging = true;
    this.stopAutoRotate();
}

handleTouchMove (e) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.currentX = e.touches[0].clientX
}

handleTouchEnd (e) {
    if (!this.isDragging) return;
    this.isDragging = false;

    const diff = this.startX - this.currentX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            this.nextSlide(); // Swipe right -- next
        } else{
            this.prevSlide(); // Swipe left -- prev
        }
    }

    this.startAutoRotate();
}

handleMouseStart(e) {
    this.startX = e.clientX;
    this.isDragging = true;
    this.stopAutoRotate ();
    e.preventDefault();
}

handleMouseMove (e) {
    if (!this.isDragging) return; 
    this.currentX = e.clientX;
}

handleMouseEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;

    const diff = this.startX - this.currentX;
    const threshold = 50;

    if (Math.abs (diff) > threshold) {
        if (diff > 0) {
            this.nextSlide();
        } else {
            this.prevSlide();
        }
    }

    this.startAutoRotate();
}

updateCarousel() {
    const cardWidth = this.testimonials [0]. offsetWidth + parseInt(getComputedStyle(this.carousel).gap);
const translateX = -this.currentIndex * cardWidth;

this.carousel.style.transgform = 'translateX (${translateX}px)';

// Update Indicators
this.indicators.forEach((ind, i) =>
{
    ind.classList.toggle('active', i === this.currentIndex);
});
}

goToSlide(index) {
    this.currentIndex = (this.currentIndex + 1) % this.total;
    this.updateCarousel();
}

nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.total;
    this.updateCarousel ();
}

prevSlide() {
    this.currentIndex =
    (this.currentIndex -1 + this.total) % this.total;
this.updateCarousel();
}
startAutoRotate() {
    this.startAutoRotate();
    this.autoRotateInterval = setInterval(() => {
        this.nextSlide();
    }, this.autoRotateDelay);
}

stopAutoRotate() {
    if (this.autoRotateInterval) {
        clearInterval(this.autoRotateInterval);
        this.autoRotateInterval = null;
    }
}

handleResize () {
    this.stopAutoRotate();
    setTimeout (() => {
        this.updateCarousel();
        if (window.innerWidth > 480)
        { // Auto-rotate only on larger screens
            this.startAutoRotate();
        }
    }, 250); // Debounce resize
}
}

//Initialize on DOM load 
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel ('testimonialCarousel');
});

//For fleet section - Responsive Filtering and calculator
//assumes carsData, compareList, and related function from global scope

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderFleetCars(carsData);

    //Filter event listeners
    const filterElements = ['searchInput', 'typeFilter', 'fuelFilter', 'priceSlider', 'fleetStartdate', 'fleetEndDate'];
    filterElements.forEach(id => {

        document.getElementById(id)?.addEventListener('input', debounce(filterFleetCars, 300));
    });

    //Price slider value update
document.getElementById ('priceSlider'),addEventListener('input', (e) => {

    document.getElementById('priceValue').textContent = e.target.value;
});

// Calculator events
const calcElements = ['duration', 'insurance', 'driver', 'gps'];
calcElements.forEach(id => {
    document.getElementById(id)?.addEventListener('input', debounce(calculateFleetprice, 100));
});

// Compare button

document.getElementById('viewCompare').addEventListener('click', () => {
    if (compareList.length > 1) {
        renderCompareTable();

        document.getElementById('compareModal').style.display = 'flex';
    } else {
        alert ('add at least 2 cars to compare!');
    }
});

//Set min dates to today (November 10, 2025)
setMindates();
});

//Debounce utility
function debounce (func, wait) {
    let timeout;
    return function
executedFunction(...args) {
    const later = () => {
        clearTimeout(timeout);
        func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
};
}

// Render cars for fleet (with compare button)
function renderFleetCars(cars) {
    const container = document.getElementById('fleetGrid');
    if (!container) return;

    container.innerHTML = cars.map (car => `
        <div class= "car-card" data-id= "${car.id}" data-type="${car.type}" data-fuel="${car.fuel}" data-price="${car.price}" data-name="${car.name}">
<img src="${car.image}" alt="${car.name} rental vehicle" loading="lazy">
<div class="car-card-content">
    <h3>${car.name}</h3>
    <p>$${car.price}/day | ${car.seats} seats | ${car.transmission} | ${car.fuel}
    </p>
    <div class="car-badges">
        <span class="badges">${car.ecoscore}</span>
    </div>
    <button class="btn-primary" onclick="openCarModal(${car.id})">View Details</button>
    <button class="btn-secondary" onclick="addToCompare(${car.id}">Add to Compare</button>
</div>
        </div>
         `).join('');

         // Update compare button count 
         updateCompareButton();
    
}

// Filter function for fleet
function filterFleetCars() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const type = document.getElementById ('typeFilter').value;
    const fuel = document.getElementById('fuelFilter').value;

    const maxPrice = parseInt(document.getElementById('priceSlider').value);
    const startDate =  document.getElementById('fleetStartDate').value;
    const endDate = document.getElementById('fleetEndDate').value;

    let filtered = carsData.filter(car =>
        car.name.toLowerCase().include(search) && 
        (!type || car.type === type) &&
        (!fuel || car.fuel === fuel) &&
        car.price <= maxPrice
    );

    //Date availablity filter (simulate: skip if dates overlap unavailable)
    if (startDate && endDate) {
        filtered = filtered.filter(car=> {
            const carUnavailable = car.unavailable || [];
            const range = getDateRange(startDate, endDate);
            return ! carUnavailable.some(unavail => range.include(unavail));
        });
    }
    renderFleetCars(filtered);
}

// Helper for date range
function getDateRange(start, end) {
    const dates = [];
    let current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {

        dates.push(current.toISOString().split('T')
    [0]);
    current.setDate(current.getDate() + 1);
    }
    return dates;
}

// Calculator for fleet (uses first car's price or default)
let selectedCarPrice = 89; // Default; update on car select
function calculateFleetprice() {
    const duration = parseInt(document.getElementById('duration').value) || 1;
    let extras = 0;
    if (document.getElementById('insurance').checked) extras += 10;
    if (document.getElementById('driver').checked) extras += 20;
    if (document.getElementById('gps').checked) extras += 5;
    const total = (selectedCarPrice * duration) + extras;

    document.getElementById('totalPrice').textContent = '$${total}';
      
}

// Update compare button 
function updateCompareButton() {     
    const btn = document.getElementById('viewCompare');    
     const countSpan = btn.querySelector('.compare-count');    
      countSpan.textContent = `(${compareList.length})`;  
         btn.disabled = compareList.length < 2; 
        }  
         
         // Set min dates 
         function setMinDates() {    
             const today = '2025-11-10'; // Current date     
             ['fleetStartDate', 'fleetEndDate'].forEach(id => {        
                 const input = document.getElementById(id);       
                   input.min = today;       
                     input.value = today;   
                      });
                     } 
 // Extend openCarModal to update calculator price
  function openCarModal(carId) {    
     const car = carsData.find(c => c.id === carId); 
    if (car) selectedCarPrice = car.price;   
      calculateFleetPrice();    
       // Original modal logic here...
        } 
        
        // Extend addToCompare 
function addToCompare(carId) {  
       const car = carsData.find(c => c.id === carId);    
        if (!compareList.find(c => c.id === carId) && compareList.length < 4) {      
               compareList.push(car);        
                updateCompareButton();        
// Visual feedback: highlight card or toast   
      const card = document.querySelector(`[data-id="${carId}"]`);  
     card.style.border = '2px solid #FF6347';      
        setTimeout(() => card.style.border = '', 1000);   
      }
    
    }

// Booking Flow JS - Integrates with carsData (assume global)

 let currentStep = 1; 
 let selectedCar = null; 
 let bookingData = {}; // Store form data across steps 
 
 // Car options population
  function populateCarSelect() {   
      const select = document.getElementById('carSelect');  
         select.innerHTML = '<option value="">Select a car...</option>' +  carsData.map(car => <option value="${car.id}">${car.name} - $${car.price}/day</option>).join(''); } 
          // Step Navigation 
function nextStep(step) {   
  if (!validateStep(step)) return;       
     // Save data    
      saveStepData(step);      
      
      // Hide current, show next   
  document.querySelector(`[data-step="${step}"]`).classList.remove('active'); 
      document.querySelector('.progress-step[data-step="' + step + '"]').classList.remove('active'); 
          currentStep = step + 1;    
 document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');    
  document.querySelector('.progress-step[data-step="' + currentStep + '"]').classList.add('active');     
  
  if (currentStep === 3) openSummaryModal();   
    if (currentStep === 2) updateStep2UI(); } 
    
    function prevStep(step) {    
         document.querySelector(`[data-step="${step}"]`).classList.remove('active'); 
             document.querySelector('.progress-step[data-step="' + step + '"]').classList.remove('active');  
       currentStep = step - 1;   
         document.querySelector(`[data-step="${currentStep}"]`).classList.add('active'); 
             document.querySelector('.progress-step[data-step="' + currentStep + '"]').classList.add('active');
             } 
              // Validation 
    function validateStep(step) {   
      let valid = true;
     if (step === 1) {   
      const car = document.getElementById('carSelect').value;  
             const start = document.getElementById('startDate').value;  
           const end = document.getElementById('endDate').value; 
            if (!car || !start || !end || new Date(end) <= new Date(start)) { 
                alert('Please select a car and valid dates.');     
                        valid = false;    
             } 
    } else if (step === 2) {  

              // Optional: Validate extras if needed   
          }  
             return valid;
             } 
     function saveStepData(step) {  
           if (step === 1) {      
       bookingData.carId = document.getElementById('carSelect').value; 
    bookingData.location = document.getElementById('location').value;   
      bookingData.startDate = document.getElementById('startDate').value;   
      bookingData.endDate = document.getElementById('endDate').value;   
      selectedCar = carsData.find(c => c.id == bookingData.carId); 
        } else if (step === 2) {      
               bookingData.duration = parseInt(document.getElementById('duration').value) || 1;
                 bookingData.extras = {         
        insurance: document.getElementById('insurance').checked,  
      driver: document.getElementById('driver').checked,   
     gps: document.getElementById('gps').checked  
           };  
           } 
        } 

 // Update Step 2 UI 
 function updateStep2UI() { 
     if (!selectedCar) return;    
     
     document.getElementById('selectedCarName').textContent = selectedCar.name;  
     
     document.getElementById('basePrice').textContent = selectedCar.price;     
     
     document.getElementById('calcDuration').textContent = bookingData.duration || 1; 
         calculateBookingPrice(); 
        } 
        
        // Real-time Calculator
          function calculateBookingPrice() {     
        if (!selectedCar) return;   
          const duration = parseInt(document.getElementById('duration').value) || 1;  
             let extrasTotal = 0;   
               if (document.getElementById('insurance').checked) extrasTotal += 10 * duration;  
                  if (document.getElementById('driver').checked) extrasTotal += 20 * duration;   
                    if (document.getElementById('gps').checked) extrasTotal += 5 * duration;    
                     const total = (selectedCar.price * duration) + extrasTotal;  

      document.getElementById('calcTotal').textContent = `$${total}`; 
      
      document.getElementById('totalPrice').textContent = `$${total}`; 
    }  
    
    // Calendar Generation (for selected car)
     function generateBookingCalendar(carId) {   
          const car = carsData.find(c => c.id === carId);   
            if (!car) return;    
     const calendar = document.getElementById('bookingCalendar'); 
         const month = 11; // Nov 2025    
         const year = 2025;    
         const firstDay = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate();   
          let html = '<div class="calendar-row"><div class="calendar-cell header">S</div><div class="calendar-cell header">M</div><div class="calendar-cell header">T</div><div class="calendar-cell header">W</div><div class="calendar-cell header">T</div> <div class="calendar-cell header">F</div><div class="calendar-cell header">S</div></div>';       
          
          // Empty days   
      for (let i = 0; i < firstDay; i++) html += '<div class="calendar-cell"></div>';     
      
      // Days 
    for (let day = 1; day <= daysInMonth; day++) { 
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; 
        const isUnavailable = car.unavailable.includes(dateStr);   
              html += `<div class="calendar-cell ${isUnavailable ? 'unavailable' : ''}" data-date="${dateStr}">${day}</div>`;     
    }  
       calendar.innerHTML = html;   
       
       // Click to select
         document.querySelectorAll('.calendar-cell:not(.unavailable):not(.header)').forEach(cell => { 
            cell.addEventListener('click', (e) => {   
              const date = e.target.dataset.date;    
             if (!bookingData.startDate) {     
                
                document.getElementById('startDate').value = date;   
              bookingData.startDate = date;              
              
              e.target.classList.add('selected');       
                  } else if (!bookingData.endDate && new Date(date) > new Date(bookingData.startDate)) {  
                    
        document.getElementById('endDate').value = date;            
        bookingData.endDate = date;               
          e.target.classList.add('selected'); 
            }    
     }); 
    });
 } 
 
 // Summary Modal
  function openSummaryModal() {  
       const total = parseInt(document.getElementById('totalPrice').textContent.replace('$', '')); 
    const extrasList = []; 
        if (bookingData.extras.insurance) extrasList.push('Insurance'); 
        if (bookingData.extras.driver) extrasList.push('Driver');  
       if (bookingData.extras.gps) extrasList.push('GPS');   
         const extrasText = extrasList.length ? extrasList.join(', ') : 'None';     
         
         document.getElementById('summaryDetails').innerHTML = `      
            <div class="summary-item">           
              <span>Ride:</span> <strong>${selectedCar.name}</strong>   
                    </div>    
            <div class="summary-item">       
      <span>Location:</span> <strong>${bookingData.location}</strong> 
              </div>      
       <div class="summary-item">     
        <span>Dates:</span> <strong>${bookingData.startDate} to ${bookingData.endDate} (${bookingData.duration} days)</strong>  
               </div>       
          <div class="summary-item">    
         <span>Extras:</span> <strong>${extrasText}</strong>   
      </div>       
  <div class="summary-item total-item">  
           <span>Total:</span> <strong>$${total}</strong>     
               </div>   
  `;   
  
  document.getElementById('summaryModal').style.display = 'flex';  
     currentStep = 3;   
       document.querySelector('.progress-step[data-step="3"]').classList.add('active');
     } 
     
     function closeSummaryModal() {   
        
        document.getElementById('summaryModal').style.display = 'none'; 
            prevStep(3);
         } 
         
         function confirmBooking() {   
  alert('Booking confirmed! Your conquest begins. (Simulated submission)'); 
      // Reset form or redirect     
      
document.getElementById('bookingForm').reset();  
   currentStep = 1;  
      closeSummaryModal();
     } 
     
     // Event Listeners 
document.addEventListener('DOMContentLoaded', () => { 
        populateCarSelect();    
        
        document.getElementById('carSelect').addEventListener('change', (e) => {  
       const carId = e.target.value;     
           if (carId) {      
       generateBookingCalendar(carId);
             selectedCar = carsData.find(c => c.id == carId);  
           calculateBookingPrice();       
          }    
         });    
         
         // Date sync 
    const startInput = document.getElementById('startDate');  
       const endInput = document.getElementById('endDate');  
       startInput.addEventListener('change', () => {     
        endInput.min = startInput.value;       
          if (endInput.value < startInput.value) endInput.value = '';     
              calculateBookingPrice();    
             });  
   endInput.addEventListener('change', () => {   
      if (new Date(endInput.value) < new Date(startInput.value)) { 
            alert('End date must be after start date.');    
         endInput.value = '';      
   }     
    calculateBookingPrice();  
   });     
   
   // Extras & Duration  
   
   document.getElementById('duration').addEventListener('input', calculateBookingPrice);  
      ['insurance', 'driver', 'gps'].forEach(id => { 

         document.getElementById(id).addEventListener('change', calculateBookingPrice); 
            });         
            
            // Modal close   
  window.addEventListener('click', (e) => {    
         if (e.target.id === 'summaryModal') closeSummaryModal(); 
    });   
      document.addEventListener('keydown', (e) => {  
       if (e.key === 'Escape') closeSummaryModal();  
       }); 
    }); 
    
// Simple JS Enhancements for About/Services Section
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    // Observe all major blocks
    document.querySelectorAll('.story-grid, .mission-values, .eco-section, .addons-section, .value-card, .addon-card, .eco-point').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Optional CSS for reveal animation (add to <style>)
const revealCSS = `
.fade-in {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.reveal {
    opacity: 1;
    transform: translateY(0);
}
`;

// Inject if needed
const style = document.createElement('style');
style.textContent = revealCSS;
document.head.appendChild(style);


// CONTACT & ACCOUNT JS
document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });

    // Live Chat Toggle
    window.toggleChat = function() {
        document.querySelector('.chat-body').classList.toggle('open');
        document.querySelector('.chat-close').style.display = 
            document.querySelector('.chat-body').classList.contains('open') ? 'block' : 'none';
    };

    // Contact Form Submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! We\'ll reply within 60 minutes.');
        e.target.reset();
    });

    // Account Tabs
    window.switchTab = function(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(tab + 'Tab').classList.add('active');
    };

    // Simple Auth with localStorage
    const savedUser = localStorage.getItem('apexUser');
    if (savedUser) {
        showDashboard(JSON.parse(savedUser));
    }

    // Login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = { name: 'Warrior' }; // Simulate login
        localStorage.setItem('apexUser', JSON.stringify(user));
        showDashboard(user);
    });

    // Register
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = { name: document.querySelector('#registerTab input[type="text"]').value.split(' ')[0] || 'Warrior' };
        localStorage.setItem('apexUser', JSON.stringify(user));
        showDashboard(user);
    });

    // Show Dashboard
    function showDashboard(user) {
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.querySelector('.auth-tabs').style.display = 'none';
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('userName').textContent = user.name;
        // Load saved bookings from localStorage or simulate
        document.getElementById('bookingsList').innerHTML = 'No bookings yet. <a href="#fleet">Start dominating →</a>';
    }

    // Logout
    window.logout = function() {
        localStorage.removeItem('apexUser');
        document.getElementById('dashboard').classList.add('hidden');
        document.querySelector('.auth-tabs').style.display = 'flex';
        switchTab('login');
    };
});

//Footer JS - Newsletter & Animations
document.addEventListener('DOMContentLoaded', () => {
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email && email.includes('@')) {
            newsletterSuccess.classList.add('show');
            newsletterForm.querySelector('input').value = '';
            setTimeout(() => {
                newsletterSuccess.classList.remove('show');
            }, 4000);
        }
    });

    // Scroll reveal for footer elements
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.footer-links, .footer-newsletter, .footer-brand').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        footerObserver.observe(el);
    });

    // Back to top button (optional enhancement)
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #B22222, #FF6347);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease;
        z-index: 99;
        box-shadow: 0 10px 20px rgba(178,34,34,0.4);
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});



