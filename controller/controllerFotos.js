class ControllerFotos {
  constructor (seletorDeFotos, arquivoDaFoto, recebeFoto) {
    this.seletorDeFotos = document.getElementById(seletorDeFotos);
    this.arquivoDaFoto = document.getElementById(arquivoDaFoto);
    this.recebeFoto = document.getElementById(recebeFoto);
    this.escuteClick();
    this.carregaFoto();

  }

  escuteClick (){
    this.seletorDeFotos.addEventListener('click', ()=>{
      this.arquivoDaFoto.click();
    }) 
  }

  carregaFoto (){
    

    this.arquivoDaFoto.addEventListener('change', ()=>{
      let file = this.arquivoDaFoto.files.item(0);
      const reader = new FileReader();

      reader.onload = ()=>{
        recebeFoto.src = reader.result;
      }
      console.dir(file);
      reader.readAsDataURL(file);
  
  });


  }


}