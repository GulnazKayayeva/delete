let body = document.querySelector('body')
let it = document.createElement('div')
let it2 = document.createElement('div')
let p = document.createElement('div')
let p2 = document.createElement('div')
let h1 = document.createElement('h1')
let form = document.forms.todo
let ii = document.querySelector('.pop')
let container = document.createElement('div')
let done_h1 = document.createElement('h2')
let done_h2 = document.createElement('h2')
let cont1 = document.createElement('div')
let cont2 = document.createElement('div')

done_h1.innerHTML = 'Not Done!'
done_h2.innerHTML = 'Done!'
cont1.classList.add('newww')
cont2.classList.add('newww')
cont1.append(done_h1)
cont2.append(done_h2)
container.append(cont1, cont2)
container.classList.add('cont')
it.classList.add('ass')
it2.classList.add('ass')
body.prepend(h1)
h1.innerHTML = 'Todo List'

let todos = JSON.parse(localStorage.getItem('todos')) || []
let todos_done = []

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

    localStorage.todos = JSON.stringify(todos)
}


let reload = (arr) => {
    it.innerHTML = ''
    it2.innerHTML = ''
    console.log(arr);
    for (let item of arr) {

        let newTask = document.createElement('div')
        newTask.classList.add('newTask')
        let h = document.createElement('h4')
        let del = document.createElement('img')
        let box = document.createElement('div')
        let time = document.createElement('p')
        let checkbox = document.createElement('input')
        let done = document.createElement('div')
        let done_text = document.createElement('span')

        done_text.innerHTML = 'not done!'
        done_text.classList.add('notDone')
        checkbox.type = 'checkbox'
        done.style.margin = '10px 0 0 0'
        del.src = "./done.svg"
        box.classList.add('box')
        h.innerHTML = item.task
        time.innerHTML = item.time

        box.append(h, del)
        done.append(checkbox, done_text)
        newTask.append(box, time, done)

        if (item.status) {
            done.innerHTML = ''
            done_text.innerHTML = 'done!'
            done_text.classList.add('done')
            it2.append(newTask)
            cont2.append(it2)
            done.append(done_text)
        } else {
            it.append(newTask)
            cont1.append(it)
        }

        localStorage.todos = JSON.stringify(todos)

        checkbox.onclick = () => {

            if (!checkbox.checked) {
                done_text.classList.remove('done')
                done_text.innerHTML = 'not done!'
                done_text.classList.add('notDone')
                item.status = false


            } else {
                done_text.classList.remove('notDone')
                done_text.innerHTML = 'done!'
                done_text.classList.add('done')
                item.status = true
            }

            reload(arr)
        }

        del.onclick = () => {

            arr.splice(arr.indexOf(item), 1)
            console.log(arr);
            localStorage.todos = todos
            reload(arr)
        }
    }

}

ii.onkeyup = () => {
    console.log(ii.value);
    let filtered = todos.filter(item => item.task.includes(ii.value))
    reload(filtered)
}


body.append(container)

reload(todos)

