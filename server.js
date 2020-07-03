const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = 'Users';
const MONGO_URL = 'mongodb://localhost:27017/${DATABASE_NAME}';

const uuid = require('uuid/v4')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const test = require('./products.json');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});
router.post('/login', jsonParser, async function Login(req, res) {
    const username = req.body.username;
    const pass = req.body.password;
    const objet = {
        'username': username,
        'password': pass,
    }
    const result = await collection.findOne(objet);
    if (result === null) {
        return res.status(500).send();
    } else {
        req.session.user = username;
        req.session.loggedIn = true;
        res.redirect('/makeup');
    }
});


router.get('/logout', function(req, res, next) {
    req.session.destroy()
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/profile', isLoggedIn, function(req, res) {
    res.send('User is login: ' + req.session.user);
});

router.get('/about', function(req, res) {
    if (req.session.user === undefined) {
        res.render('about', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('about', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/sign up.html'));
});

router.post('/signup', jsonParser, async function SignUp(req, res) {
    const username = req.body.username;
    const pass = req.body.password;
    const email = req.body.email;
    const objet = {
        'username': username,
        'password': pass,
        'email': email
    }
    const check_username = {
        'username': username
    }
    const check_email = {
        'email': email
    }
    const checkus = await collection.findOne(check_username);
    const checkmail = await collection.findOne(check_email);
    // console.log(checkus);
    if (checkus === null && checkmail === null) {
        const result = await collection.insertOne(objet);
        res.redirect('/login');
    } else {
        res.send('Đăng kí không hợp lệ!');
    }
});

router.get('/skincare', async function(req, res) {
    var list = []
    const length = await products.find({ "type": "skin care" }).count();
    for (var i = 1; i <= 6; i++) {
        if (i <= 9) {
            const id = 's0' + i;
            const obj1 = {
                'id': id
            }
            const skin = await products.findOne(obj1);
            list[i] = skin;
        } else {
            const id = 's' + i;
            const obj1 = {
                'id': id
            }
            const skin = await products.findOne(obj1);
            list[i] = skin;
        }
    }
    if (req.session.user === undefined) {
        res.render('skin', {
            list: list,
            login: 'Log in / Register',
            logout: "",
            nextpage: "Next page",
            previouspage: ""
        })
    } else {
        res.render('skin', {
            list: list,
            login: req.session.user,
            logout: "Log out",
            nextpage: "Next page",
            previouspage: ""
        })
    }
});

router.get('/skincarenext', async function(req, res) {
    var list = []
    const length = await products.find({ "type": "skin care" }).count();
    for (var i = 7; i <= length; i++) {
        if (i <= 9) {
            const id = 's0' + i;
            const obj1 = {
                'id': id
            }
            const skin = await products.findOne(obj1);
            list[i] = skin;
        } else {
            const id = 's' + i;
            const obj1 = {
                'id': id
            }
            const skin = await products.findOne(obj1);
            list[i] = skin;
        }
    }
    if (req.session.user === undefined) {
        res.render('skin', {
            list: list,
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('skin', {
            list: list,
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/perfume', async function(req, res) {
    var list = []
    const length = await products.find({ "type": "fragrance" }).count();
    console.log(length);
    for (var i = 1; i <= 6; i++) {
        if (i <= 9) {
            const id = 'f0' + i;
            const obj1 = {
                'id': id
            }
            const skin = await products.findOne(obj1);
            console.log(skin.image);
            list[i] = skin;
        } else {
            const id = 'f' + i;
            const obj1 = {
                'id': id
            }
            const skin = await products.findOne(obj1);
            list[i] = skin;
        }
    }
    if (req.session.user === undefined) {
        res.render('perfume', {
            list: list,
            login: 'Log in / Register',
            logout: "",
            nextpage: "Next page",
            previouspage: ""
        })
    } else {
        res.render('perfume', {
            list: list,
            login: req.session.user,
            logout: "Log out",
            nextpage: "Next page",
            previouspage: ""
        })
    }
});

router.get('/perfumenext', async function(req, res) {
    var list = []
    const length = await products.find({ "type": "fragrance" }).count();
    console.log(length);
    for (var i = 7; i <= length; i++) {
        if (i <= 9) {
            const id = 'f0' + i;
            const obj1 = {
                'id': id
            }
            const skin = await products.findOne(obj1);
            console.log(skin.image);
            list[i] = skin;
        } else {
            const id = 'f' + i;
            const obj1 = {
                'id': id
            }
            const skin = await products.findOne(obj1);
            list[i] = skin;
        }
    }
    if (req.session.user === undefined) {
        res.render('perfume', {
            list: list,
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('perfume', {
            list: list,
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/makeup', async function(req, res) {
    var list = []
    const length = await products.find({ "type": "makeup" }).count();
    console.log(length);
    for (var i = 1; i <= 6; i++) {
        if (i <= 9) {
            const id = 'm0' + i;
            const obj1 = {
                'id': id
            }
            const makeup = await products.findOne(obj1);
            list[i] = makeup;
            // console.log(list);
        } else {
            const id = 'm' + i;
            const obj1 = {
                'id': id
            }
            const makeup = await products.findOne(obj1);
            list[i] = makeup;
        }
    }
    if (req.session.user === undefined) {
        res.render('make', {
            list: list,
            login: 'Log in / Register',
            logout: "",
            nextpage: "Next page",
            previouspage: ""
        })
    } else {
        res.render('make', {
            list: list,
            login: req.session.user,
            logout: "Log out",
            nextpage: "Next page",
            previouspage: ""
        })
    }
});

router.get('/makeupnext', async function(req, res) {
    var list = []
    const length = await products.find({ "type": "makeup" }).count();
    console.log(length);
    for (var i = 7; i <= length; i++) {
        if (i <= 9) {
            const id = 'm0' + i;
            const obj1 = {
                'id': id
            }
            const makeup = await products.findOne(obj1);
            list[i] = makeup;
            // console.log(list);
        } else {
            const id = 'm' + i;
            const obj1 = {
                'id': id
            }
            const makeup = await products.findOne(obj1);
            list[i] = makeup;
            // console.log(list);
        }
    }
    if (req.session.user === undefined) {
        res.render('make', {
            list: list,
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('make', {
            list: list,
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/collection', function(req, res) {
    if (req.session.user === undefined) {
        res.render('collection', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('collection', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/fags', function(req, res) {
    if (req.session.user === undefined) {
        res.render('FAQs', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('FAQs', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/contact', function(req, res) {
    if (req.session.user === undefined) {
        res.render('contactUs', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('contactUs', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/membership', function(req, res) {
    if (req.session.user === undefined) {
        res.render('membership', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('membership', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/current', function(req, res) {
    if (req.session.user === undefined) {
        res.render('currentOffer', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('currentOffer', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/expired', function(req, res) {
    if (req.session.user === undefined) {
        res.render('expiredOffer', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('expiredOffer', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/find', function(req, res) {
    if (req.session.user === undefined) {
        res.render('find_store', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('find_store', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/notice', function(req, res) {
    if (req.session.user === undefined) {
        res.render('store_notice', {
            login: 'Log in / Register',
            logout: "",
            nextpage: "",
            previouspage: "Previous page"
        })
    } else {
        res.render('store_notice', {
            login: req.session.user,
            logout: "Log out",
            nextpage: "",
            previouspage: "Previous page"
        })
    }
});

router.get('/product/:name', jsonParser, async function(req, res) {
    const obj = {
        'name': req.params.name
    }
    const result = await products.findOne(obj);
    // console.log(result.image);
    // await comments.find({}).toArray(function(err, result){
    //     if(err){
    //         console.log('none');
    //     }
    //     else{
    //         console.log(result);
    //         var list = [];
    //         list = result;
    //         console.log(list[0]);
    //     }
    // });
    // list = length;
    // console.log("LENGTH: " + length);
    // console.log(list);
    if (req.session.user === undefined) {
        res.render('detail', {
            login: 'Log in / Register',
            logout: "",
            'image': result.image,
            'name': result.name,
            'price': result.price,
            'user': req.session.user,
            'cmt': '',
            'description': result.description,
        })
    } else {
        res.render('detail', {
            login: req.session.user,
            logout: "Log out",
            'image': result.image,
            'name': result.name,
            'price': result.price,
            'user': req.session.user,
            'cmt': '',
            'description': result.description,
        })
    }
});

router.post('/comment/:product', jsonParser, Update);
async function Update(req, res) {
    const json = await collection.findOne({
        'username': req.session.user
    });
    const username = req.session.user
    if (json === null) {
        res.status(401).send("Bạn chưa đăng nhập tài khoản");
    } else {
        const doc = await products.findOne({
            'name': req.params.product
        })
        const obj = await comments.insertOne({
            'username': req.session.user,
            'product': req.params.product,
            'cmt': req.body.cmt
        })
        res.render('detail', {
            login: req.session.user,
            logout: "Log out",
            'image': doc.image,
            'name': doc.name,
            'price': doc.price,
            'description': doc.description,
            'user': req.session.user,
            'cmt': req.body.cmt
        });
    }
}

async function insertUser() {
    for (const key of test.products) {
        const objet = {
            'id': key.id,
            'type': key.type,
            'name': key.name,
            'description': key.description,
            'image': key.image,
            'price': key.price
        }
        const result = await products.insertOne(objet);
        console.log('Result: ' + JSON.stringify(result));
    }
}

router.post('/search', jsonParser, async function(req, res) {
    const name = {
        'name': req.body.search
    }
    const obj = await products.findOne(name);
    if (obj == null) {
        res.status(401).send('Sản phẩm không tìm thấy');
    } else {
        if (req.session.user === undefined) {
            res.render('detail', {
                login: 'Log in / Register',
                logout: "",
                'image': obj.image,
                'name': obj.name,
                'price': obj.price,
                'user': req.session.user,
                'cmt': '',
                'description': obj.description,
            })
        } else {
            res.render('detail', {
                login: req.session.user,
                logout: "Log out",
                'image': obj.image,
                'name': obj.name,
                'price': obj.price,
                'user': req.session.user,
                'cmt': '',
                'description': obj.description,
            })
        }
    }
});



app.use('/', router);

// app.listen(process.env.port || 3000);
// console.log('Running at Port 3000');
async function startServer() {
    const client = await MongoClient.connect(MONGO_URL, {
        useNewUrlParser: true
    });
    db = await client.db(DATABASE_NAME);
    collection = await db.collection('user');
    products = await db.collection('products');
    comments = await db.collection('comments');
    console.log(collection);
    // insertUser();
    await app.listen(3000);
    console.log('Listening on port 3000');
}
startServer();