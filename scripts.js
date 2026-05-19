// Configuración general para que los gráficos sean responsive y usen la fuente del sitio
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.font.family = "'Inter', sans-serif";

// Etiquetas de localidades basadas en la jurisdicción de SEDACHIMBOTE
const localidades = ['Chimbote', 'Nvo. Chimbote', 'Casma', 'Huarmey'];

// 1. Gráfico de Pagos Atrasados (Morosidad) - Gráfico de Barras
const ctxMorosidad = document.getElementById('chartMorosidad');
if (ctxMorosidad) {
  new Chart(ctxMorosidad.getContext('2d'), {
    type: 'bar',
    data: {
      labels: localidades,
      datasets: [{
        label: 'Usuarios con atraso',
        data: [1200, 850, 420, 310], // Datos simulados, reemplazar con data real
        backgroundColor: '#e63946',
        borderRadius: 4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// 2. Gráfico de Consumo Promedio - Gráfico de Líneas
const ctxConsumo = document.getElementById('chartConsumo');
if (ctxConsumo) {
  new Chart(ctxConsumo.getContext('2d'), {
    type: 'line',
    data: {
      labels: localidades,
      datasets: [{
        label: 'Consumo (m³/mes)',
        data: [18.5, 22.1, 15.3, 14.8], // Datos simulados, reemplazar con data real
        borderColor: '#0056b3',
        backgroundColor: 'rgba(0, 86, 179, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// 3. Gráfico de Reclamos - Gráfico de Anillo (Doughnut)
const ctxReclamos = document.getElementById('chartReclamos');
if (ctxReclamos) {
  new Chart(ctxReclamos.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: localidades,
      datasets: [{
        data: [350, 210, 85, 60], // Datos simulados, reemplazar con data real
        backgroundColor: ['#0056b3', '#00b4d8', '#90e0ef', '#caf0f8'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } },
      cutout: '70%'
    }
  });
}