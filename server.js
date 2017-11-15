var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
app.listen(8000, function() {
 console.log("listening on port 8000");
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret: 'codingdojorocks'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(path.join(__dirname, './public/dist')));


var ProductSchema = new mongoose.Schema({
    title:{type:String, minlength:4, required:true},
    price:{type: Number,required:true},
    imgurl:{type:String, required:true}
},{timestamps:true});

mongoose.model("Product",ProductSchema);
var Product = mongoose.model('Product');

app.get('/products', function(req, res){
    Product.find({}).sort({createdAt:'desc'}).exec(function(err, products){
        if(err){
            console.log("can not get all products.");
        }else{
            res.json(products);
        }
    })
})


app.put('/products/edit/:id', function(req, res){
    Product.findOne({_id: req.params.id},function(err, product){
        if(err){
            console.log("can not find this product.")
        }else{
            product.title = req.body.title;
            product.price = req.body.price;
            product.imgurl = req.body.imgurl;
            product.save(function(err){
                if(err){
                    console.log("can not update product.");
                }else{
                    res.redirect('/products');
                }
            })
        }
    })

})

app.post('/products', function(req, res){
    var new_product = new Product(req.body);
    new_product.save(function(err){
        if(err){
            console.log("there is a error for add product.")
        }else{
            res.redirect('/products');
        }
    })
})

app.delete('/products/destroy/:id',function(req,res){
    Product.remove({_id: req.params.id}, function(err){
        if(err){
            console.log("can not delete add product.")
        }else{
            res.redirect('/products');
        }
    })
})

app.get('/products/:id', function(req, res){
    Product.findOne({_id: req.params.id}, function(err, pro){
        if(err){
            console.log("can not find the one product.")
        }else{
            res.json(pro);
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});