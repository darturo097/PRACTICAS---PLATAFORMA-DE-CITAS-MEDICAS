document.addEventListener('DOMContentLoaded', function () {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthsAbrev = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    let currentDate = new Date(2025, 9, 4); // Octubre 4, 2025 (meses en JS son 0-indexados)

    function renderMonthPicker() {
        const monthPicker = document.getElementById('month-picker');
        monthPicker.innerHTML = '';

        // contenedor principal
        const wrapper = document.createElement('div');
        wrapper.className = 'month-selector rounded mb-4';

        // fila con los meses
        const row = document.createElement('div');
        row.className = 'row g-2 mb-3';

        monthsAbrev.forEach((month, index) => {
            const col = document.createElement('div');
            col.className = 'col-4';

            const btn = document.createElement('button');
            btn.className = 'btn btn-sm w-100 month-btn btn-month';
            btn.textContent = month;

            // estado activo
            if (index === currentDate.getMonth()) {
                btn.classList.add('active-month');
            } else {
                btn.classList.add('btn-light');
            }

            // evento click
            btn.addEventListener('click', () => {
                currentDate.setMonth(index);
                renderCalendar();
                renderMonthPicker(); // volver a renderizar para actualizar activo
            });

            col.appendChild(btn);
            row.appendChild(col);
        });

        // botón de agendar
        const btnAgendar = document.createElement('button');
        btnAgendar.className = 'btn btn-primary btn-lg w-100 mt-2';
        btnAgendar.id = 'btnAgendar';
        btnAgendar.textContent = 'Agendar';

        // ensamblar
        wrapper.appendChild(row);
        wrapper.appendChild(btnAgendar);
        monthPicker.appendChild(wrapper);
    }

    function renderCalendar() {
        const calendarBody = document.getElementById('calendar-body');
        calendarBody.innerHTML = '';

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        document.getElementById('current-month-year').textContent = `${months[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        let row = document.createElement('tr');
        let day = 1;
        let prevDay = prevMonthDays - firstDay + 1;

        // Días del mes anterior
        for (let i = 0; i < firstDay; i++) {
            const td = document.createElement('td');
            td.textContent = prevDay++;
            td.classList.add('other-month');
            row.appendChild(td);
        }

        // Días del mes actual
        for (let i = firstDay; i < 7; i++) {
            const td = document.createElement('td');
            td.textContent = day++;
            td.classList.add('current-month');
            if (day - 1 === currentDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                td.classList.add('today');
            }
            row.appendChild(td);
        }
        calendarBody.appendChild(row);

        // Resto de las semanas
        while (day <= daysInMonth) {
            row = document.createElement('tr');
            for (let i = 0; i < 7; i++) {
                if (day > daysInMonth) {
                    const td = document.createElement('td');
                    td.textContent = (day - daysInMonth);
                    td.classList.add('other-month');
                    row.appendChild(td);
                    day++;
                    continue;
                }
                const td = document.createElement('td');
                td.textContent = day;
                td.classList.add('current-month');
                if (day === currentDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    td.classList.add('today');
                }
                row.appendChild(td);
                day++;
            }
            calendarBody.appendChild(row);
        }

        renderMonthPicker();
    }

    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById('today').addEventListener('click', () => {
        currentDate = new Date(2025, 9, 4);
        renderCalendar();
    });

    renderCalendar();
});