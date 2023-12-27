"use client"
import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";

interface Project {
  id: number;
  jobN: string;
  client: string;
  city: string;
  eventN: string;
  outMax: Date;
  deliveryMax: Date;
  mounting: Date;
  disassembly: Date;
  floor: string;
  material: string;
}

const ProjectTable: React.FC = () => {
    const [data, setData] = useState<Project[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Project | {}>({});
    const [formData, setFormData] = useState<Project | {}>({});
  
    useEffect(() => {
      // Cargar datos desde localStorage al inicio
      const savedData = localStorage.getItem("projectData");
      if (savedData) {
        setData(JSON.parse(savedData));
      } else {
        // Agregar datos iniciales si no hay datos en localStorage
        const initialData: Project[] = [
          {
            id: 1,
            jobN: "Job 1",
            client: "Client 1",
            city: "City 1",
            eventN: "Event 1",
            outMax: new Date("2023-01-01"),
            deliveryMax: new Date("2023-01-10"),
            mounting: new Date("2023-01-15"),
            disassembly: new Date("2023-01-20"),
            floor: "Floor 1",
            material: "Material 1",
          },
          {
            id: 2,
            jobN: "Job 2",
            client: "Client 2",
            city: "City 2",
            eventN: "Event 2",
            outMax: new Date("2023-02-01"),
            deliveryMax: new Date("2023-02-10"),
            mounting: new Date("2023-02-15"),
            disassembly: new Date("2023-02-20"),
            floor: "Floor 2",
            material: "Material 2",
          },
        ];
        setData(initialData);
      }
    }, []);

  useEffect(() => {
    // Guardar datos en localStorage cuando cambian
    localStorage.setItem("projectData", JSON.stringify(data));
  }, [data]);

  const handleShowModal = (item: Project) => {
    setSelectedItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem({});
    setFormData({});
  };

  const handleSaveChanges = () => {
    const updatedData = data.map((item) =>
      item.id === (selectedItem as Project).id ? { ...item, ...formData } : item
    );

    setData(updatedData);
    handleCloseModal();
  };

  const handleDeleteItem = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleAddItem = () => {
    setShowModal(true); // Mostrar el modal para agregar nuevo item
  };

  const handleAddItemSave = () => {
    const newItem: Project = {
      id: data.length + 1,
      jobN: (formData as Project).jobN || "Nuevo Elemento",
      client: (formData as Project).client || "Nuevo Valor3",
      city: (formData as Project).city || "Nuevo Valor1",
      eventN: (formData as Project).eventN || "Nuevo Valor2",
      outMax: new Date(),
      deliveryMax: new Date(),
      mounting: new Date(),
      disassembly: new Date(),
      floor: (formData as Project).floor || "", // Agregar valor predeterminado o hacerlo opcional en la interfaz
      material: (formData as Project).material || "", // Agregar valor predeterminado o hacerlo opcional en la interfaz
    };

    const updatedData = [...data, newItem];
    setData(updatedData);

    handleCloseModal();
  };

  return (
    <div className="bg-[#255280]">
        <section>
      <table className='table-auto caption-top'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job #</th>
            <th>Cliente</th>
            <th>Ciudad</th>
            <th>Evento</th>
            <th>Salida MAX</th>
            <th>Deilvery MAX</th>
            <th>Montaje</th>
            <th>Desmontaje</th>
            <th>Piso</th>
            <th>Material</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.jobN}</td>
              <td>{item.client}</td>
              <td>{item.city}</td>
              <td>{item.eventN}</td>
              <td>{item.outMax.toDateString()}</td>
              <td>{item.deliveryMax.toDateString()}</td>
              <td>{item.mounting.toDateString()}</td>
              <td>{item.disassembly.toDateString()}</td>
              <td>{item.floor}</td>
              <td>{item.material}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(item)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="success" onClick={handleAddItem}>
        Add Item
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Aquí coloca los campos de formulario para editar las propiedades del elemento */}
            {/* Por ejemplo: */}
            <Form.Group controlId="formName">
              <Form.Label>Job #</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={(formData as Project).jobN || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </section>
    </div>
  );
};

export default ProjectTable;
