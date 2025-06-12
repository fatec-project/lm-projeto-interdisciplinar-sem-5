export default class Jogo {
  id;
  usuarioId;
  gostou;
  
  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getUsuarioId() {
    return this.usuarioId;
  }

  setUsuarioId(usuarioId) {
    this.usuarioId = usuarioId;
  }

  getGostou() {
    return this.gostou;
  }

  setGostou(gostou) {
    this.gostou = gostou;
  }

}