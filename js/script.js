// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getFirestore,
  deleteDoc,
  addDoc,
  doc,
  collection,
  updateDoc,
  getDocs,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

// storge
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT1LvqzRX10MqvhUmFb1HFSVx0lyHSaTA",
  authDomain: "escobike-store.firebaseapp.com",
  projectId: "escobike-store",
  storageBucket: "escobike-store.appspot.com",
  messagingSenderId: "1058474233169",
  appId: "1:1058474233169:web:668ff5213c9bb5bb699770",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

let files = [];
let reader = new FileReader();
let proccess = "add";

// ids from html
const pageName = document.getElementsByTagName("body")[0];
const products = document.getElementById("products");
const tbody = document.getElementById("tbody");
const hidden = document.getElementById("hidden");
const name = document.getElementById("name");
const description = document.getElementById("description");
const price = document.getElementById("price");
const price2 = document.getElementById("price2");
const btn = document.getElementById("btn");
const addsDash = document.getElementById("addsDash");
const btnAdds = document.getElementById("btnAdds");
const fd = document.getElementById("fd");

const namebox = document.getElementById("namebox");
const myimg = document.getElementById("myimg");
const proglab = document.getElementById("upprogress");
const selBtn = document.getElementById("selbtn");
const input = document.createElement("input");
input.type = "file";
const adds = document.getElementById("adds");

// Add a new document in collection "cities"
const addProduct = async (url) => {
  event.preventDefault();
  await addDoc(collection(db, "products"), {
    name: name.value.trim(),
    description: description.value.trim(),
    price: price.value.trim(),
    price2: price2.value,
    imageName: namebox.value,
    imageURL: url,
    fd: fd.checked,
  });
  alert("تم إضافة المنتج");
  window.location.reload();
};

// Set the "capital" field of the city 'DC'
const updateProduct = async (url) => {
  event.preventDefault();
  await updateDoc(doc(db, "products", hidden.value), {
    name: name.value.trim(),
    description: description.value.trim(),
    price: price.value,
    price2: price2.value,
    imageName: namebox.value,
    imageURL: url,
    fd: fd.checked,
  });
  alert("تم تعديل المنتج");
  window.location.reload();
};

// Remove the 'capital' field from the document
const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", `${id}`));
  alert("تم حذف المنتج");
  window.location.reload();
};

// getProducts();
if (pageName.id === "home") {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    products.innerHTML += `<article class="p-2 col-6 col-lg-4 col-xl-3">
            <div class="card text-center h-100 pb-3 postion-relative">
                <img src="${doc.data().imageURL}" class="card-img-top" alt="${
      doc.data().imageName
    }" />
                <div class="card-body px-2">
                    <h4 class="card-title text-main h-25 d-flex flex-column mb-3 justify-content-center align-items-center m-0">${
                      doc.data().name
                    }</h4>
                    <p class="card-text text-secondary h-50 d-flex flex-column justify-content-center align-items-center m-0 d-sm-block">
                    ${doc.data().description}
                    </p>
                    <div class="fs-4 fw-bold"> ${
                      doc.data().price2 !== ""
                        ? `<span class="fs-6 fw-normal text-decoration-line-through ps-2 text-danger">
                          ${doc.data().price2} ريال
                        </span>`
                        : ""
                    } <span class="pt-3">${doc.data().price} ريال</span>  </div>
                </div>
               ${
                 doc.data().fd === true
                   ? `<div class="text-white bg-danger rounded-pill fdd position-absolute">
                     <p class="w-75 m-0"> التوصيل مجاني</p>
                   </div>`
                   : ""
               }</div>
        </article>`;
  });
}

