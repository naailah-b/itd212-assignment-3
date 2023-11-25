
fetch('http://localhost:4000/tasks')
    .then(function (response) { return response.json(); })
    .then(function (json) {
        let idk = JSON.parse(json);
        console.log(idk[1].newTask)

        for (i = 0; i < idk.length; i++) {
            var element = document.createElement('li');
            element.appendChild(document.createTextNode(idk[i].newTask))
            element.className = 'note';
            document.getElementById('list').appendChild(element);
        }
    })


