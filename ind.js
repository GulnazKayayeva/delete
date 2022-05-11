let body = document.querySelector('body')
let it = document.createElement('div')
let p = document.createElement('div')
let p2 = document.createElement('div')
let h1 = document.createElement('h1')
let form = document.forms.todo

it.classList.add('ass')

body.prepend(h1)
h1.innerHTML = 'Todo List'

let todos = [{
    "id": 1,
    "task": "купить дом на марсе",
    "status": false,
    "time": "10:10"
},
{
    "id": 2,
    "task": "купить машину",
    "status": false,
    "time": "10:10"
}
]

form.onsubmit = (event) => {
    event.preventDefault()

    let task = {
        id: Math.random(),
        status: false,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    })

    if (form.firstChild.nextSibling.value.length === 0) {
        form.firstChild.nextSibling.classList.add('invalid')
    } else {
        form.firstChild.nextSibling.classList.remove('invalid')
        form.firstChild.nextSibling.value = ''
        todos.push(task);
        reload(todos)
    }

}


let reload = (arr) => {
    it.innerHTML = ''
    console.log(arr);
    for (let item of arr) {
        let newTask = document.createElement('div')
        newTask.classList.add('newTask')
        let h = document.createElement('h4')
        let del = document.createElement('img')
        let box = document.createElement('div')
        let time = document.createElement('p')

        del.src = "./done.svg"
        box.classList.add('box')
        h.innerHTML = item.task
        time.innerHTML = item.time

        box.append(h, del)
        newTask.append(box, time)
        it.append(newTask)

        del.onclick = () => {
            arr.splice(arr.indexOf(item), 1)
            console.log(arr);
            reload(todos)
        }
    }
}

body.append(it)
reload(todos)

