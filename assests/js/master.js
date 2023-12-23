let input = document.getElementById('input')
let listpar = document.getElementById('listpar')
let add = document.getElementById('add')
let filter = document.getElementById('filter')
let i = 1


let mydata = []
let _local = localStorage.getItem('todo')
// console.log(JSON.parse(_local));
if(_local != null){
    _local = _local.split(',')
    mydata = [..._local]
    _local.forEach((val)=>{
        let div = document.createElement('div')
        div.classList.add('div')
        div.setAttribute('data-text',val)
        div.setAttribute('data-stat','uncompleted')
        div.setAttribute('data-flag',true)
        div.innerHTML = `
            <p>${val}</p>
            <button onclick="check(this)"><i class="bi bi-check-lg"></i></button>
            <button onclick="trash(this)"><i class="bi bi-trash3-fill"></i></button>
        
        `
        listpar.appendChild(div)
        input.value = null
        input.focus()
    })

}





add.addEventListener('click',()=>{
    let list = document.querySelectorAll('.div')
    let value = input.value
    if(value != ''){
        let count = 0
        list.forEach((val)=>{
            if((val.getAttribute('data-text')) == value){
                count++
            }
        })
        if(count==0){
            generator(value, )
        }else{
            alert('items already exist')
            input.value=null
            input.focus()
        }

    }else{
        alert('please fill the form')
        input.focus()
    }

})
function check(t){
    t.previousElementSibling.classList.toggle('check')
    if(t.parentElement.getAttribute('data-flag')=='true'){
        t.parentElement.setAttribute('data-stat','completed')
        t.parentElement.setAttribute('data-flag',false)
    }else if(t.parentElement.getAttribute('data-flag')=='false'){
        t.parentElement.setAttribute('data-stat', 'uncompleted')
        t.parentElement.setAttribute('data-flag',true)
    }
}


function trash(t){
    if(confirm('are you sure') == true){
        setTimeout(() => {
            t.parentElement.remove()
        }, 300);
        t.parentElement.classList.add('removing')
    }
}

filter.addEventListener('change',(()=>{
    let div = document.querySelectorAll('.div')
    div.forEach((val)=>{
        if(filter.value == 'all'){
            val.style.display = 'flex'
        }else{
            if(filter.value == val.getAttribute('data-stat')){
                val.style.display='flex'
            }else{
                val.style.display = 'none'
            }
        }
    })

}))

function generator(value){
    let div = document.createElement('div')
    div.classList.add('div')
    div.setAttribute('data-text',value)
    div.setAttribute('data-stat','uncompleted')
    div.setAttribute('data-flag',true)
    div.innerHTML = `
        <p>${value}</p>
        <button onclick="check(this)"><i class="bi bi-check-lg"></i></button>
        <button onclick="trash(this)"><i class="bi bi-trash3-fill"></i></button>
    
    `
    mydata.push(value)
    localStorage.setItem('todo',mydata)
    listpar.appendChild(div)
    input.value = null
    input.focus()
}

