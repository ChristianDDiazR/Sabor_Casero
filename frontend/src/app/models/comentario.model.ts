export interface Comentario {
  id_comentario: number;
  id_usuarioComentario: number;
  id_recetaComentario: number;
  Comentario: string;
  Fecha_publicacion: Date;
  id_comentarioPadre: number | null;
  usuario?: { nombre: string }; // Campo adicional para el nombre del usuario
  respuestas?: Comentario[];   // Para comentarios anidados
}

export interface NuevoComentario {
  id_usuarioComentario: number;
  id_recetaComentario: number;
  Comentario: string;
  id_comentarioPadre?: number | null;
}
