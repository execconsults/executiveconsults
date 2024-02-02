const express = require('express')
const app = express()
const methodOveride = require('method-override')
const path = require('path')
const ejsMate = require('ejs-mate')
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const ExpressError = require('./views/utilities/ExpressError')
const tailwind = require('tailwindcss')
const axios = require('axios')
const fs = require("fs");
const Contacts = require('./model/appoiment')
// Replace with your Namecheap API credentials
const apiKey = 'cb839aa178c341898fd81c36924005a9';
const userName = 'zlivehe55';
const apiEndpoint = 'https://api.namecheap.com/xml.response';
const nodemailer = require('nodemailer');

// const homeRoute = require('./routes/homeRoutes')

const sessionConfig = {
    secret :'thisshouldbebetter',
    resave:false,
    saveUninitialized:true,
    cookie:{
    httpOnly:true,
    expires: Date.now() + 100 * 60 * 60 * 24 * 7,
    maxAge: 200 * 60 * 60 * 24 * 7
    }
 }


 dbUrl = 'mongodb+srv://zlivhe:pVGMDmaGmxRCenYU@gukari.w3j3o1v.mongodb.net/'
 mongoose.connect(dbUrl, 
 {useNewUrlParser: true,
 useUnifiedTopology: true})
 
 .then(()=>{
    console.log('open')
 })
 .catch(err =>{
    console.log("Oh no")
    console.log(err)
 });
 
app.set('views engine','ejs')
app.set('views', path.join(__dirname, 'views')); 
app.engine('ejs',ejsMate)
app.use(express.json());