if (pageName.id === "dashpord") {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    tbody.innerHTML += `<tr id = '${doc.id}' name='${doc.id}'>
    <td>
    <div class="d-flex align-items-center">
    <img class='namebox rounded-3' src="${doc.data().imageURL}" alt="${
      doc.data().imageName
    }"
    style="width: 45px; height: 45px" class="rounded-circle" />
    <div class="ms-3 name">
    <p class="fw-bold mb-1 me-3">${doc.data().name}</p>
    </div>
    </div>
    </td>
            <td class = 'description d-none d-md-table-cell'>
            ${doc.data().description}  </td>
            <td  class='d-none d-md-table-cell'>
            <span class = 'price'>${doc.data().price}</span> ريال
            </td>
            ${
              doc.data().price2 !== ""
                ? `<td class="d-none d-md-table-cell">
                  <span class="price2">${doc.data().price2}</span> ريال
                </td>`
                : `<td class='price2 d-none d-md-table-cell'>____</td>`
            }
            <td class="d-none d-md-table-cell">
                  <span class="fd">${doc.data().fd ? true : false}</span>
                </td>
            <td>
            <button type="button" class="edit btn bg-sec  btn-sm btn-rounded">
            تعديل
            </button>
            </td>
            <td> <button type="button" class="delete btn btn-danger text-white btn-sm btn-rounded">
            حذف
            </button></td>
            </tr>`;
  });

  tbody.addEventListener("click", (e) => {
    const reviewNode = e.target.parentNode.parentNode;
    const id = reviewNode.id;

    // UPDATE REVEIW
    if (e.target.classList.contains("edit")) {
      console.log(reviewNode.querySelector(".fd").innerText);
      proccess = "edit";
      name.value = reviewNode.querySelector(".name").innerText;
      description.value = reviewNode.querySelector(".description").innerText;
      price.value = reviewNode.querySelector(".price").innerText;
      reviewNode.querySelector(".price2").innerText !== "___"
        ? (price2.value = reviewNode.querySelector(".price2").innerText)
        : (price2.value = "");

      namebox.value = reviewNode.querySelector(".namebox").alt;
      myimg.src = reviewNode.querySelector(".namebox").src;
      fd.checked =
        reviewNode.querySelector(".fd").innerText === "true" ? true : false;
      hidden.value = id;

      btn.innerText = "تعديل";
    }

    // DELETE REVEIW
    if (e.target.classList.contains("delete")) {
      deleteProduct(id);
    }
  });
}

input.onchange = (e) => {
  event.preventDefault();
  files = e.target.files;
  let name = files[0].name;
  namebox.value = name;
  reader.readAsDataURL(files[0]);
};

reader.onload = function () {
  myimg.src = reader.result;
};

pageName.id === "dashpord"
  ? // selection
    (selBtn.onclick = function () {
      event.preventDefault();
      input.click();
    })
  : null;

// upload proccess
async function processAaction() {
  if (
    name.value !== "" &&
    price.value !== "" &&
    description.value !== "" &&
    files[0]
  ) {
    let ImgToUpload = files[0];
    let ImgName = namebox.value;
    let metaData = {
      contentType: ImgToUpload.type,
    };
    let storage = getStorage();
    let storageRef = sRef(storage, "Images/" + ImgName);
    let uploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

    uploadTask.on(
      "state-change",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        proglab.innerHTML = "upload" + Math.floor(progress) + "% ";
      },
      (error) => {
        alert("error:image not uploaded!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          proccess === "add"
            ? addProduct(downloadURL)
            : updateProduct(downloadURL);
        });
      }
    );
  } else if (
    name.value !== "" &&
    price.value !== "" &&
    description.value !== "" &&
    namebox.value !== ""
  ) {
    (async () => {
      event.preventDefault();
      await updateDoc(doc(db, "products", hidden.value), {
        name: name.value,
        description: description.value,
        price: price.value,
        price2: price2.value,
        imageName: namebox.value,
        fd: fd.checked,
      });
      alert("تم تعديل المنتج");
      window.location.reload();
    })();
  } else {
    alert("  الرجاء ملئ جميع الحقول التي تحتوي على *");
  }
}

// btn proccess (add or edit)
pageName.id === "dashpord"
  ? btn.addEventListener("click", () => {
      event.preventDefault();
      processAaction();
    })
  : null;

// adds firebase

// add adds

const addAdds = async () => {
  event.preventDefault();
  await setDoc(doc(db, "adds", "addes"), {
    adds: addsDash.value.trim(),
  });
  alert("تم إضافة الإعلان");
};

// edit adds
const updateAdds = async () => {
  event.preventDefault();
  await updateDoc(doc(db, "adds", "addes"), {
    adds: addsDash.value.trim(),
  });
  alert("تم تعديل الإعلان");
};

// update proccess
pageName.id === "dashpord"
  ? btnAdds.addEventListener("click", updateAdds)
  : null;

// grt adds

const getAdds = await getDocs(collection(db, "adds"));
getAdds.forEach((doc) => {
  pageName.id === "home"
    ? (adds.innerHTML = `<p class="py-5 text-main fs-4 fw-lighter container m-aut text-center ">${
        doc.data().adds
      }</p>`)
    : (addsDash.value = doc.data().adds);
});
