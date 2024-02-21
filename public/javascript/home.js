window.addEventListener('DOMContentLoaded',() =>{
  const currentUrl = window.location.href;

  if(currentUrl.includes('/getstarted')){
    getstartedscreen()
  }

    const body = document.querySelector('html')
    function animateIcons() {
        const icons = document.querySelectorAll('.utilimgs');
        icons.forEach((icon, index) => {
          setTimeout(() => {
            icon.style.opacity = 1;
            icon.style.transform = 'translateY(0)';
          }, 500 * index);
        });
      }
      window.addEventListener('scroll', () =>{
        const scrollY = window.scrollY;
      console.log(scrollY);
      if(scrollY >= 630){
        console.log('d')
        animateIcons()

      }
      
        // alert('ff')
      })
  
      const flagImages = document.querySelectorAll('.flag-img');

      flagImages.forEach((flag, index) => {
        setTimeout(() => {
          flag.style.animationDelay = `${index * 1}s`;
          flag.style.opacity = 1;
        }, 1000); // Adjust the delay as needed
      });

//   setInterval(() =>{
//     animateIcons()
//   },9000)
    
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.querySelector('.navmb');
  const jsmbflexflex = document.querySelector('.jsmbflex')
// Function to handle screen width change
function handleScreenWidthChange() {
  const spw = document.querySelector('.spw');

  // Check if the screen width is 999 pixels or less
  if (window.innerWidth <= 999) {
    spw.classList.add('w-full');
  } else {
    spw.classList.remove('w-full');
  }
}
const contactForm = document.querySelector('#contactForm')

if(contactForm){
  contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Get form data
            const formData = new FormData(event.target);

            // Convert form data to JSON
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            // Make a fetch POST request
            fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                console.log('Success:', data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
        });
}

// Initial call to set the initial state based on the screen width
handleScreenWidthChange();

// Add event listener for screen width changes
window.addEventListener('resize', handleScreenWidthChange);


  mobileMenuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
      jsmbflexflex.classList.toggle('flex')
  });
  const imageSwitch = document.getElementById('imageSwitch');
  if(imageSwitch){
      const images = imageSwitch.querySelectorAll('img');
      let currentIndex = 0;
  
      function switchImages() {
          images[currentIndex].classList.add('hidden');
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].classList.remove('hidden');
      }
  
      setInterval(switchImages, 7000); // Switch every 7 seconds
  
  
  
      const imageSwitchs = document.getElementById('imageSwitchs');
      const imagess = imageSwitchs.querySelectorAll('img');
      let currentIndexs = 0;
  
      console.log(imagess)
      function switchImagess() {
          imagess[currentIndexs].classList.add('hidden');
          currentIndexs = (currentIndexs + 1) % imagess.length;
          imagess[currentIndexs].classList.remove('hidden');
      }
  
      setInterval(switchImagess, 7000); // Switch every 7 seconds
    }
          // VANTA.WAVES({
          // el: '#ring3', // element selector string3 or DOM object reference
          // color: 0x000000,
          // waveHeight: 20,
          // shininess: 50,
          // waveSpeed: 1.5,
          // zoom: 0.75
          // })

          // Initialize variables to hold VANTA instances
let cloudsInstance = null;
let birdsInstance = null;

// Get the checkbox element
const toggleCheckbox = document.getElementById('toggleA');

// Function to initialize VANTA animations
function initVanta() {
    // Initialize clouds
    cloudsInstance = VANTA.CLOUDS({
        el: "#ring3",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        speed: 1.00,
        sunColor: 0x0,
        sunGlareColor: 0x0,
        sunlightColor: 0x34ed
    });
    cloudsInstance = VANTA.GLOBE({
      el: "#ring2",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 400.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x2e53de,
      backgroundColor: 0x24e1e1,
        color2: 0x3c2f2f,
        size: 2,
  });

    // Initialize birds
    birdsInstance = VANTA.BIRDS({
        el: "#birdmobile",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        color1: 0xa4ff,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00
    });
        VANTA.GLOBE({
  el: "#glodb",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 400.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  backgroundColor: 0x24e1e1,
    color2: 0x3c2f2f,
    size: 2,
})


}

// Function to destroy VANTA instances
function destroyVanta() {
    // Destroy clouds instance
    if (cloudsInstance) {
        cloudsInstance.destroy();
    }

    // Destroy birds instance
    if (birdsInstance) {
        birdsInstance.destroy();
    }
}

// Function to save the checkbox state to localStorage
function saveCheckboxState() {
    localStorage.setItem('animationEnabled', toggleCheckbox.checked);
}

