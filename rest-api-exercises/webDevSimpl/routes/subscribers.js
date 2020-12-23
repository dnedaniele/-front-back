const express = require('express');
const router = express.Router();

//ROUTES

//Getting all subscribers

router.get('/', (req, res)=>{
res.send('I server, send you this back')
});

// Getting one subscriber
router.get('/:id', (req, res)=>{
req.params.id
});

// Creating one subscriber
router.post('/', (req, res)=>{
    
    });

// Updating one subscriber

router.patch('/:id', (req, res)=>{
    
});


// Deleting one subscriber

router.delete('/:id', (req, res)=>{
    
});

module.exports = router;