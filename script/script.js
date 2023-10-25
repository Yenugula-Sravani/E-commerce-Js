console.log("hello world");

let intialproducts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
  },
  {
    id: 6,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    description:
      "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    description:
      "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
  },
];

let UserObjs = [
  { id: 1, email: "admin@admin.com", password: "admin@admin.com" },
  { id: 2, email: "sravani@gmail.com", password: "sravani@gmail.com" },
  { id: 3, email: "santhosh@gmail.com", password: "1234" },
];

window.addEventListener("load", () => {
  //loading all users in all pages after refresh also
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(UserObjs));
  }
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(intialproducts));
  }
  console.log(location.pathname);
  if (location.pathname === "/Onlineshopping/pages/index.html") {
    loadcustomerproducts();
  }
  if (location.pathname === "/Onlineshopping/pages/admin/index.html") {
    loadAdminHomePage();
  }

  if (location.pathname === "/Onlineshopping/pages/cart.html") {
    renderCartItems();
  }
  if (location.pathname === "/Onlineshopping/pages/orders.html") {
    renderOrderPage();
  }
  if (location.pathname === "/Onlineshopping/pages/admin/orders.html") {
    loadAdminOrders();
  }
});

const RandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};
// console.log(RandomNumber());

const getRandomUserId = (type = "users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 1000; i++) {
    const randomId = RandomNumber();
    const checkingUserId = jsonArray.find((obj) => obj.id === randomId);

    if (!checkingUserId) return randomId;
  }
};

//sign in handler
const signInHandler = () => {
  const emailRef = document.getElementById("email");
  const passwordRef = document.getElementById("password");
  const errorRef = document.getElementById("error");

  if (emailRef.value.length > 0 && passwordRef.value.length > 0) {
    let users = JSON.parse(localStorage.getItem("users")); //getting users array from local storage and checking with the new signin values
    const loggedInUser = users.find(
      (user) =>
        user.email === emailRef.value && user.password === passwordRef.value
    );

    if (!loggedInUser) {
      errorRef.innerText = "Invalid Credentials";
    } else {
      sessionStorage.setItem("userId", loggedInUser.id);
      if (emailRef.value === "admin@admin.com")
        location.replace("/Onlineshopping/pages/admin/index.html");
      else location.replace("/Onlineshopping/pages/index.html");
    }
  } else {
    errorRef.innerText = "Email or password is empty";
  }
};

// const validateEmail = (email) => {
//   const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//   return res.test(email);
// };

//signup handler
const signUpHandler = () => {
  let nameRef = document.getElementById("name");
  let emailRef = document.getElementById("email");
  let passwordRef = document.getElementById("password");
  let cpasswordRef = document.getElementById("cpassword");
  let errorRef = document.getElementById("error");

  if (
    nameRef.value.length > 0 &&
    emailRef.value.length > 0 &&
    passwordRef.value.length > 0 &&
    cpasswordRef.value.length > 0
  ) {
    if (passwordRef.value === cpasswordRef.value) {
      let users = JSON.parse(localStorage.getItem("users"));

      users.push({
        id: getRandomUserId(),
        email: emailRef.value,
        password: passwordRef.value,
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("logged in successfully");
      location.href = "/Onlineshopping/pages/login.html";
    } else {
      errorRef.innerText = "passwords mismatched!!!";
    }
  } else {
    errorRef.innerText = "Fields are empty!!!";
  }
};

// user singout handler
const userSignOutHandler = () => {
  location.replace("/Onlineshopping/pages/login.html");
};

//loading customer index.html
const loadcustomerproducts = () => {
  const productRef = document.getElementById("shop");
  const products = JSON.parse(localStorage.getItem("products"));

  let content = "";
  for (let product of products) {
    content += `<div class="col-3 mt-4">
    <div
      class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column"
    >
      <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
      <button class="btn btn-success" onclick="addToCartHandler(${product.id})">Add to Cart</button>
    </div>
  </div>`;
    // console.log(product);
  }
  productRef.innerHTML = content;
};

//add to cart function
const addToCartHandler = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("userId")) {
    location.href = "/Onlineshopping/pages/login.html";
  } else {
    let userId = parseInt(sessionStorage.getItem("userId"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const cartProduct = cart.find(
      (c) => c.userId === parseInt(userId) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((c) => {
        if (c.id === parseInt(id) && c.userId === parseInt(userId)) {
          return { ...c, count: c.count + 1 };
        } else {
          return c;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...product });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
};

const updateCart = () => {
  const cartCountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("userId")) {
    const userId = parseInt(sessionStorage.getItem("userId"));
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        const cartCount = userCart.reduce((acc, curr) => {
          acc += curr.count;
          return acc;
        }, 0);
        cartCountRef.innerText = `Cart - ${cartCount}`;
      } else cartCountRef.innerText = `Cart`;
    }
  } else location.href = "/Onlineshopping/pages/login.html";
};

//rendering cart items
const renderCartItems = () => {
  const cartTableRef = document.getElementById("cartbody");
  const totalRef = document.getElementById("total");
  const emptyCartRef = document.getElementById("emptyCart");
  const tableRef = document.getElementById("table");

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        tableRef.classList.remove("visually-hidden");
        emptyCartRef.classList.add("visually-hidden");
      } else {
        emptyCartRef.classList.remove("visually-hidden");
        tableRef.classList.add("visually-hidden");
      }

      let body = "";
      let total = 0;
      for (let cartItem of userCart) {
        total = total + parseInt(cartItem.count) * parseInt(cartItem.price);
        const count = cartItem.count * cartItem.price;
        body += `<tr>
                  <td>${cartItem.title}</td>
                   <td>${cartItem.count}</td>
                  <td>${cartItem.price}</td>
                  <td>₹ ${count}</td>
                </tr>`;
      }
      cartTableRef.innerHTML = body;
      totalRef.innerText = `Total - ₹ ${total}`;
    } else {
      location.href = "/Onlineshopping/pages/login.html";
    }
  }
};

