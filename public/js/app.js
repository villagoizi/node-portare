import axios from 'axios';
import Swal from 'sweetalert2';

const d = document

d.addEventListener('DOMContentLoaded', () => {
    const skills = d.querySelector('#lista-conocimientos');

    let alertas = d.querySelector('.alertas');

    if(alertas){
        limpiarAlertas(alertas);
    }

    if(skills){
        skills.addEventListener('click', agregarSkills);
        seleccionadaSkill();
    }

    const panel = d.querySelector('.panel-administracion');
    if(panel){
        panel.addEventListener('click', eliminarVacante)
    }
})
const skillsSet = new Set()
const agregarSkills = e => {
    if(e.target.tagName === 'LI') {
        if(e.target.classList.contains('activo')){
            //Quitarlo de la lista
            e.target.classList.remove('activo');
            skillsSet.delete(e.target.textContent);
        }
        else{
            //Agregarlo a la lista
            e.target.classList.add('activo');
            skillsSet.add(e.target.textContent);
        }
    }
    const skillsArrays = [...skillsSet];
    d.querySelector('#skills').value = skillsArrays;
}



const seleccionadaSkill = () => {
    const seleccionadas = d.querySelectorAll('#lista-conocimientos .activo');
    
    
    seleccionadas.forEach( skill => {
        skillsSet.add(skill.textContent);
    })
    const skillsArrays = [...skillsSet];
    d.querySelector('#skills').value = skillsArrays;

}

const limpiarAlertas = (alertas) => {
    const interval = setInterval(
        () => {
            if(alertas.children.length > 0){ 
                alertas.removeChild(alertas.children[0]);
                console.log( alertas.children.length );
            } else{
                clearInterval(interval);
            }
        },2000);
}


//Delete vacant
const eliminarVacante = (e)=> {
    
    console.log(e.target.dataset.eliminar);
    if(e.target.dataset.eliminar){
        e.preventDefault();
        const idVacante = e.target.dataset.eliminar;
        const url = `${location.origin}/vacantes/eliminar/${idVacante}`;

        Swal.fire({
            title: '¿Desea Eliminar?',
            text: 'Si elimina esta vacante, no podra recuperarla',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        })
        .then( ({value}) => {
            if(value){
                axios.delete(url,{ params: { url} })
                    .then( res => {
                        if( res.status === 200) {
                            console.log(res);
                            Swal.fire(
                                'Eliminado!',
                                res.data,
                                'success'
                            );
                            //Delete from DOM
                            e.target.parentElement.parentElement.remove();
                        };
                    })
                    .catch( err => {
                        Swal.fire(
                            'Hubo un error',
                            'No se pudo eliminar',
                            'error'
                        )
                    })
            }

        //Cancel dissiming
        else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelado',
                'error'
            )
            }
            
        })
    }
}