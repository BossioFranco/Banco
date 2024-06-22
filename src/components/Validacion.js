export const validateProduct = (id, nombre, descripcion, logo, fechaLiberacion, fechaRevision) => {
    let errors = {};

    if (!id) {
        errors.id = 'Este campo es requerido';
    } else if (id.length < 3 || id.length > 10) {
        errors.id = 'ID no valido';
    }
    if (!nombre) {
        errors.nombre = 'Este campo es requerido';
    } else if (nombre.length < 5 || nombre.length > 100) {
        errors.nombre = 'Nombre no válido';
    }
    if (!descripcion) {
        errors.descripcion = 'Este campo es requerido';
    } else if (descripcion.length < 10 || descripcion.length > 200) {
        errors.descripcion = 'Descripción no válida';
    }
    if (!logo) {
        errors.logo = 'Este campo es requerido';
    }
    if (!fechaLiberacion) {
        errors.fechaLiberacion = 'Este campo es requerido';
    } else if (new Date(fechaLiberacion) < new Date(new Date().toISOString().split('T')[0])) {
        errors.fechaLiberacion = 'Fecha de Liberación debe ser igual o mayor a la fecha actual';
    }
    if (!fechaRevision) {
        errors.fechaRevision = 'Este campo es requerido';
    } else {
        const oneYearLater = new Date(fechaLiberacion);
        oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
        const formattedOneYearLater = oneYearLater.toISOString().split('T')[0];
        if (fechaRevision !== formattedOneYearLater) {
            errors.fechaRevision = 'Fecha de Revisión debe ser exactamente un año posterior a la Fecha de Liberación';
        }
    }

    return errors;
};
