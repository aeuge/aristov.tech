document.getElementById('openModal1').onclick = function() {
    document.getElementById('modal--id').classList.remove('hidden');
    document.getElementById('modal-overlay--id').classList.remove('hidden');
    document.getElementById('modal--id').classList.add('active');
    document.getElementById('modal-overlay--id').classList.add('active');
}
document.getElementById('openModal2').onclick = function() {
    document.getElementById('modal--id').classList.remove('hidden');
    document.getElementById('modal-overlay--id').classList.remove('hidden');
    document.getElementById('modal--id').classList.add('active');
    document.getElementById('modal-overlay--id').classList.add('active');
}

document.getElementById('close-modal--id').onclick = function() {
    document.getElementById('modal--id').classList.remove('active');
    document.getElementById('modal-overlay--id').classList.remove('active');
    document.getElementById('modal--id').classList.add('hidden');
    document.getElementById('modal-overlay--id').classList.add('hidden');
}

document.getElementById('modal-overlay--id').onclick = function() {
    if (event.target.id == 'modal-overlay--id') {
        document.getElementById('modal--id').classList.remove('active');
        document.getElementById('modal-overlay--id').classList.remove('active');
        document.getElementById('modal--id').classList.add('hidden');
        document.getElementById('modal-overlay--id').classList.add('hidden');
    }
}
