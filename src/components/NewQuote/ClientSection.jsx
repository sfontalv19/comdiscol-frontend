// src/sections/ClientSection.jsx
import TextInput from '../TextInput';

/**
 * Props:
 *  - clientData: { name, nit, email, phone, address }
 *  - onClientChange: e ⇒ setClientData(...)
 */
export default function ClientSection({ clientData, onClientChange }) {
  return (
    <section className="section client-info">
      <div className="field client-field">
        <TextInput
          name="name"
          label="Cliente"
          placeholder="Nombre del cliente"
          value={clientData.name}
          onChange={onClientChange}
        />
      </div>

      <div className="contact-data">
        <TextInput
          name="nit"
          label="NIT"
          placeholder="NIT"
          value={clientData.nit}
          onChange={onClientChange}
        />
        <TextInput
          name="email"
          label="Correo"
          type="email"
          placeholder="ejemplo@correo.com"
          value={clientData.email}
          onChange={onClientChange}
        />
        <TextInput
          name="phone"
          label="Teléfono"
          type="tel"
          placeholder="3034568800"
          value={clientData.phone}
          onChange={onClientChange}
        />
        <TextInput
          name="address"
          label="Ciudad"
          placeholder="Ciudad"
          value={clientData.address}
          onChange={onClientChange}
        />
      </div>
    </section>
  );
}
