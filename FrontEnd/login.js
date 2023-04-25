const logUser= async() => {
 
    const formLogin = document.getElementById("formLogin")
    
    formLogin.addEventListener("submit", async function(event){

        event.preventDefault()

        let users = {
            email : document.getElementById('email').value,
            password : document.getElementById('password').value,
        }

        console.log(users)

        const response =  await fetch('http://localhost:5678/api/users/login',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(users),
        });

        if (response.ok === true) {
            console.log(response)
            let result = await response.json()
            console.log(result)
            console.log("connexion reussie")
            sessionStorage.setItem("token",result.token)
            window.location.href='index.html'

        } else {
            alert('email ou mot de passe invalide');
        }
    })
}

logUser()

