
		'use strict'

		const openModel = ()=> document.getElementById('model').classList.add('active')

		const closeModel = ()=> {
			clearFields()
			document.getElementById('model').classList.remove('active')
		}

		const getLocalStorage = ()=> JSON.parse(localStorage.getItem('db_client'))??[]
		const setLocalStorage = (db_client)=> localStorage.setItem('db_client', JSON.stringify(db_client))

		const readClient = ()=> getLocalStorage()

		const createClients = (client)=> {
			const db_client = getLocalStorage()
			db_client.push(client)
			setLocalStorage(db_client)
		} 

		const updateClientt = (index, client)=> {
			const db_client = readClient()
			db_client[index] = client
			setLocalStorage(db_client)
		}


		const deleteClient = (index)=> {
			const db_client = readClient()
			db_client.splice(index, 1)
			setLocalStorage(db_client)
		}

		const isValidFields = ()=> {
		   return document.getElementById('form').reportValidity()
		}

		const clearFields = ()=> {
			const fields = document.querySelectorAll('.model-field')
			fields.forEach(field => field.value = "")
		} 

		const saveClient = ()=>{
			if(isValidFields()){
				const client = {
					nom: document.getElementById('nom').value,
					numeroRue: document.getElementById('numeroRue').value,
					numeroPorte: document.getElementById('numeroPorte').value,
					NNI: document.getElementById('NNI').value,
				}
				//console.log('The Cadastral student: ' + student)
				const index = document.getElementById('nom').dataset.index
				if(index == 'new'){
					createClients(client)
					listClient()
					closeModel()
				}else{
					updateClientt(index, client)
					listClient()
					closeModel()
				}
			}
		}


		const createRow = (client, index)=> {
			const newRow = document.createElement('tr')
			newRow.innerHTML = `
				<td>${client.nom}</td>
				<td>${client.numeroRue}</td>
				<td>${client.numeroPorte}</td>
				<td>${client.NNI}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Edit</button>
					<button type="button" class="button red" id="delete-${index}">Delete</button>
				</td>
			`
			document.querySelector('#tblClient>tbody').appendChild(newRow)
		}

		const crearTable = ()=> {
			const rows = document.querySelectorAll('#tblClient>tbody tr')
			rows.forEach(row => row.parentNode.removeChild(row))
		}

		const listClient = ()=> {
			const clients =  readClient()
			// console.log(students)
			crearTable()
			clients.forEach(createRow)
		}

		const fillFields = (client)=> {
			document.getElementById('nom').value = client.nom
			document.getElementById('numeroRue').value = client.numeroRue
			document.getElementById('numeroPorte').value = client.numeroPorte
			document.getElementById('NNI').value = client.NNI

			document.getElementById('nom').dataset.index = client.index
		}

		const editClient = (index)=>{
			const client = readClient()[index]
			client.index = index
			fillFields(client)
			openModel()
		}

		const editDelete = (event)=>{
			if(event.target.type == 'button'){
				const [action, index] = event.target.id.split('-')
				if(action == 'edit'){
					editClient(index)
				}else{
					const client = readClient()[index]
					const response = confirm(`êtes-vous sûr de vouloir supprimer le client ${client.nom} ?`)
					if(response){
						deleteClient(index)
						listClient()
					}
				}
			}
		}

		listClient()

		document.getElementById('idClient').addEventListener('click', openModel)
		document.getElementById('modelClose').addEventListener('click', closeModel)
		document.getElementById('cancel').addEventListener('click', closeModel)
		document.getElementById('save').addEventListener('click', saveClient)
		document.querySelector('#tblClient>tbody').addEventListener('click', editDelete)