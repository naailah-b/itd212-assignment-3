document.getElementById('check').addEventListener('click', () => {
    var box = document.getElementById('password');
    if (box.type == 'password') {
        box.type = 'text';
    }
    else {
        box.type = 'password';
    }
});