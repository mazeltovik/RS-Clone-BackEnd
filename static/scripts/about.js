const h1 = document.querySelector('h1');
const user = document.querySelector('.user');
const age = document.querySelector('.age');
const form = document.querySelector('#form');
let count = 1;
h1.addEventListener('click',(e)=>{
    getInformation();
})

form.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('submit')){
        createUser(form.elements[0].value,Math.round((Math.random()*100)));
    }
})



async  function getInformation(){
    let res = await fetch('/api/server');
    if(res.ok){
        let data = await res.json();
        console.log(data);
        // user.textContent = data[0].name;
        // age.textContent = data[0].age;
    } else {
        console.log('Ошибка HTTP: ' + res.status);
    }
}


async function createUser(name,age){
    let body = {
        name:name,
        age:age,
        id:count,
    }
    count+=1;
    let res = await fetch('/api/server',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });
    if(res.ok){
        console.log(await res.json());
    } else{
        console.log('Ошибка HTTP: ' + res.status);
    }
}
