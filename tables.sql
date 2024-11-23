-- Crear tabla Estudiantes
CREATE TABLE exampleprep.Estudiantes (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT
);

-- Crear tabla Clases
CREATE TABLE exampleprep.Clases (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

-- Crear tabla Observaciones
CREATE TABLE exampleprep.Observaciones (
    id INT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);

-- Crear tabla intermedia EstudianteClases
CREATE TABLE exampleprep.EstudianteClases (
    estudiante_id INT,
    clase_id INT,
    nota DECIMAL(5,2),
    observacion_id INT,
    PRIMARY KEY (estudiante_id, clase_id),
    FOREIGN KEY (estudiante_id) REFERENCES exampleprep.Estudiantes(id),
    FOREIGN KEY (clase_id) REFERENCES exampleprep.Clases(id),
    FOREIGN KEY (observacion_id) REFERENCES exampleprep.Observaciones(id)
);