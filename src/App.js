import React, {useState, Fragment} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Table, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from "reactstrap";

function App() {

  const data = [
    {id:1, personaje:"Maruto", anime:"Maruto"},
    {id:2, personaje:"Goku", anime:"Dragon Ball"},
    {id:3, personaje:"Kenshin Himura", anime:"Rurouni Kenshin"},
    {id:4, personaje:"Monkey D. Luffy", anime:"One Piece"},
    {id:5, personaje:"Edward Elric", anime:"Fullmetal Alchemist: Brotherhood"},
    {id:6, personaje:"Seto Kaiba", anime:"Yu-Gi-Oh!"}
  ]

  const [personajes, setPersonajes] = useState(data)

  const [formulario, setFormulario] = useState(
    {id:"", personaje:"", anime:""}
  )

  const [modal, setModal] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);

  const handleChange = e =>{
    setFormulario({
             ...formulario,  [e.target.name]: e.target.value
          }  
      )
     
  }

  const mostrarModalInsertar = () =>{
    setModal(true)
  }

  const ocultarModalInsertar = () =>{
    setModal(false)
  }

  const mostrarModalEdit = () =>{
    setModalEdit(true)
  }

  const ocultarModalEdit = () =>{
    setModalEdit(false)
  }
  
  const insertar = (e) =>{

      formulario.id = personajes.length+1

      setPersonajes([
        ...personajes, formulario
        ]
     )

     setModal(false)
  }

  const editar = (elemento) =>{

    mostrarModalEdit()
    
    setFormulario(elemento)

  }

  const actualizarModal = (elemento) =>{

    setPersonajes(personajes.map(personaje => personaje.id === elemento.id ? elemento : personaje)) 

    ocultarModalEdit()
  }

  const eliminar = (elemento) =>{
    
    const personaje = personajes.filter(personaje => personaje.id !== elemento.id)

    setPersonajes(personaje)

    alert(`Se Eliminara a ${elemento.personaje}`)

  }

  return (
    <Fragment>
      <Container>
        <br></br>
         <Button color="success" onClick={()=>mostrarModalInsertar()}>Insertar Nuevo Personaje</Button>
         <br></br>
         <br></br>
         <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Personaje</th>
                    <th>Anime</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                  personajes.map(elemento => (
                    <tr>
                        <td>{elemento.id}</td>
                        <td>{elemento.personaje}</td>
                        <td>{elemento.anime}</td>
                        <td><Button onClick={()=>editar(elemento)} color="primary">Editar</Button>{"  "}
                        <Button onClick={()=>eliminar(elemento)}color="danger">Eliminar</Button></td>
                    </tr>
                  ))
                }
            </tbody>
         </Table>
         
      </Container>

      <Modal  isOpen={modal}>
          <ModalHeader>
           <div><h3>Insertar Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={personajes.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Anime: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={()=>insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={()=>ocultarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      <Modal isOpen={modalEdit}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                name="id"
                readOnly
                type="text"
                value={formulario.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={handleChange}
                value={formulario.personaje}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Anime: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={handleChange}
                value={formulario.anime}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={()=>actualizarModal(formulario)}
            >
              Aceptar
            </Button>
            <Button
              color="danger"
              onClick={()=>ocultarModalEdit()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
    </Fragment>
  );
}

export default App;
