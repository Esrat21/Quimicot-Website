$("li.nav-item a.nav-link").on("click", (e)=>{
    $("a.nav-link.active").removeClass("active")
    e.target.classList.add('active')
})

$("#acessar").on("click", ()=>{
    window.location.href = "public_html/login.php"
})
