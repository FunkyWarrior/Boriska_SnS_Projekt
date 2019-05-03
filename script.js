let moreInfoButton
let addToCartButton
let herPoimiPochemy
let herPoimiPochemy2
(function() {
    //--------------------------------------------------------------------------------------------------------------------    
    //Создание услуг с данными из db.jsaon в формы template id="service_item"    
    (function() {
        fetch("http://localhost:3000/services")
            .then(response =>
                response.json()
                .then(json =>
                    json.forEach(service => {
                        var serviceConteiner = serviceItem.content.children[0]
                        serviceConteiner.id = `service_conteiner_${service.id}`
                        serviceConteiner.children[0].src = service.servicePhoto
                        serviceConteiner.children[1].innerText = service.bodyShort
                        serviceConteiner.children[2].innerText = service.bodyLong
                        serviceConteiner.children[5].innerText = `Price:${service.price}UAH`
                        document.getElementById("main").appendChild(serviceItem.content.cloneNode(true))
                    })
                )
            )

    })()
    //--------------------------------------------------------------------------------------------------------------------
    var serviceItem = document.querySelector("#service_item")
    var userRegistrationForm = document.querySelector("#user_registration")
    var userLogInForm = document.querySelector("#user_log_in")
    //--------------------------------------------------------------------------------------------------------------------    
    var users
    getUsers = function() {
        fetch("http://localhost:3000/users")
            .then(response => response.json()
                .then(response => users = response)
            )
    }
    getUsers()
    //--------------------------------------------------------------------------------------------------------------------
    //Увеличение окна товара при клике на кнопку More Info и создание кнопки закрытие id="close"   
    moreInfoButton = function(event) {
        var target = event.target.parentNode
        target.style.zIndex = "2"
        target.style.width = "400px"
        target.style.maxHeight = "500px"
        target.children[1].style.display = "none"
        target.children[2].style.display = "block"
        target.children[3].style.display = "none"
        document.getElementById("box_shadow").style.display = "block"
        var close = event.target.parentNode.appendChild(document.createElement("button"))
        close.id = "close"
        close.innerText = "X"
        document.getElementById("close").onclick = function(event) {
            target.style.width = "15%"
            target.style.maxHeight = "300px"
            target.children[2].style.display = "none"
            target.children[1].style.display = "block"
            target.children[3].style.display = "block"
            document.getElementById("box_shadow").style.display = "none"
            event.target.parentNode.style.zIndex = "1"
            event.target.remove()
        }
    }
    //--------------------------------------------------------------------------------------------------------------------
    //При клике на id=nav_button_sing_up создает форму регистрации из template id="user_registration"
    document.getElementById("nav_button_sing_up").onclick = function(event) {
        getUsers()
        document.body.appendChild(userRegistrationForm.content.cloneNode(true))
        document.getElementById("box_shadow").style.display = "block"
        document.getElementById("close").onclick = function(event) {
            document.getElementById("box_shadow").style.display = "none"
            event.target.parentNode.parentNode.remove()
            event.target.parentNode.remove()
            event.target.remove()
        }
    }
    herPoimiPochemy = function(event) {
        addUserToDataBase()
    }
    //Проверка некоторых полей формы регистрации(почта,телефон) на совпадения в базе users.
    //Пароли сравниваються сами с собой.
    //И создание нового пользователя в базе с указанными данными
    function addUserToDataBase(event) {
        var inputArray = document.getElementsByClassName("reg_input")
        for (var user in users) {
            if (inputArray[2].value == users[user].email) {
                alert('Данная почта уже занята')
                return false
            }
            if (inputArray[3].value == users[user].phone) {
                alert('Данный номер уже занята')
                return false
            }
        }

        if (inputArray[inputArray.length - 1].value === inputArray[inputArray.length - 2].value) {} else {
            alert('Пароли не совпадают')
            return false
        }
        if (inputArray[4].value.length === 0) { //если не вставленн аватар использует стандартный 
            var kotik = "img/kotikUser.jpg"
        } else {
            kotik = inputArray[4].value
        }
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${inputArray[0].value}`,
                lastName: `${inputArray[1].value}`,
                email: `${inputArray[2].value}`,
                phone: `${inputArray[3].value}`,
                avatarUrl: `${kotik}`,
                password: `${inputArray[5].value}`,
                root: "false"
            })
        })
        getUsers()
        document.getElementById("box_shadow").style.display = "none"
        document.getElementById("user_registration_form").remove()
        return false
    }
    //--------------------------------------------------------------------------------------------------------------------
    var curentUser
     herPoimiPochemy2 = function(event) {
        userLogIn()
    }
    function userLogIn(event){
        var inputArray = document.getElementsByClassName("log_input")
        for (var user in users){
            if (users[user].email == inputArray[0].value){
                if (users[user].password == inputArray[1].value){
                    curentUser = users[user]
                    document.getElementById("box_shadow").style.display = "none"
                    document.getElementById("user_log_in_form").remove()
                    return false
                }else {
                    alert("Password doesn't match")
                    return false
                }
            }else{
                alert("Email not found")
                return false
            }
        }
    }

    document.getElementById("nav_button_sing_in").onclick = function(event) {
        getUsers()
        document.body.appendChild(userLogInForm.content.cloneNode(true))
        document.getElementById("box_shadow").style.display = "block"
        document.getElementById("close").onclick = function(event) {
            document.getElementById("box_shadow").style.display = "none"
            event.target.parentNode.parentNode.remove()
            event.target.parentNode.remove()
            event.target.remove()
        }
    }

})()
