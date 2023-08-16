import Swal from 'sweetalert2';

export const AlertaToastSucces = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Acceso Concedido',
    showConfirmButton: false,
    timer: 1500
  })
}

export const AlertaToastDenied = () => {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Sesión abierta en otro dispositivo',
    showConfirmButton: false,
    timer: 1500
  })
}

export const AlertaToastCredentialsIncorrect = () => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Usuario/Contraseña Incorrecta',
    showConfirmButton: false,
    timer: 1500
  })
}

export const AlertaToastWarning = (idx, nombre) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true, 
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'warning',
    title: `Limites en "${nombre} - Sensor No. ${idx}" fuera de rango `
  })
}

export const AlertaCamposVacios = () => {
  Swal.fire({
  title: "Error!",
  text: "Todos los campos deben se llenados",
  icon: "error",
  confirmButtonText: "ok",
});
}

// export {AlertaToastSucces,AlertaCamposVacios,AlertaToastDenied};