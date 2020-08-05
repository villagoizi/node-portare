const d = document

document.addEventListener('DOMContentLoaded', () => {
    const skills = d.querySelector('#lista-conocimientos');

    let alertas = d.querySelector('.alertas');

    if(alertas){
        limpiarAlertas(alertas);
    }

    if(skills){
        skills.addEventListener('click', agregarSkills);
        seleccionadaSkill();
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