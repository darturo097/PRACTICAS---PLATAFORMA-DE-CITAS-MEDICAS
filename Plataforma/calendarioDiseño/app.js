document.addEventListener('DOMContentLoaded', function() {
    const btnAgendar = document.getElementById('btnAgendar');
    
    // Función de ejemplo para el botón Agendar
    if (btnAgendar) {
        btnAgendar.addEventListener('click', function() {
            alert('¡El botón "Agendar" fue presionado! Aquí iría la lógica para abrir un formulario o modal de agendamiento.');
        });
    }

    // Código para rellenar los números de día en el calendario (mejor práctica que solo en HTML)
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        // En un calendario real, estos datos se cargarían dinámicamente.
        // Aquí simulamos añadiendo un atributo data-day-number
        // Aunque ya lo hicimos en HTML para la simulación, esto es una mejor práctica.
        const dayNumber = day.textContent.trim();
        day.setAttribute('data-day-number', dayNumber);
        day.textContent = ''; // Limpiamos el texto para que solo se vea el ::before
    });

    // Pequeño script para el dropdown de 'Pruebas de laboratorio'
    const laboratorioDropdown = new bootstrap.Dropdown(document.getElementById('laboratorioDropdown'));
});