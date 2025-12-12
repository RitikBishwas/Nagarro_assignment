const resultForm = document.getElementById('resultForm');
const viewAllBtn = document.getElementById('viewAllBtn');
const backBtn = document.getElementById('backBtn');
const formSection = document.getElementById('formSection');
const resultsSection = document.getElementById('resultsSection');
const resultsTableBody = document.getElementById('resultsTableBody');

let results = [];
let editIndex = null;

resultForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!resultForm.checkValidity()) {
        resultForm.classList.add('was-validated');
        return;
    }
    const rollNo = document.getElementById('rollNo').value.trim();
    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value;
    const score = document.getElementById('score').value.trim();

    if (editIndex !== null) {
        // Update existing result
        results[editIndex] = { rollNo, name, dob, score };
        editIndex = null;
        alert('Student result updated successfully!');
    } else {
        // Add new result
        results.push({ rollNo, name, dob, score });
        alert('Student result added successfully!');
    }
    resultForm.reset();
    resultForm.classList.remove('was-validated');
    renderResults();
});

viewAllBtn.addEventListener('click', function() {
    formSection.style.display = 'none';
    resultsSection.style.display = 'block';
    backBtn.style.display = 'inline-block';
    renderResults();
});

backBtn.addEventListener('click', function() {
    formSection.style.display = 'block';
    resultsSection.style.display = 'none';
    backBtn.style.display = 'none';
});

function renderResults() {
    resultsTableBody.innerHTML = '';
    results.forEach((result, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.rollNo}</td>
            <td>${result.name}</td>
            <td>${result.dob}</td>
            <td>${result.score}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="editResult(${idx})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteResult(${idx})">Delete</button>
            </td>
        `;
        resultsTableBody.appendChild(row);
    });
}

window.editResult = function(idx) {
    const result = results[idx];
    document.getElementById('rollNo').value = result.rollNo;
    document.getElementById('name').value = result.name;
    document.getElementById('dob').value = result.dob;
    document.getElementById('score').value = result.score;
    editIndex = idx;
    formSection.style.display = 'block';
    resultsSection.style.display = 'none';
    backBtn.style.display = 'none';
}

window.deleteResult = function(idx) {
    if (confirm('Are you sure you want to delete this result?')) {
        results.splice(idx, 1);
        renderResults();
    }
}
