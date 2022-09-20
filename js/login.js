const typeEmailX = document.getElementById("typeEmailX");
const typePasswordX = document.getElementById("typePasswordX");
const login = document.getElementById("login");

login.addEventListener("click", () => {
  (typeEmailX.value === "ezwat.alrabe@gmail.com") &
  (typePasswordX.value === "bashir1661983")
    ? (window.location.href = "../pages/dashbord.html")
    : (typeEmailX.value === "") | (typePasswordX.value === "")
    ? alert("الرجاء ملئ جميع الحقول")
    : alert("خطأ في كلمة المرور أوالايميل يرجى إعادة كتابتها من جديد!");
});