// Function to load the checkbox state from localStorage
function loadCheckboxState() {
    const animationEnabled = localStorage.getItem('animationEnabled');
   if (animationEnabled === null) {
        // Set the checkbox to checked and initialize VANTA only if animationEnabled is not present
        toggleCheckbox.checked = true;
        initVanta();
    } else if (animationEnabled === 'true') {
        // Set the checkbox to checked and initialize VANTA if animationEnabled is 'true'
        toggleCheckbox.checked = true;
        initVanta();
    } else {
        // Set the checkbox to unchecked and destroy VANTA if animationEnabled is 'false'
        toggleCheckbox.checked = false;
        destroyVanta();
    }

}

// Add an event listener for the 'change' event
toggleCheckbox.addEventListener('change', function () {
    // Check if the checkbox is checked
    if (this.checked) {
        // Initialize VANTA animations
        initVanta();
    } else {
        // Destroy VANTA instances
        destroyVanta();
    }

    // Save the state to localStorage
    saveCheckboxState();
});

// Load the initial state from localStorage
loadCheckboxState();


      const scrollers = document.querySelectorAll(".scroller");
  
  // If a user hasn't opted in for recuded motion, then we add the animation
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }
  
  function addAnimation() {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute("data-animated", true);
  
      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
  
      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

const contectbtn = document.querySelectorAll('.getstartedbtn')
  contectbtn.forEach(startbtn =>{
  startbtn.addEventListener('click',function(){
  window.location.href = '/pricing'
  })
  })
  
//   function getstartedscreen(){
//     window.scrollTo({ top: 0, behavior: 'smooth' });

//     fetch(`/render/getstarted`)
//       .then(response => response.text())
//       .then(html => {
//       const page1 = document.querySelector('.page1')

//           page1.innerHTML = ''
//           page1.innerHTML = html;

//           // contentcurrent.classList.add('fullscreen')
//           history.pushState({ getstarted: 3 }, `make: ${3}`, `/getstarted`);
//       })

//       .catch(error => console.error('Error fetching content:', error))
//       .finally(() => {
        
//           // Hide the loading bar when the fetch is completed
//           // hideProgressBar();
//           const singlebtn = document.querySelector('.single')
//           const buisnessbtn = document.querySelector('.buisness')
//           const sitefwbtns = document.querySelectorAll('.sitefw')
//           const sitedbbtns = document.querySelectorAll('.sitedb')
//           const pricebtn = document.querySelector('.price')
//           const dbop = document.querySelector('.db-op')
//           const recepit = document.querySelector('.recepit')
//           const  recepttopay = document.querySelector('.recepttopay')
//           const totalp = document.querySelector('.totalp')
         
//           // let balance = 0;
      
      
//           function calculateBalance(data) {
//         let balance = 0;
//         recepit.innerHTML = `<div class="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
//           <h2 class="text-2xl font-bold mb-4">Monthly Receipt</h2>
//           <ul class="space-y-2">`;
      
//         for (let i = 0; i < data.length; i++) {
//           balance += data[i].amount;
//           recepit.innerHTML += `
//             <li class="flex justify-between">
//               <span>${data[i].name}:</span>
//               <span>$${data[i].amount}</span>
//             </li>`;
           
//         }
      
//         recepit.innerHTML += `</ul>
//           <div class="flex justify-between mt-4">
//             <span class="font-semibold">Total:</span>
//             <span class="font-semibold">$${balance}</span>
//           </div>
//         </div>`;
        
//         totalp.innerHTML = `</ul>
//           <div class="flex justify-between mt-4">
//             <span class="font-semibold">Total:</span>
//             <span class="font-semibold">$${balance}</span>
//           </div>
//         </div>`;
//         pricebtn.innerHTML = balance;
      
//         return balance;
//       }
      
//           let monthly = [
//         {
//           type: 'SEO',
//           name: 'SEO Boost',
//           amount: 15
//         },
//         {
//           type: 'SEO',
//           name: 'Regular Boost',
//           amount: 10
//         },
//         {
//           type: 'Database',
//           name: 'shared',
//           amount: 0
//         },
//         {
//           type: 'Hosting',
//           name: 'hosting',
//           amount: 7
//         },
//         {
//           type: 'Developer Fee',
//           name: 'price',
//           amount: 150
//         }
//       ];
//           let balance = calculateBalance(monthly);
//           let domainName;
//           let type = "single";
//           let planData = {}
//           let fremeworok = "nodejs" //user fram work
      
      
//           let database = "shared"
//           let hosting = "3gb"
      
        
//           // function updateprice(amount,type){
           
//           //   balance = balance + amount
//           //   pricebtn.innerHTML = balance
//           // }
      
//           if (database == "shared") {
//             const nodefw = document.querySelector('.shared')
//             nodefw.classList.add('activedb')
            
//           }
      
//           if (fremeworok == "nodejs") {
//             const nodefw = document.querySelector('.nodejs')
//             nodefw.classList.add('activefw')
//           }
//           if (type == "single") {
//             singlebtn.classList.add('bg-white')
      
//           } else {
//             buisnessbtn.classList.add('bg-white')
      
//           }
      
      
      
//           sitedbbtns.forEach(dbbtn => {
      
//       dbbtn.addEventListener('click', function (e) {
//         for (let fw of sitedbbtns) {
//           fw.classList.remove('activedb')
//         }
//         const dataname = dbbtn.getAttribute('data-id')
//         const textfw = document.querySelector('.textdb')
//         database = dataname
//         if (dataname == "shared") {
//           textfw.innerHTML = `For learning and exploring MongoDB in a cloud environment. Basic configuration options.  <a  target="_blank" href="https://www.mongodb.com/pricing"><b>Learn more</b></a>`
//           monthly[2].amount = 0
//           calculateBalance(monthly)
      
//         } else if (dataname == "serverless") {
//           textfw.innerHTML = `For serverless applications with variable or infrequent traffic. Minimal configuration required.  <a  target="_blank" href="https://www.mongodb.com/pricing"><b>Learn more</b></a>`
//           monthly[2].amount = 57
//           calculateBalance(monthly)
      
      
      
//         } else if (dataname == "dedicated") {
//           textfw.innerHTML = `For production applications with sophisticated workload requirements. Advanced configuration controls. <a  target="_blank" href="https://www.mongodb.com/pricing"><b>Learn more</b></a> `
//           monthly[2].amount = 27
//           calculateBalance(monthly)
      
      
//         }
//         dbbtn.classList.add('activedb')
//       })
//       })
      
      
      
//           sitefwbtns.forEach(fwbtn => {
      
//             fwbtn.addEventListener('click', function (e) {
//               for (let fw of sitefwbtns) {
//                 fw.classList.remove('activefw')
//               }
//               const dataname = fwbtn.getAttribute('data-id')
//               const textfw = document.querySelector('.textfw')
//               fremeworok = dataname
//               if (dataname == "nodejs") {
//                 textfw.innerHTML = "The best fast and most used in applications "
              
      
//               } else if (dataname == "react") {
//                 textfw.innerHTML = "Fastest rendering serverside easy to read"
      
      
//               } else if (dataname == "go") {
//                 textfw.innerHTML = "Best and fastest mainly known for it's speed with DOM"
      
//               }
//               fwbtn.classList.add('activefw')
//             })
//           })
      
      
      
//           const planRows = document.querySelectorAll('.plan-row');
//           const psc = document.querySelectorAll('.psc')
//           const cpuop = document.querySelector('.cpu-op')
//           const speedop = document.querySelector('.speed-op')
//           const otcop = document.querySelector('.otc-op')
      
          
//           //dp
//           const dcpop = document.querySelector('.dcp-op')
//           const dspop = document.querySelector('.dsp-op')
      
      
//           //plan
      
//           const snplan = document.querySelector('.sn-plan-op')
//           const poplan = document.querySelector('.po-plan-op')
      
//           planRows.forEach(plan => {
//             plan.addEventListener('click', () => {
//               // Remove active class from all plans
//               planRows.forEach(p => {
//                 p.classList.remove('active-plan');
//                 p.classList.remove('border-purple-600');
      
//               });
//               psc.forEach(p => {
//                 p.classList.remove('border-purple-600');
      
//               });
              
      
//               // Add active class to the clicked plan
//               plan.classList.add('active-plan');
//               const logname = plan.getAttribute('data-id')
//               const log =document.querySelector(`#${logname}`)
//               log.classList.add('border-purple-600')
//               log.classList.add('border-4')
      
      
//               // You can now store the selected plan information using JavaScript
//               // For example, you can retrieve the plan details from the clicked plan and store them in a variable.
//               // Here, I'm just logging the plan data to the console.
//               planData = {
//                 instanceType: plan.querySelector('[data-test-id="Instance Type"]').innerText,
//                 ram: plan.querySelector('[data-test-id="RAM"]').innerText,
//                 cpu: plan.querySelector('[data-test-id="CPU"]').innerText,
//                 price: plan.querySelector('[data-test-id="Price"]').innerText,
//               };
//               const priceMatch = planData.price.match(/\d+/);
//             const priceValue = priceMatch ? parseInt(priceMatch[0], 10) : 0;
      
//             monthly[3].amount = priceValue;
//               calculateBalance(monthly)
//               console.log('Selected Plan:', planData);
//             });
//           });
      
//           singlebtn.addEventListener('click', function (e) {
//             const dataname = singlebtn.getAttribute('data-type')
      
//             planData = {
//                 "instanceType": "Starter",
//                 "ram": "512 MB",
//                 "cpu": "0.5 CPU",
//                 "price": "$7 / month"
//             }
//             type = dataname
//             database = "Shared"
//             monthly[3].amount = 7;
//               monthly[2].amount = 0;
      
//               calculateBalance(monthly)
      
//             sitedbbtns.forEach(sct =>{
//               sct.classList.remove('activedb')
//             })
//             planRows.forEach(p => {
//                 p.classList.remove('active-plan');
      
//               });
//               psc.forEach(p => {
//                 p.classList.remove('border-purple-600');
//                 p.classList.remove('border-4');
      
//               });
//             buisnessbtn.classList.remove('bg-white')
//             singlebtn.classList.add('bg-white')
//             dbop.innerHTML = `5 <span class="mg-to-t " style="font-size: 14px; ">gb</span>`
//             cpuop.innerHTML = `.5 <span class="mg-to-t " style="font-size: 14px;">cpu</span>`
//             speedop.innerHTML = `1.9 <span class="mg-to-t " style="font-size: 14px;">s</span>`
//             otcop.innerHTML = `$15`
//             snplan.classList.add('active-plan')
//             dspop.classList.add('activedb')
      
//             const logname = snplan.getAttribute('data-id')
//               const log =document.querySelector(`#${logname}`)
//               log.classList.add('border-purple-600')
//               log.classList.add('border-4')
      
//           })
      
//           buisnessbtn.addEventListener('click', function (e) {
//             const dataname = buisnessbtn.getAttribute('data-type')
      
//             planData = {
//               "instanceType": "Pro",
//               "ram": "4 GB",
//               "cpu": "2 CPU",
//               "price": "$85 / month"
//               }
//               type = dataname
//               database = "Dedicated"
//               monthly[3].amount = 85;
//               monthly[2].amount = 57;
      
//               calculateBalance(monthly)
      
//             sitedbbtns.forEach(sct =>{
//               sct.classList.remove('activedb')
//             })
//             planRows.forEach(p => {
//                 p.classList.remove('active-plan');
      
//               });
//               psc.forEach(p => {
//                 p.classList.remove('border-purple-600');
//                 p.classList.remove('border-4');
      
      
//               });
      
              
//             dbop.innerHTML = `10 <span class="mg-to-t " style="font-size: 14px; ">gb</span>`
//             cpuop.innerHTML = `2 <span class="mg-to-t " style="font-size: 14px;">cpu</span>`
//             speedop.innerHTML = `.7 <span class="mg-to-t " style="font-size: 14px;">s</span>`
//             otcop.innerHTML = `$35`
//             dcpop.classList.add('activedb')
            
      
//             poplan.classList.add('active-plan')
//             singlebtn.classList.remove('bg-white')
//             buisnessbtn.classList.add('bg-white')
//             const logname = poplan.getAttribute('data-id')
//             const log =document.querySelector(`#${logname}`)
//             log.classList.add('border-purple-600')
//             log.classList.add('border-4')
//           })
      
      
      
//           const domainInput = document.getElementById('domainInput');
//           const resultContainer = document.getElementById('resultContainer');
      
//           domainInput.addEventListener('input', debounce(checkDomainAvailability, 500));
      
//           async function checkDomainAvailability() {
//             const domainName = domainInput.value.trim();
//             if (!domainName) {
//               // Clear result container if the input is empty
//               resultContainer.textContent = '';
//               return;
//             }
      
//             try {
//               const response = await fetch(`/domains/${encodeURIComponent(domainName)}`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//               });
      
//               if (response.ok) {
//                 const result = await response.json();
      
//                 // Update the UI based on availability
//                 resultContainer.textContent = '';
//                 const checkIcon = document.createElement('span');
//                 checkIcon.className = result.isAvailable ? 'text-success' : 'text-danger';
//                 checkIcon.textContent = result.isAvailable ? '\u2713' : '\u2717';
//                 resultContainer.appendChild(checkIcon);
      
//                 if (result.isAvailable) {
//                   const priceInfo = document.createElement('div');
//                   priceInfo.textContent = ` | Price: $${result.domainPrice}`;
//                   resultContainer.appendChild(priceInfo);
//                 }
//               } else {
//                 console.error('Server response not OK');
//                 resultContainer.textContent = 'Error checking domain availability';
//               }
//             } catch (error) {
//               console.error('Error:', error.message);
//               resultContainer.textContent = 'Error checking domain availability';
//             }
//           }
      
//           // Simple debounce function to delay the API request
//           function debounce(func, delay) {
//             let timeout;
//             return function () {
//               const context = this;
//               const args = arguments;
//               clearTimeout(timeout);
//               timeout = setTimeout(() => {
//                 func.apply(context, args);
//               }, delay);
//             };
//           }
//           VANTA.FOG({
//             el: "#backfof",
//             mouseControls: true,
//             touchControls: true,
//             gyroControls: false,
//             minHeight: 200.00,
//             minWidth: 200.00,
//             highlightColor: 0xffffff,
//             midtoneColor: 0xffffff,
//             lowlightColor: 0xffffff,
//             baseColor: 0xffffff
//           })
//               const detailscreen = document.querySelector('.details')
//           const purchescreen = document.querySelector('.purches')
//         const nextinfobutton = document.querySelector('.nextinfobutton')
//         const backedit = document.querySelector('.backedit')
      
//         nextinfobutton.addEventListener('click', function(e){
      
      
//           detailscreen.classList.add('hidden')
//           purchescreen.classList.remove('hidden')
      
//         })
      
//         backedit.addEventListener('click',function(e){
//          detailscreen.classList.remove('hidden')
//           purchescreen.classList.add('hidden')
//         })
//       // Assuming you have a form element with the id 'contactForm'
//       const form = document.getElementById('contactForm');
//        // Get form input values
      
        
//       const submit = document.querySelector('.senddata')
//       submit.addEventListener('click',function(e){
//           const name = document.getElementById('name').value;
//           const email = document.getElementById('email').value;
//           const tel = document.getElementById('tel').value;
//           const category = document.getElementById('countries').value;
//           const company = document.getElementById('company').value;
//           const message = document.getElementById('message').value;
      
       
//         // Create a FormData object
      
//       // Combine form data with other variables
//       const requestData = {
//         balance,
//         domainName,
//         type,
//         planData,
//         fremeworok,
//         database,
//         hosting,
//         name,
//         email,
//         tel,
//         category,
//         company,
//         message
//       };
//       console.log(requestData)
      
//       // Make a POST request
      
      
//       fetch('/submit-form', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Success:', data);
//           purchescreen.innerHTML = `
//           <div class=" flex justify-center text-cneter text">
      
//           <span class="p-3"> Successfully booked your quote make sute the <b> check your email </b> for further details or give us a call providing details wel'll find you right away. </span>
//               <a href="/" class="p-3 rounded-lg bg-blue-500">Home</a>
      
//             </div>
//           `
        
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//       })
      
      
//       });
// }

// Event listener for popstate event when navigating back or forward
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.getstarted) {
      const id = event.state.getstarted;
      getstartedscreen(id);
      window.location.reload()

  }
  else if (event.state && event.state.settings) {
      const settings = event.state.settings;
                          window.location.reload()

  }else{
                          window.location.reload()

  }
  })


