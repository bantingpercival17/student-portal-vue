import Swal from 'sweetalert2'

export const alertSuccess = (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message
    })
}

export const alertError = (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    })
}

export const confirmDelete = () => {
    return Swal.fire({
        title: 'Delete?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete'
    })
}