//loading admin index.html
const loadAdminHomePage = () => {
  let adminProductsRef = document.getElementById("adminproductsbody");
  const products = JSON.parse(localStorage.getItem("products"));

  let adminContent = "";

  for (let product of products) {
    adminContent += `
  <tr>
    <td><img src="${
      product.thumbnail
    }" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:"50px;"/></td>
    <td>${product.title}</td>
    <td>${product.description.substring(0, 50)}...</td>
    <td> ₹ ${product.price}</td>
    <td class="d-flex justify-content-center mt-5">
      <button class="btn btn-primary me-2" onClick="editProductHandler(${
        product.id
      })">Edit</button>
      <button class="btn btn-danger" onClick="deleteProductHandler(${
        product.id
      })">Delete</button>
    </td>
  </tr>`;
  }
  adminProductsRef.innerHTML = adminContent;
};

//editing function in admin page
const editProductHandler = (id) => {
  location.href = `/Onlineshopping/pages/admin/add_product.html?id=${id}`;
};

const urlparams = new URLSearchParams(window.location.search);
if (urlparams.has("id")) {
  const btnref = document.getElementById("button");
  const id = urlparams.get("id");
  console.log(id);
  let products = JSON.parse(localStorage.getItem("products"));
  const editId = products.find((p) => p.id === parseInt(id));
  console.log(editId);
  let newName = document.getElementById("name");
  let newPrice = document.getElementById("price");
  let newDesc = document.getElementById("desc");
  let newImage = document.getElementById("urlimage");
  if (newName) newName.value = editId.title;
  if (newPrice) newPrice.value = editId.price;
  if (newDesc) newDesc.value = editId.description;
  if (newImage) newImage.value = editId.thumbnail;
  btnref.innerText = "Update Product";
}

//adding new details of the product which is added by admin in add_product.html
const addProductByAdmin = () => {
  let newName = document.getElementById("name");
  let newPrice = document.getElementById("price");
  let newDesc = document.getElementById("desc");
  let newImage = document.getElementById("urlimage");
  let products = JSON.parse(localStorage.getItem("products"));

  if (urlparams.has("id")) {
    const id = urlparams.get("id");
    const index = products.findIndex((p) => p.id === parseInt(id));
    products[index] = {
      title: newName.value,
      id: parseInt(id),
      price: newPrice.value,
      description: newDesc.value,
      thumbnail: newImage.value,
    };
  } else {
    console.log("added");
    products.push({
      id:products.length+3 ,
      title: newName.value,
      description: newDesc.value,
      price: newPrice.value,
      thumbnail: newImage.value,
    });
  }
  localStorage.setItem("products", JSON.stringify(products));
  location.href = "/Onlineshopping/pages/admin/index.html";
};

//delete function in admin page
const deleteProductHandler = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const remainingProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(remainingProducts));
  loadAdminHomePage();
  console.log("deleted");
  console.log(remainingProducts);
};

//checkout in carts page
const checkOut = () => {
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        timestamp: Date.now(),
        userId: userId,
        status: "Pending",
        products: userCart,
      });

      const otherUserCart = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(otherUserCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      updateCart();
      location.href = "/Onlineshopping/pages/orders.html";
    } else {
      location.href = "/Onlineshopping/pages/index.html";
    }
  } else {
    location.href = "/Onlineshopping/pages/login.html";
  }
};

//rendering orders page-users
const renderOrderPage = () => {
  const tablebodyref = document.getElementById("tablebody");
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userOrder = orders.filter((order) => order.userId === userId);

      let body = "";
      for (let order of userOrder) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>${order.status}</td>
          </tr>`;
      }
      tablebodyref.innerHTML = body;
    } else {
      location.href = "/Onlineshopping/pages/index.html";
    }
  } else {
    location.href = "/Onlineshopping/pages/login.html";
  }
};

const updateStatus = (timestamp) => {
  const ordersItems = JSON.parse(localStorage.getItem("orders"));
  const index = ordersItems.findIndex((p) => p.timestamp === timestamp);
  const statusRef = document.getElementById(timestamp);
  ordersItems[index] = { ...ordersItems[index], status: statusRef.value };
  localStorage.setItem("orders", JSON.stringify(ordersItems));
};

//loading orders page in admin
const loadAdminOrders = () => {
  const OrdersBodyRef = document.getElementById("table");
  const ordersItems = JSON.parse(localStorage.getItem("orders"));
  let ordersBody = "";

  for (let item of ordersItems) {
    const prices = item.products.map((product) => product.price);
    console.log(prices);
    ordersBody += `<tr>
    <td>${item.timestamp}</td>
    
    <td>${item.products.map((product) => product.title)}</td>
    <td>₹ ${prices.reduce((h1, h2) => h1 + h2)}</td>
    <td><select name="tracker" id=${item.timestamp}>
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Delivered">Delivered</option>
  </select></td>
    <td class="d-flex justify-content-center "><button class="btn btn-warning me-2" onClick="updateStatus(${
      item.timestamp
    })">Update</button></td>
  </tr>`;
  }
  OrdersBodyRef.innerHTML = ordersBody;
};