// function([string1, string2],target id,[color1,color2])    
consoleText(['Executiveconsults.', 'Market.', 'Deploy '], 'text',['tomato','rebeccapurple','lightblue']);

function consoleText(words, id, colors) {
if (colors === undefined) colors = ['#fff'];
var visible = true;
var con = document.getElementById('console');
var letterCount = 1;
var x = 1;
var waiting = false;
var target = document.getElementById(id)
console.log(target)
target.setAttribute('style', 'color:' + colors[0])
window.setInterval(function() {

if (letterCount === 0 && waiting === false) {
waiting = true;
target.innerHTML = words[0].substring(0, letterCount)
window.setTimeout(function() {
var usedColor = colors.shift();
colors.push(usedColor);
var usedWord = words.shift();
words.push(usedWord);
x = 1;
target.setAttribute('style', 'color:' + colors[0])
letterCount += x;
waiting = false;
}, 1000)
} else if (letterCount === words[0].length + 1 && waiting === false) {
waiting = true;
window.setTimeout(function() {
x = -1;
letterCount += x;
waiting = false;
}, 1000)
} else if (waiting === false) {
target.innerHTML = words[0].substring(0, letterCount)
letterCount += x;
}
}, 120)
window.setInterval(function() {
if (visible === true) {
con.className = 'console-underscore hidden'
visible = false;

} else {
con.className = 'console-underscore'

visible = true;
}
}, 400)
}

})

  