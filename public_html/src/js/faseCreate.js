const sectionPlus = document.getElementById("plus-information");
let cont = 0;
$("#button-plus").on("click", (event) => {
	$(`
	<div class="form-group" style="display:flex;">
		<input type="text" class="form-control" id="key${cont}" placeholder="key" >
		<input type="text" class="form-control" id="value${cont++}" placeholder="value">
	</div>
	`).appendTo(sectionPlus)
	//   sectionPlus.innerHTML += `
	// 	<div class="form-group" style="display:flex;">
	// 		<input type="text" class="form-control" id="key${cont}" placeholder="key" name="key">
	// 		<input type="text" class="form-control" id="value${cont++}" placeholder="value" name="value">
	// 	</div>
	// 	`;
});

function getInformationPlus() {
	let obj = {};
	for (const div of sectionPlus.children) {
		let key = div.children[0].value;
		let value = div.children[1].value;
		if (key != "" && key.replaceAll(/\s/g, '') != "" && value != "" && value.replaceAll(/\s/g, '') != "") {
			obj[key] = div.children[1].value;
		}
		sectionPlus.innerHTML = "";
	}
	return obj
}


$("#form-fase-create").on("submit", (event) => {
	event.preventDefault();
	let formData = new FormData(document.getElementById("form-fase-create"));
	let dataJSON = Object.fromEntries(formData);

	let submitData = {
		...dataJSON,
		contem:{
			// classificacao: selectClassificacao.selected(),
			// dificuldade: selectDificuldade.selected(),
			elementos: selectElementos.selected(),
		},
		// grupo: selectGrupo.selected(),
		"vars": getInformationPlus()
	};
	delete submitData.elementos;
	$.ajax({
		url: Rotasclass['posts']['fase'],
		data: submitData,
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`
		},
		beforeSend: function (data) {
			console.log("enviando os dados");
		},
		success: function (data) {
			if (data.ID) {
				alert("Fase cadastrada com sucesso")
			} else {
				console.log("algo de errado aconteceu", data);
			}

		},
		error: function (error) {
			console.error(error.responseJSON);
			Swal.fire({
				icon: 'error',
				title: "Houve um erro ao tentar cadastrar fase",
				allowOutsideClick: false
			})
		},
		complete: function (data) {
			$('#form-fase-create')[0].reset();
		}
	})
});