app.use(methodOveride('_method'))
app.use(express.static('layouts'))
app.use(express.static('js'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session(sessionConfig))
app.use(flash())

// app.use('/',homeRoute)

 app.use((req, res, next) => {   
    const routes =  req.route
    res.locals.currentUser = req.session.user
   //  console.log(req.session)
    next();
 })
 


 app.get('/',(req,res)=>{
    res.render('view/home.ejs')
 })
 app.get('/pricing',(req,res)=>{
   res.render('view/pricing.ejs')
})
app.get('/creation',(req,res)=>{
   res.render('view/creation.ejs')
})
app.get('/business',(req,res)=>{
   res.render('view/business.ejs')
})
app.get('/support',(req,res)=>{
   res.render('view/support.ejs')
})
app.get('/resources',(req,res)=>{
   res.render('view/resources.ejs')
})
 
app.get('/atom.xml', async (req, res) => {
   try {
     const baseUrl = 'https://uniquweb.com'; // Update with your website's base URL
     const currentDate = new Date().toISOString();
 
     // Generate the sitemap XML dynamically
     let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
     sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
 
     // Add URLs dynamically from your website
     sitemap += `<url>
       <loc>${baseUrl}/</loc>
       <lastmod>${currentDate}</lastmod>
       <priority>1.0</priority>
     </url>\n`;
     sitemap += `<url>
       <loc>${baseUrl}/pricing</loc>
       <lastmod>${currentDate}</lastmod>
       <priority>0.9</priority>
     </url>\n`;
     sitemap += `<url>
     <loc>${baseUrl}/creation</loc>
     <lastmod>${currentDate}</lastmod>
     <priority>0.9</priority>
      </url>\n`;
      sitemap += `<url>
      <loc>${baseUrl}/support</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.9</priority>
   </url>\n`;
      sitemap += `<url>
      <loc>${baseUrl}/resources</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.9</priority>
   </url>\n`;
   sitemap += `<url>
   <loc>${baseUrl}/policy</loc>
   <lastmod>${currentDate}</lastmod>
   <priority>0.8</priority>
   </url>\n`;
   sitemap += `<url>
   <loc>${baseUrl}/privacy</loc>
   <lastmod>${currentDate}</lastmod>
   <priority>0.8</priority>
   </url>\n`;
   sitemap += `<url>
   <loc>${baseUrl}/cookies</loc>
   <lastmod>${currentDate}</lastmod>
   <priority>0.8</priority>
   </url>\n`;
   sitemap += `<url>
   <loc>${baseUrl}/terms</loc>
   <lastmod>${currentDate}</lastmod>
   <priority>0.8</priority>
   </url>\n`;
   sitemap += `<url>
   <loc>${baseUrl}/help</loc>
   <lastmod>${currentDate}</lastmod>
   <priority>0.9</priority>
   </url>\n`;

     sitemap += '</urlset>';
 
     // Save the generated sitemap XML to a file
     const filePath = path.join(__dirname, 'public', 'sitemap.xml');
     fs.writeFileSync(filePath, sitemap, 'utf8');
      console.log(filePath)
     // Set the content type header and send the file as the response
     res.header('Content-Type', 'application/xml');
     res.sendFile(filePath);
   } catch (error) {
     console.error('Error generating sitemap:', error);
     res.status(500).send('Internal Server Error');
   }
 });

app.get('/files',(req,res)=>{
   res.send('sitemap.ejs')
})

app.get('/getstarted',(req,res)=>{
   res.render('view/home.ejs')
})
app.get('/appointments',async(req,res) =>{
   const appoiments  = await Contacts.find({});
   res.render('view/appoiments.ejs',{appoiments})

})
function validateEmailFormat(email) {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return regex.test(email);
 }

app.post('/submit-form', async (req, res) => {
   try {
       // Check if a document with the same data already exists
       const existingContact = await Contacts.findOne(req.body);

       const userEmail = req.body.email
       if (existingContact) {
           // If a duplicate is found, do not save and respond accordingly
           res.status(400).json({ error: 'Duplicate entry. Contact already exists.' });
       } else {
           // Create a new contact document using the Contact model
           const newContact = new Contacts(req.body);

               // Create a reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'uniquwebteam@gmail.com',
        pass: 'ogrf qiks kcoi hjtx',
      },
    });

    // Check if the email is in a valid format
    if (validateEmailFormat(userEmail)) {
      const mailOptions = {
        from: 'uniquwebteam@gmail.com',
        to: userEmail,
        subject: 'Thanks for getting started with uniquweb!',
        html: `
          <p>Hello ${req.body.name},</p>
          <p>This is the uniquweb team thanks for getting started with us and we will contact you shortly </p>
          <p>Longer than 24 hours? you can give us a call providing us your name we will find your quote and proceed to the next step.</p>
          <p>The Uniquweb Team</p>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log('Welcome email sent successfully');
    } else {
      console.error(`Invalid email format for user: ${user._id}`);
    }

           // Save the contact document to the database
           const savedContact = await newContact.save();
    console.log(savedContact)
           // Respond with the saved contact document
           res.status(202).json(savedContact);
       }
   } catch (error) {
       console.error('Error saving contact:', error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});


app.post('/domains/:domainname', async (req, res) => {
   const { domainname } = req.params;
 
   try {
     // Get the client's IP address from the x-forwarded-for header or use the remote address
     const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
 
     // Make a request to check domain availability
     const response = await axios.get(apiEndpoint, {
       params: {
         ApiUser: userName,
         ApiKey: apiKey,
         UserName: userName,
         Command: 'namecheap.domains.check',
         ClientIP: clientIP,
         DomainList: domainname,
       },
     });
     console.log(response)
     // Parse the XML response
     const xmlResponse = response.data;
     // Extract the availability status and pricing information
     const isAvailable = xmlResponse.includes('<Available>true</Available>');
     const domainPrice = isAvailable
       ? parseFloat(xmlResponse.match(/<DomainCheckResult Price="(\d+\.\d+)"/)[1])
       : null;
 
     res.json({ isAvailable, domainPrice });
   } catch (error) {
     console.error('Error:', error.message);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });
 


app.get('/render/getstarted',(req,res)=>{
   res.render('view/getstarted.ejs')
})

app.get('/policy',(req,res)=>{
   res.render('view/privacy.ejs')
})
app.get('/privacy',(req,res)=>{
   res.render('view/privacy.ejs')
})
app.get('/cookies',(req,res)=>{
   res.render('view/cookies.ejs')
})
app.get('/terms',(req,res)=>{
   res.render('view/terms.ejs')
})
app.get('/help',(req,res)=>{
   res.render('view/help.ejs')
})
// 404 page not found route
app.all('*', (req,res,next)=>{
   next(new ExpressError('Page Not Found', 404))
})
// error hadling 
 app.use((err, req, res, next) =>{
   const { statusCode = 500 } = err;
   if (!err.message) err.message = 'Oh No, Something Went Wrong!'
   res.status(statusCode).render('error.ejs', { err })
})
//server
app.listen(3001, () => {
    console.log('Serving on port 3000')
})